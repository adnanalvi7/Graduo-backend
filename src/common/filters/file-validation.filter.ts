
import { v4 as uuidv4 } from 'uuid';

export const imageFileFilter = (req, file, callback) => {

    if (file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
        callback(null, true);
    } else if (file.originalname.toLowerCase().match(/\.(csv||doc||json|txt|pdf|html|xls)$/)) {

        callback(null, true);
    } else {
        callback(new Error('Only csv or image files are allowed!'), false);
    }

};
export const encryptedFileName = (req, file, callback) => {
    const fileExt = file.originalname.split('.').pop();
    callback(null, uuidv4() + '.' + fileExt);
};

