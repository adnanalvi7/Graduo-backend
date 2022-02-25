import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SystemLanguages } from './interfaces/system-languages.interface';
import { PaginateModel } from 'mongoose';
import { map, upperCase } from "lodash";

@Injectable()
export class SystemLanguagesService extends BaseService {
    constructor(@InjectModel('SystemLanguages') protected readonly model: PaginateModel<SystemLanguages>) {
        super(model);
    }
    async Load(): Promise<any> {
        return new Promise((resolve) => {
            this.model.find({ "status": "Active" }).then((data) => {
                resolve(map(data, (d) => {
                    return {
                        id: d.code,
                        title: d.language,
                        flag: d.code == upperCase(d.code)
                    };
                }));
            })
        });
    }
}
