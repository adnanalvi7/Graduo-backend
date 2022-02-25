import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as PDF from 'html-pdf';
import { map } from "lodash";
import * as moment from 'moment';
import * as mongoose from 'mongoose';
import { PaginateModel } from 'mongoose';
import { EmailTemplateService } from 'src/main/email-template/email-template.service';
import { InvoiceMovementsService } from 'src/main/invoicing/invoice-movement/invoice-movement.service';
import { WildDuckService } from 'src/main/wild-duck/wild-duck.service';
import { BaseService } from '../../../common/base/base.service';
import { SystemTranslationsService } from '../../system-translations/system-translations.service';
import { InvoiceInterface } from './invoice.interface';
import { response } from 'express';

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class InvoiceService extends BaseService {

	constructor(
		@InjectModel('Invoice')
		protected readonly model: PaginateModel<InvoiceInterface>,
		protected readonly systemTranslationsService: SystemTranslationsService,
		protected readonly emailTemplateService: EmailTemplateService,
		protected readonly invoiceMovementService: InvoiceMovementsService,
		protected readonly wildDuckService: WildDuckService
	) {
		super(model);
	}

	/**
	 * Generate and download pdf 
	 * 
	 * @param req any
	 * @param id string
	 */
	async generatePdf(req, id) {

		// this will find translation on the base of these keys and then map it in key pairs.

		const keysArray = [
			'invoice','quote', 'due date', 'concept', 'description', 'quantity', 'unit price', 'discount', 'irpf', 'vat', 'base amount', 'taxable basis', 'applied discount informative', 'total invoice', 'total quote'
		]
		const translationsData = {} as any;
		await this.systemTranslationsService.findTranslations(req.body, keysArray).then((data) => {
			map(data, (d) => {
				translationsData[d.key] = d.value;
			});
		})

		// this will remove spaces from the key of json object and replace with _ sign so we can use keys in handlebars for translations
		const translations = JSON.parse(JSON.stringify(translationsData).replace(/"([\w\s]+)":/g, function (m) {
			return m.replace(/\s+/g, '_');
		}));
		const dir = `uploads/temp`;
		const file = `${dir}/${id}/${id}.pdf`;
		const template = `${__dirname}/pdf-templates/invoice.hbs`;

		if (!fs.existsSync(dir)) {
			await fs.mkdirSync(dir, { recursive: true })
		};

		// TODO:medium: Use this.findOne method.
		const result: any = await this.model.findOne({ _id: id }).populate(['lineItems.conceptId', 'entityId', 'seriesId']).lean()
		// const result = await this.findOne(req, { _id: id }).populate(['lineItems.conceptId', 'entityId']).lean()

		// This will map each line items of invoice so we can get translated concept description,

		// It will return array of lineItems with concept translation

		// Todo: create a function to perform this calculations.

		const nf = new Intl.NumberFormat(); //to add thousand operator on number values

		const lineItemsArray = result.lineItems.map(function (item) {
			return {
				conceptId: item.conceptId.description[req.body.currentLanguage],
				description: item.description,
				quantity: nf.format(item.quantity),
				unitPrice: nf.format(item.unitPrice),
				discount: nf.format(item.discount),
				irpf: nf.format(item.irpf),
				vat: nf.format(item.vat),
				baseAmount: nf.format(item.baseAmount)
			};

		});

		const data = {
			...result,
			totalTitle:translations[`total_${result.invoiceOrQuote}`] ||'Total '+ (result.invoiceOrQuote.charAt(0).toUpperCase() + result.invoiceOrQuote.slice(1)),
			invoiceOrQuote:translations[`${result.invoiceOrQuote}`] ||  result.invoiceOrQuote.charAt(0).toUpperCase() + result.invoiceOrQuote.slice(1),
			legalName: result['entityId']['legalName'],
			invoiceNumberWithSeries: result['seriesId']['series'] + '-' + result['autoNumber'],
			dueDate: moment(result.dueDate).format("DD/MM/YYYY"),
			invoiceDate: moment(result.invoiceDate).format("DD/MM/YYYY"),
			lineItems: lineItemsArray,
			invoiceTotals: {
				baseAmount: nf.format(result.invoiceTotals.baseAmount),
				vatAmount: nf.format(result.invoiceTotals.vatAmount),
				irpfAmount: nf.format(result.invoiceTotals.irpfAmount),
				totalAmount: "€ " + nf.format(result.invoiceTotals.totalAmount),
				discountAmount: nf.format(result.invoiceTotals.discountAmount)
			},
			paymentsDetails: {
				totalInvoice: nf.format(result.paymentsDetails.totalInvoice),
				totalPaid: nf.format(result.paymentsDetails.totalPaid),
				outstandingBalance: nf.format(result.paymentsDetails.outstandingBalance),
				outstandingPercentage: nf.format(result.paymentsDetails.outstandingPercentage)
			},

			translations,

		};
		return new Promise((resolve, reject) => {

			fs.readFile(template, function (err, fileData) {
				if (err) {
					console.log(err);
				}
				else {
					// make the buffer into a string 
					const source = fileData.toString();
					const template = Handlebars.compile(source);

					data['zoom'] = 1;

					if (process.env['pdf_zoom']) {
						data['zoom'] = process.env['pdf_zoom'];
					}

					const html = template(data);
					PDF.create(html, {}).toFile(file, function (err, res) {
						if (err) {
							reject(err)
						} else {
							resolve({ url: file, invoice: data,filename: result.invoiceOrQuote });
						}
					});
				}
			});

		})

	}


	/**
	 * Send email to client with pdf attached. 
	 * 
	 * @param req any
	 * @param res any
	 * @param id string
	 */
	async sendEmail(req, res, id,) {

		let templateData = {} as any;

		await this.emailTemplateService.findlist({ action: req.body.action }).then((data) => { templateData = data; })

		const invoiceData: any = await this.generatePdf(req, id);

		// convert image to base64 encoded string
		const base64str = this.base64Encode(invoiceData.url);

		const payload = {
			// used entity email as user email 
			to: [{ address: invoiceData.invoice.entityId.email }],
			subject: templateData.subject ? templateData.subject : '',
			html: templateData.emailBody ? templateData.emailBody : '',
			attachments: [{ content: base64str, filename: `${invoiceData.filename}.pdf`, contentType: 'application/pdf' }]
		} as any;
     // sent mail with no-reply@graduadosocial.online that's why user default id
		const url = process.env.WILD_DUCK_URI + '/users/5e6f4f7f92cd850eb5c5afa6/submit' + '?accessToken=' + process.env.WILD_DUCK_TOKEN;

		return new Promise((resolve, reject) => {
			this.wildDuckService.submitMessage(payload, url).then((data) => {
				resolve(data)
			}).catch((error) => {
				reject(error)
			})

		})
	}

	/**
	 * Send reminder email. 
	 * 
	 * @param req any
	 * @param id string
	 */
	async sendReminderEmail(req, id) {

		let templateData = {} as any;
		await this.emailTemplateService.findlist(req.body).then((data) => {
			templateData = data;
		})
		const result = await this.model.findOne({ _id: id }).populate('entityId').lean()
		const payload = {
			to: [{ address: result.entityId.email }],
			subject: templateData.subject ? templateData.subject : '',
			html: templateData.emailBody ? templateData.emailBody : '',
		};
		const url = process.env.WILD_DUCK_URI + '/users/5e6f4f7f92cd850eb5c5afa6/submit' + '?accessToken=' + process.env.WILD_DUCK_TOKEN;

		return new Promise((resolve, reject) => {
			this.wildDuckService.submitMessage(payload, url).then((data) => {
				resolve(data)
			}).catch((error) => {
				reject(error)
			})

		})
	}

	/**
	 * Helper function: Convert to base64
	 * 
	 * @param file any
	 */
	public base64Encode(file) {
		// read binary data
		const bitmap = fs.readFileSync(file);

		// convert binary data to base64 encoded string
		return new Buffer(bitmap).toString('base64');
	}

	/**
	 * Helper method: to get next invoice number or quote number
	 * 
	 * Each series has its own sequence number starting from one.
	 * 
	 * @param req any
	 * @param seriesId any
	 * @param invoiceOrQuote string
	 */
	async getNextAutoNumber(req, seriesId, invoiceOrQuote: string): Promise<any> {

		return this.model.find({ invoiceOrQuote: invoiceOrQuote, seriesId: seriesId }).sort({ 'autoNumber': -1 }).limit(1).then(result => {

			if ((result && result.length) && (result[0]['autoNumber'])) {

				return { autoNumber: (result[0]['autoNumber'] + 1) };

			}
			else {
				return { autoNumber: 1 };
			}


		})

	}


	async create(req, dto: any): Promise<any> {

		return this.getNextAutoNumber(req, dto.seriesId, dto.invoiceOrQuote).then(numberResult => {

			dto['autoNumber'] = numberResult['autoNumber'];
			dto['invoiceStatus'] = 'active';


			return super.create(req, dto).then(async (data) => {

				// To update related invoice status from active to inactive
				if (req.body.relatedInvoiceId && req.body.type === 'correction') {

					await super.update(req, req.body.relatedInvoiceId, { invoiceStatus: 'inactive' }).then(async () => {

						dto = { ...dto, invoiceStatus: 'inactive' };

						if (dto['invoiceOrQuote'] === 'invoice') {
							await this.createInvoiceMovements(req, req.body.relatedInvoiceId, dto);
						}

					});
				}

				if (dto['invoiceOrQuote'] === 'invoice') {

					dto['invoiceStatus'] = 'active';
					await this.createInvoiceMovements(req, data._id, dto)
				}

				return data;


			})

		})

	}

	async update(req, id: any, dto: any, returnType?: string): Promise<any> {

		dto.updatedBy = req.user._id;
		returnType = returnType ? returnType : 'updated-doc';

		if (returnType === 'updated-doc') {

			return new Promise((resolve, reject) => {

				// { ...dto }
				this.modelClass.updateOne({ _id: id }, dto, { upsert: true }).then(async (data) => {

					if (dto['invoiceOrQuote'] === 'invoice') {
						await this.createInvoiceMovements(req, id, dto);
					}

					resolve(data);

				}).catch(err => {
					reject(err);
				});
			});

		} else {

			return await this.modelClass.updateOne({ _id: id }, dto, { upsert: true });

		}
	}

	async createInvoiceMovements(req, id, dto): Promise<any> {

		return await this.getInvoiceVersion({ invoiceId: ObjectId(id) }).then(async (numberResult) => {
			dto = { ...dto,
				 invoiceVersion: numberResult['invoiceVersion'],
				  invoiceId: id,
				  invoiceDate: new Date(dto.invoiceDate).setUTCHours(24, 0, 0, 0)

				 }
			return this.invoiceMovementService.create(req, dto);
		})

	}

	async getInvoiceVersion(query): Promise<any> {

		return this.invoiceMovementService.findList(query).then(result => {
			if ((result && result.length) && (result[0]['invoiceVersion'])) {

				return { invoiceVersion: (result[0]['invoiceVersion'] + 1) };

			}
			else {
				return { invoiceVersion: 1 };
			}


		})

	}

	async generateInvoiceFromQuote(req, invoiceId): Promise<any> {

	  return this._findOne({_id:invoiceId},'',{}).then((quoteData:any)=>{
		
		const dto =
		{ invoiceTotals:quoteData.invoiceTotals,
		  recurring:quoteData.recurring,
		  paymentsDetails:quoteData.paymentsDetails,
		  seriesId:quoteData.seriesId,
		  autoNumber:quoteData.autoNumber,
		  entityId:quoteData.entityId,
		  billingAddress:quoteData.billingAddress,
		  subject:quoteData.subject,
		  type:quoteData.type,
		  invoiceDate:quoteData.invoiceDate,
		  dueDate:quoteData.dueDate,
		  paymentMethodId:quoteData.paymentMethodId,
		  status:quoteData.status,
		  isRecurring:quoteData.isRecurring,
		  lineItems:quoteData.lineItems,
		  invoiceOrQuote:quoteData.invoiceOrQuote,
		  invoiceStatus:quoteData.invoiceStatus,
		  entity:quoteData.entity,
		  quoteId:quoteData._id
		}
		
		dto['invoiceOrQuote'] = 'invoice';


		return this.create(req,dto).then(async (data)=>{

			return await this.updateWithQuery({_id:invoiceId},{invoiceStatus:'generated'}).then(()=>{
				
				return data;
			
			});


		 })

	  });


	
	}

}



