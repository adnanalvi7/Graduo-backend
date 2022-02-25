import * as mongoose from 'mongoose';

export const baseSchema = (add: any, options: any) => {
    const schema = new mongoose.Schema({
        number_id: Number,
        entity: mongoose.Schema.Types.ObjectId,
        // authCountry: Number,
        // authRegion: Number,
        // authProvince: Number,
        // authConsulting: Number,
        // authCompany: Number,
        // authEntityType: String,
        createdBy: String,
        updatedBy: String,
    },options);

    if (add) {
        schema.add(add);
    }
    return schema;
}
