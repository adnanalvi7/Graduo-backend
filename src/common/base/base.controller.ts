import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller()
export class BaseController {

    constructor(protected readonly service) { }

    /** Get All*/
    // @UseGuards(JwtAuthGuard)
    // @Get()
    // async findAll(@Request() req, @Query() query): Promise<any> {
    //     return this.service.findAll(req);
    // }

    /** Get All*/
    @UseGuards(JwtAuthGuard)
    @Post('index')
    async Index(@Request() req): Promise<any> {
        return this.service.findAllPost(req);
    }

    /**
     * Find All 
     * 
     * Use this method/api to load data in dropdown or any other control where you don't need pagination stuff.
     * 
     * Instead of using index.
     * 
     * @param req any
     */
    @UseGuards(JwtAuthGuard)
    @Post('find-all')
    async FindAll(@Request() req): Promise<any> {
        return this.service.findAll(req);
    }

    // /**
    //  * Find Attributes List 
    //  * 
    //  * Use this method/api to load data in dropdown or any other control
    //  * Instead of using index.
    //  * 
    //  * @param req any
    //  */
    // @UseGuards(JwtAuthGuard)
    // @Post('find-attributes-list')
    // async FindAttributesList(@Request() req): Promise<any> {
    //     return this.service.findAll(req);
    // }

    /** Get One*/
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Request() req, @Param('id') id): Promise<any> {
        return this.service.findOne(req, {_id: id});
    }

    /** Create */
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req, @Body() Dto: any): Promise<any> {
        return this.service.create(req, Dto);
    }

    /** Update */
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Request() req, @Body() Dto: any, @Param('id') id): string {
        return this.service.update(req, id, Dto);
    }

    /** Delete */
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Request() req, @Param('id') id): string {
        return this.service.delete(req, id);
    }
}
