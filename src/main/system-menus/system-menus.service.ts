import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SystemMenus } from './interfaces/system-menus.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class SystemMenusService extends BaseService {
    constructor(@InjectModel('SystemMenus') protected readonly model: PaginateModel<SystemMenus>) {
        super(model);
    }
    async Load(): Promise<any> {
        return await this.model.find({}).select("url accessRoles").lean();
    }
    /**
     * get /LoadAfterLogin
     */
    async LoadAfterLogin(): Promise<any> {
        const aggregate = [];
        const $match = { $expr: {} };
        $match.$expr = {
            $in: ["$number_id", "$$c"]
        };
        const itemsAsChild = await this.model.distinct("children", {
            "type": "collapsable"
        });
        aggregate.push({
            $match: {
                "type": {
                    $in: ["item", "collapsable"]
                },
                "number_id": {
                    $nin: itemsAsChild
                }
            }
        });
        aggregate.push({
            $lookup: {
                from: "system_menu",
                let: {
                    "c": "$children"
                },
                pipeline: [{
                    $match: $match
                },
                {
                    $sort: {
                        order: 1
                    }
                },
                {
                    $project: {
                        order: 0,
                        _id: 0,
                        createdAt: 0,
                        updatedAt: 0
                    }
                }
                ],
                as: "children"
            }
        });
        aggregate.push({
            $sort: {
                order: 1
            }
        });

        return await this.model.aggregate(aggregate);
    };
    /**
     * get /loadChild
     */
    async loadChild(req): Promise<any> {
        const query: any = {
            type: {
                $in: ["item", "collapsable"]
            }
        };
        if (req.query.search) {
            query.$or = [{
                title: {
                    $regex: ".*" + req.query.search + ".*",
                    $options: "i"
                }
            }, {
                url: {
                    $regex: ".*" + req.query.search + ".*",
                    $options: "i"
                }
            }];
        }
        return await this.model.find(query);
    }
}
