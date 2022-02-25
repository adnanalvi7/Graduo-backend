import { Controller, Get, Post, Req, Res, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BaseController } from '../../common/base/base.controller';
import { encryptedFileName, imageFileFilter } from '../../common/filters/file-validation.filter';
import { SystemTranslationsService } from './system-translations.service';


@Controller('system-translations')
export class SystemTranslationsController extends BaseController {

    constructor(protected readonly service: SystemTranslationsService) {
        super(service);
    }
    @Post('validate_key')
    async validate(@Req() request: Request , @Res() res): Promise<any> {
        return this.service.validate(request ,res);
    }
    @Get('load')
    async load(@Req() request: Request): Promise<any> {
        return this.service.Load(request);
    }
    
    @Post('download-missings')
    async DownloadMissing(@Req() request: Request): Promise<any> {
        return this.service.getMissingTranslations(request);
    }

    @Post('upload-translations')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/translation',
                filename: encryptedFileName,
                limits: { fileSize: 1024 * 1024 },
            }),
            fileFilter: imageFileFilter,

        }),
    )

    async csvUpload(
        @Req() req,
        @UploadedFile() file,
        @Res() res) {
        await this.service.csvUpload(req, res, file.path);
        res.json("success");
    }
}
