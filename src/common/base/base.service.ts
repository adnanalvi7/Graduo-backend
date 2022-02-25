import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService {

    constructor(protected modelClass) { }

    /**
     * 
     * @param req any
     * 
     * queryOptions = {
     *     where: { key: 'value'},
     *     select: 'col1, col2, col3',
     *     options: {skip: 10, populate: {} }
     * }
    */
    async findAll(req): Promise<any> {

        let params = req.body.queryOptions;
        return await this._findAll(params.where, params.select, params.options);

    }

    async _findAll(where, select, options): Promise<any> {

        return await this.modelClass.find(where, select, options);

    }

    async findAllPost(req): Promise<any> {

        this.prepareQuery(req);
        return this.modelClass.paginate(req.body.query, req.body.options)

    }

    async findOne(req, query: any): Promise<any> {
        if (req.query.populate) {
            return await this.modelClass.findOne(query).populate(req.query.populate).lean();
        } else {
            return await this.modelClass.findOne(query);
        }
    }

    async create(req, Dto: any): Promise<any> {
        Dto.createdBy = req.user._id;
        Dto.entity = Dto.entity ? Dto.entity : req.user.entity;
        // Dto.authCountry = req.entityObj.country;
        // Dto.authRegion = req.entityObj.region;
        // Dto.authProvince = req.entityObj.province;
        // Dto.authConsulting = req.entityObj.business;
        // Dto.authCompany = req.entityObj.company;
        // Dto.authEntityType = req.entityObj.entityType;
        const createdModel = new this.modelClass(Dto);
        return await createdModel.save();
    }

    async update(req, id: any, Dto: any, returnType?: string): Promise<any> {

        if (Dto['$unset']) {
            Dto['$set'] = { updatedBy: req.user._id };
        }
        else {
            Dto['updatedBy'] = req.user._id;
        }

        returnType = returnType ? returnType : 'updated-doc';

        if (returnType === 'updated-doc') {

            return new Promise((resolve, reject) => {

                // { ...Dto }
                this.modelClass.updateOne({ _id: id }, Dto, { upsert: true }).then(() => {

                    resolve(Dto);

                }).catch(err => {
                    reject(err);
                });
            });

        } else {

            return await this.modelClass.updateOne({ _id: id }, Dto, { upsert: true });

        }
    }

    async delete(req, id: any): Promise<any> {
        return await this.modelClass.deleteOne({ _id: id });
    }

    async deleteMany(req, condition): Promise<any> {
        return await this.modelClass.deleteMany(condition);
    }

    private prepareQuery(req) {

        req.body.query = req.body.query ? req.body.query : {};

        // if (req.user.role != 1) {
        //     req.body.query.createdBy = req.user._id;
        // }
        if (!req.body.options) {
            req.body.options = {};
        }

        if (!req.body.options.limit) {
            req.body.options.limit = req.user.recordLimit ? req.user.recordLimit : 10;
        }

        return req;
    }


    async register(Dto: any): Promise<any> {
        const createdModel = new this.modelClass(Dto);
        return await createdModel.save();
    }

    async updateWithQuery( query: any, payload: any): Promise<any> {

        return await this.modelClass.updateOne(query, payload, { upsert: true });
        
    }
    async _findOne(where, select, options): Promise<any> {

        return await this.modelClass.findOne(where, select, options);

    }
}
