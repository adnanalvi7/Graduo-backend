import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as csvtojson from "csvtojson";
import * as fs from 'fs';
import { map } from "lodash";
import { PaginateModel } from 'mongoose';
import { BaseService } from '../../common/base/base.service';
import { SystemTranslations } from './interfaces/system-translations.interface';
import * as _ from 'lodash';
import { SystemLanguagesService } from '../system-languages/system-languages.service';
@Injectable()
export class SystemTranslationsService extends BaseService {

    constructor(
        @InjectModel('SystemTranslations')
        protected readonly model: PaginateModel<SystemTranslations>,
        protected readonly systemLanguageService: SystemLanguagesService
    ) {
        super(model);
    }

    async validate(request, res: any): Promise<any> {

        const translationId = request.body.query.translationId;

        await this.model.findOne({ key: request.body.query.key, language: request.body.query.language }).then((translation: any) => {
            // No translation with the same key in the database
            if (!translation) {
                return res.json({
                    keyNotTaken: true
                });
            }

            // Validate the 'edit translation' form
            if (translationId) {
                if (translationId === translation._id.toString()) {
                    return res.json({
                        keyNotTaken: true
                    });
                } else {
                    return res.json({
                        keyNotTaken: false
                    });
                }
            }
            // Validate the 'add translation' form
            else {
                res.json({
                    keyNotTaken: false
                });
            }
        }).catch(error => {

            res.json({
                keyNotTaken: true
            });
        });;

    }

    async Load(request): Promise<any> {
        const data = await this.model.find({ "status": "completed", "language": request.query.lang });
        const out: any = {};
        map(data, (d) => {
            out[d.key] = d.value;
        });
        return out;
    }

    /**
     * Find missing translations in other languages.
     * @param req any
     */
    public async getMissingTranslations(req) {

        let englishTranslations = await this._findAll({ language: 'en' }, null, { sort: { key: 1 } });
        const otherTranslations = await this._findAll({ language: { $ne: 'en' } }, null, null);
        const otherLanguages = await this.systemLanguageService._findAll({ code: { $ne: 'en' } }, null, null);

        let dataset = [];

        englishTranslations = _.orderBy(englishTranslations, ['key'], ['asc']);

        _.each(englishTranslations, (englishTranslationItem) => {

            let obj = { key: englishTranslationItem['key'], en: englishTranslationItem['value'] };
            let doPush = false;

            _.each(otherLanguages, (languageItem) => {

                let translationExist = _.find(otherTranslations, (o) => { return englishTranslationItem['key'] == o['key'] && o['language'] == languageItem['code'] })

                if (!translationExist) {
                    doPush = true;
                    obj[languageItem['code']] = "";
                } else {
                    obj[languageItem['code']] = translationExist['value'];
                }

            })

            if (doPush) {
                dataset.push(obj);
            }

        })

        let languages = ["en"];
        _.each(otherLanguages, (languageItem) => { languages.push(languageItem['code']) });

        return { languages, dataset };

    }

    // async getMissingTranslations1(req): Promise<any> {
    //     const languages = req.body;
    //     let missingTranslations = [];
    //     if (req.body) {
    //         missingTranslations = req.body;
    //     }
    //     const en = _.remove(languages, function (n) {
    //         return n == "en";
    //     });
    //     const enKeys = await this.model.distinct("key", {
    //         language: en
    //     });
    //     for (let i = 0; i < languages.length; i++) {
    //         const otherKeys = await this.model.distinct("key", {
    //             language: languages[i]
    //         });
    //         missingTranslations = _.concat(missingTranslations, _.differenceWith(enKeys, otherKeys, _.isEqual));
    //     }
    //     missingTranslations = _.uniq(missingTranslations);
    //     let data = await this.model.find({
    //         "key": {
    //             $in: missingTranslations
    //         }
    //     }).select("language key value");
    //     const inDbData = map(data, "key");
    //     let notInDbData = _.differenceWith(missingTranslations, inDbData, _.isEqual);
    //     notInDbData = map(notInDbData, (n) => {
    //         return {
    //             key: n,
    //             language: "en",
    //             value: n
    //         };
    //     });
    //     data = _.concat(data, notInDbData);
    //     return _.groupBy(data, "key");
    // }

    async csvUpload(req: any, res: any, filePath: any,) {
        try {
            const dir = filePath;
            const savedFile = await csvtojson({ delimiter: "auto" }).fromFile(dir, { encoding: "utf-8" });
            for (const idx in savedFile) {

                const translations = savedFile[idx];
                const key = translations['key'];
                delete translations['key'];

                for (const [language, value] of Object.entries(translations)) {
                    const models = await this.model.findOne({ key: key, language: language });

                    if (!models && value) {

                        const create = await this.model.create({
                            key: key,
                            language: language,
                            value: value,
                            status: "completed",
                        });
                    }
                }
            }
            fs.unlink(dir, (err) => {
                if (err) throw err;
            });
        } catch (error) {
            return res.status(500).json({ message: "error while uplaoding file." + error });
        }

    }

    async findTranslations(body, keys): Promise<any> {
        return this.model.find({ key: { $in: keys }, language: body.currentLanguage });
    }

}

