import { Controller, Get, Param, Post, Request, Response, UseGuards } from '@nestjs/common';
import axios from 'axios';
import * as _ from 'lodash';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BaseController } from '../../common/base/base.controller';
import { WildDuckService } from './wild-duck.service';


// @UseGuards(JwtAuthGuard)
@Controller('wild-duck')
export class WildDuckController extends BaseController {

    constructor(protected readonly service: WildDuckService) {
        super(service);
    }

    /**
     * 
     * @param req Authenticate User
     */
    @UseGuards(JwtAuthGuard)
    @Get('authenticate')
    async wildAuthenticate(@Request() req) {
        return await this.service.wildAuthenticate(req);
    }
 
    /**
     * 
     * @param req Delete Mails
     */
    
    @UseGuards(JwtAuthGuard)
    @Post('delete/:userId/:boxId')
    async deleteMails(@Request() req, @Param('userId') userId, @Param('boxId') boxId) {
        return await this.service.deleteMails(req, userId, boxId);
    }
    /**
     * 
     * @param req list Folders
     */
    @UseGuards(JwtAuthGuard)
    @Get('mailboxes/:userId')
    async mailBoxes(@Request() req, @Param('userId') userId) {

        const url = process.env.WILD_DUCK_URI + '/users/' + userId + '/mailboxes?counters=true' + '&accessToken=' + process.env.WILD_DUCK_TOKEN;

        return await axios.get(url).then((response) => {

            return response.data;

        }).catch(function (error) {
            return error.data;
        });

    }


    /**
     * 
     * @param req get Messages
     */
    @UseGuards(JwtAuthGuard)
    @Post('mailbox/:userId/:boxId')
    async mailbox(@Request() req, @Param('userId') userId, @Param('boxId') boxId) {
        let url = '' as any;

        if(req.body.nextCursor && boxId !== 'starred'){

            url = process.env.WILD_DUCK_URI + '/users/' + userId + '/mailboxes/' + boxId + '/messages?limit=10&next='+ req.body.nextCursor ;
        }
        else if(boxId === 'starred' && req.body.nextCursor){

            url = process.env.WILD_DUCK_URI + '/users/' + userId + '/search?flagged=' + true + '&limit=10&next='+ req.body.nextCursor;

        }else if (boxId === 'starred' && !req.body.nextCursor){

            url = process.env.WILD_DUCK_URI + '/users/' + userId + '/search?flagged=' + true + '&limit=10';

        }else{

            url = process.env.WILD_DUCK_URI + '/users/' + userId + '/mailboxes/' + boxId + '/messages?limit=10' ;
     
        }
        const headers = {
            "X-Access-Token": process.env.WILD_DUCK_TOKEN
        }
        
        return await axios.get(url,{headers: headers}).then(function (response) {

            return response.data;

        }).catch(function (error) {
            return error.data;
        });
    }

    /**
     * 
     * @param req get Messages
     */
    @UseGuards(JwtAuthGuard)
    @Get('get-message/:userId/:boxId/:messageId')
    async getMessage(@Request() req, @Param('userId') userId, @Param('boxId') boxId, @Param('messageId') messageId) {
       
        let url = '';

       if(boxId === 'starred'){

        url = process.env.WILD_DUCK_URI + '/users/' + userId + '/messages/' + messageId ;

        }else{

            url = process.env.WILD_DUCK_URI + '/users/' + userId + '/mailboxes/' + boxId + '/messages/' + messageId +'?markAsSeen=true';

        }
       const headers = {
            "X-Access-Token": process.env.WILD_DUCK_TOKEN
        }
        return await axios.get(url,{headers:headers}).then(function (response) {

            return response.data;

        }).catch(function (error) {

            return error.data;

        });
    }


    /**
     * Send newly composed and draft Email
     * @param req
     * Todo: Move all functions to services
     */
    @UseGuards(JwtAuthGuard)
    @Post('submit-message')
    async submitMessage(@Request() req) {
        
        let payload = {
            to: req.body.to,
            subject: req.body.subject,
            html: req.body.text,
            attachments: req.body.attachments?req.body.attachments:[],
            cc:req.body.cc?req.body.cc:[],
            bcc:req.body.bcc?req.body.bcc:[]
        } as any;

        let url = '';
        //To send draft emails
        if (req.body.messageId) {
             payload = {};
             url = process.env.WILD_DUCK_URI + '/users/' + req.body.userId +'/mailboxes/'+req.body.folderId+'/messages/'+req.body.messageId+ '/submit' + '?accessToken=' + process.env.WILD_DUCK_TOKEN;

        }else{
             url = process.env.WILD_DUCK_URI + '/users/' + req.body.userId + '/submit' + '?accessToken=' + process.env.WILD_DUCK_TOKEN;

        }
        return await this.service.submitMessage(payload,url);
    }


    /**
     * Send Email
     * @param req
     */
    @UseGuards(JwtAuthGuard)
    @Post('save-draft')
    async submitDraftMessage(@Request() req) {

        const payload = {
            to: req.body.to,
            subject: req.body.subject,
            html: req.body.text,
            attachments: req.body.attachments?req.body.attachments:[],
            uploadOnly: true,
            isDraft: true,
            cc:req.body.cc?req.body.cc:[],
            bcc:req.body.bcc?req.body.bcc:[]
        };

        const headers = { 'Content-Type': 'application/json' }

        const url = process.env.WILD_DUCK_URI + '/users/' + req.body.userId + '/submit' + '?accessToken=' + process.env.WILD_DUCK_TOKEN;

        return await axios.post(url, payload, { headers: headers }).then(function (response) {

            return response.data;

        }).catch(function (error) {
            return error.data;
        });
    }
    /**
        * 
        * @param req Search Mails
        */
       @UseGuards(JwtAuthGuard)
       @Post('search/:userId/:boxId')
       async searchMails(@Request() req, @Param('userId') userId, @Param('boxId') boxId) {
           return await this.service.searchMails(req, userId, boxId);
       }
     /**
     * 
     * @param req Authenticate User
     */
    @UseGuards(JwtAuthGuard)
    @Post('mark-mails/:userId/:boxId/')
    async markMails(@Request() req ,@Param('userId') userId, @Param('boxId') boxId) {
        return await this.service.markMails(req,userId,boxId);
    }
    
    /**
     *  Returns attachment url to download attachment
     */
    @UseGuards(JwtAuthGuard)
    @Post('download-attachment/:userId')
    async downloadAttachment(@Response() res,@Request() req ,@Param('userId') userId) {

       this.service.downloadAttachment(req,userId).then((response)=>{

        return res.send(response);
        
       });
    }

       /**
     * 
     * @param req Authenticate User
     */
    @UseGuards(JwtAuthGuard)
    @Get('get-all-app-emails')
    async getAllEmails(@Request() req,@Response() res) {
        
        Promise.all([this.service.getUserEmails(),this.service.getEntityEmails()]).then((values) => {

            const flatArray  = _.flatten(values);

            const filteredArray = _.filter(flatArray, 'email')
            
            const finalArray = _.uniqBy(filteredArray, function (p) { return p.email; });
            
            const emails = [] as any;

           for(const email of finalArray){

                  emails.push(email.email);
           }

            res.send(emails);

          });
    }
}
