import { Controller, Get, Param, Post, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BaseController } from '../../common/base/base.controller';
import { encryptedFileName, imageFileFilter } from '../../common/filters/file-validation.filter';
import { AttachmentsService } from './attachments.service';

@Controller('attachments')
export class AttachmentsController extends BaseController {
  constructor(protected readonly service: AttachmentsService) {
    super(service);
  }
  //#region view file
  @Get('v/*')
  getImage(@Param('0') name, @Res() res) {
    return res.sendFile(name, { root: '.' });
  };
  //#endregion

  //#region single upload
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: encryptedFileName,
        limits: { fileSize: 1024 * 1024 },
      }),
      fileFilter: imageFileFilter,

    }),
  )

  async upload(@Request() req, @UploadedFile() file) {

    return await this.service.upload(req, file);
  }
  //#endregion

  //#region single upload
  @Post('pdf')
  async Pdf(@Request() req) {
    return await this.service.generatePdf(req);
  };
  ////#endregion
}


