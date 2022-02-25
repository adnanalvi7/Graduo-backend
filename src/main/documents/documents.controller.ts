import { Body, Controller, Get, Param, Post, Put, Request, Res, UploadedFile, UseGuards, UseInterceptors, Response } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BaseController } from 'src/common/base/base.controller';
import { encryptedFileName, imageFileFilter } from 'src/common/filters/file-validation.filter';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentsController extends BaseController {

  constructor(protected readonly service: DocumentService,) {
    super(service);
  }


  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({ destination: './uploads/documents', filename: encryptedFileName, limits: { fileSize: 1024 * 1024 } }),
      fileFilter: imageFileFilter,
    }),
  )
  async upload(@Request() req, @UploadedFile() file) {

    return await this.service.upload(req, file);

  }

  @UseGuards(JwtAuthGuard)
  @Get('download-file/:_id')
  async downloadFile(@Request() req, @Res() res, @Param('_id') _id) {
    return this.service.downloadFile(req, res, _id);
  };

  @UseGuards(JwtAuthGuard)
  @Post('get-my-documents')
  async getMyDocuments(@Request() req) {
    return this.service.getMyDocuments(req);
  };


  @UseGuards(JwtAuthGuard)
  @Post('create-folder')
  async createFolder(@Request() req) {
    return this.service.createFolder(req);
  };


  @UseGuards(JwtAuthGuard)
  @Put('update-folder/:_id')
  async updateFolder(@Request() req, @Body() body: any, @Param('_id') _id) {
    return this.service.updateFolder(req, body, _id);
  };

  @UseGuards(JwtAuthGuard)
  @Get('get-all-folders')
  async getAllFolders(@Request() req) {
    return this.service.getAllFolders(req);
  };


  @UseGuards(JwtAuthGuard)
  @Post('move-document')
  async moveDocument(@Response() res,@Request() req, @Body() body: any) {
    
     this.service.moveDocument(req, body).then((response)=>{
      
      return res.send(response)

    });
  };

  /**
    * 
    * @param req Delete Documents
    */

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteDocuments(@Response() res,@Request() req) {

    this.service.deleteDocuments(req).then((response)=>{
      
      return res.send(response)

    });
  }


}
