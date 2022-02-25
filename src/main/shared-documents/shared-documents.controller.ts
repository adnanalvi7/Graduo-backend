import { Controller, UseGuards, Post, Response, Request, Param, Body, Get } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { SharedDocumentsService } from './shared-documents.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('shared-documents')
export class SharedDocumentsController extends BaseController {

  constructor(protected readonly service: SharedDocumentsService,) {
    super(service);
  }

  /**
  * unshare Documents
  */

  @UseGuards(JwtAuthGuard)
  @Post('unshare/:sharedWith/:_id')
  async unShareDocuments(@Response() res, @Request() req, @Param('sharedWith') sharedWith, @Param('_id') _id) {

    this.service.unShareDocuments(req, sharedWith, _id).then((response) => {

      return res.send(response)

    });
  }

  /**
   * change permission of Documents
   */

  @UseGuards(JwtAuthGuard)
  @Post('change-permission/:sharedWith/:_id')
  async changePermission(@Response() res, @Request() req, @Body() body, @Param('sharedWith') sharedWith, @Param('_id') documentId) {

    this.service.changePermission(req, body, sharedWith, documentId).then((response) => {

      return res.send(response)

    });
  }

 /**
  * get default folders (i-e my share and owner's name folders)
  */

 @UseGuards(JwtAuthGuard)
 @Get('get-folders')
 async getFolders(@Response() res, @Request() req) {

   this.service.getFolders(req).then((response) => {

     return res.send(response)

   });
 }

 /**
  * get Documents that is shared with current login user
  */

  @UseGuards(JwtAuthGuard)
  @Post('get-documents-shared-with-me')

  async sharedWithMeDocuments(@Response() res, @Request() req) {
    
    this.service.sharedWithMeDocuments(req).then((response) => {

      return res.send(response)

    });
  }

 /**
  * get Documents that has been shared with others from current login user
  */

 @UseGuards(JwtAuthGuard)
 @Post('get-documents-shared-with-others')

 async sharedWithOthers(@Response() res, @Request() req) {

   this.service.sharedWithOthers(req).then((response) => {

     return res.send(response)

   });
 }

 /**
  * get Documents according to folders except default folders
  */

  @UseGuards(JwtAuthGuard)
  @Post('get-my-documents')

  async getMyDocuments(@Request() req) {

    return this.service.getMyDocuments(req);

  };

  @UseGuards(JwtAuthGuard)
  @Post ('shared-users-list')
  async findSharedUsersList(@Request() req): Promise<any> {
      return await this.service.findSharedUsersList(req);
  }

  
  @UseGuards(JwtAuthGuard)
  @Post ('users/list')
  async findUsersList(@Request() req): Promise<any> {
      return await this.service.findUsersList(req,req.body.query);
  }

}
