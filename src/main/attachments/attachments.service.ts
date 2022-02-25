import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import * as PDF from 'html-pdf';
import * as Handlebars from 'handlebars';
import { BaseService } from '../../common/base/base.service';
import { Attachments } from './interfaces/attachments.interface';

@Injectable()
export class AttachmentsService extends BaseService {
  constructor(@InjectModel('Attachments') protected readonly model: mongoose.PaginateModel<Attachments>) {
    super(model);
  }

  async upload(req: any, file: any) {
    let dir = '';
    try {

      dir = `${file.destination}/${req.user.entity}/${req.user._id}/${req.body.refModel}/${req.body.modelId}`;
      const uploadObj = {
        ext: req.body.ext || "",
        fileType: req.file.mimetype || "",
        size: req.file.size || "",
        fileName: req.file.originalname || "",
        fileMd5Name: req.file.filename || "",
        fileSize: req.file.size || 0,
        refModel: req.body.refModel || "",
        isFolder: req.body.isFolder || false,
        document: req.body.document || false,
        modelId: mongoose.Types.ObjectId(req.body.modelId) || "",
        path: dir.slice(1) + "/" + req.file.filename || ""
      };
      if (!fs.existsSync(dir)) {
        await fs.mkdirSync(dir, { recursive: true });
      };
      fs.rename(req.file.path, dir + "/" + req.file.filename, (err) => {
        return err;
      });
      if (req.body.multi) {
        return this.create(req, uploadObj);
      } else {
        return await super.deleteMany(req,{ 'refModel': uploadObj.refModel, 'modelId': uploadObj.modelId }).then(async(data) => {
          return await this.create(req, uploadObj);
        });
      }
    } catch (error) {
      return error;
    }

  };
  /**
   * @Note use this function to generate all pdf
   * @param req 
   * required @param are refModel, data, templateName
   * create folder in pdf-templates for refModel
   */
  async generatePdf(req) {
    const dir = `uploads/${req.user.entity}/${req.user._id}/${req.body.refModel}/${req.body.data.number_id}`;
    const file = `${dir}/${req.body.refModel}_${req.body.data.number_id}.pdf`;
    const template = `${__dirname}/pdf-templates/${req.body.refModel}/${req.body.templateName}`;
    const data = `${req.body.data}`;
    if (!fs.existsSync(dir)) {
      await fs.mkdirSync(dir, { recursive: true });
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
          const html = template(data);
          PDF.create(html, {}).toFile(file, function (err, result) {
            if (err) {
              reject(err)
            } else {
              resolve({ url: file });
            }
          });
        }
      });
    });
  }

}
