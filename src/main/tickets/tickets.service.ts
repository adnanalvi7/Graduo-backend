import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tickets } from './interfaces/tickets.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class TicketsService extends BaseService {
    constructor(@InjectModel('Tickets') protected readonly model: PaginateModel<Tickets>) {
        super(model);
    }
    
    ownData(req) {
        req.body.query = req.body.query ? req.body.query : {};
        if (req.user.role != 1) {
            // req.body.query.createdBy = req.user._id;
            /**
             * Client Auth
             */
            if (req.entityObj.entityType == 'clients') {
                req.body.query.createdBy = req.user._id;
            }
            /**
             * company Auth
             */
            if (req.entityObj.entityType == 'company') {
                req.body.query.$or = [{ createdBy: req.user._id }, { authCompany: req.entityObj.company }];
            }
            /**
             * Consulting firm Auth
             */
            if (req.entityObj.entityType == 'business') {
                req.body.query.$or = [
                    { createdBy: req.user._id },
                    { authConsulting: req.entityObj.business }
                ];
                req.body.query.authEntityType = {
                    $in: [
                        req.entityObj.entityType,
                        'company'
                    ]
                };
            }
            /**
             * province Auth
             */
            if (req.entityObj.entityType == 'province') {
                req.body.query.$or = [{ createdBy: req.user._id }, { authProvince: req.entityObj.province }];
                req.body.query.authCompany = { $exists: false };
                req.body.query.authEntityType = {
                    $in: [
                        req.entityObj.entityType,
                        'business'
                    ]
                };
            }
            /**
             * Region Auth
             */
            if (req.entityObj.entityType == 'region') {
                req.body.query.$or = [{ createdBy: req.user._id }, { authRegion: req.entityObj.region }];
                req.body.query.authConsulting = { $exists: false };
                req.body.query.authEntityType = {
                    $in: [
                        req.entityObj.entityType,
                        'province'
                    ]
                };
            }
            /**
             * Region Auth
             */
            if (req.entityObj.entityType == 'country') {
                req.body.query.$or = [{ createdBy: req.user._id }, { authCountry: req.entityObj.country }];
                req.body.query.authProvince = { $exists: false };
                req.body.query.authEntityType = {
                    $in: [
                        req.entityObj.entityType,
                        'region'
                    ]
                };
            }
        }
        return req.body.query;
    }
}
