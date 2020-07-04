import { Model } from 'sequelize';
import { RequestHandler, NextFunction } from 'express';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import * as _ from 'lodash';
import Boom = require('boom');
import ScoreBoardModel from '../models/scoreBoardModel';
import UserModel from '../models/userModel';

export const validateDate: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.type)) {
        const err = new Error("Quiz type is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.score.toString())) {
        const err = new Error("Quiz score is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    return next();
}

export const insertOrUpdateScore: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(req.score)) {
        const packet = {
            userId: req.data.id,
            type: params.type,
            score: params.score
        };
        try {
            const data = await ScoreBoardModel.create(packet);
            req.score = data;
            return next();
        } catch (error) {
            console.log(error);
            const err = new Error("server side error");
            return res.send(Boom.boomify(err, { statusCode: 500 }));
        }
    } else {

        try {
            const data = await ScoreBoardModel.update({
                score: params.score
            }, {
                where: {
                    userId: req.data.id,
                    type: params.type,
                    isDel: 0
                }
            });
            req.score = data;
            return next();
        } catch (error) {
            console.log(error);
            const err = new Error("server side error");
            return res.send(Boom.boomify(err, { statusCode: 500 }));
        }
    }
}

export const getAllScore: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.params, req.body, req.query);

    let fromLimit, toLimit;
    console.log(params.fromLimit, params.toLimit);

    if (_.isUndefined(params.fromLimit) || _.isUndefined(params.fromLimit) || !_.isInteger(parseInt(params.fromLimit)) || !_.isInteger(parseInt(params.toLimit))) {
        fromLimit = 0;
        toLimit = 10;
    } else {
        fromLimit = params.fromLimit;
        toLimit = params.toLimit
    }
    try {
        const data = await ScoreBoardModel.findAll({
            where: {
                isDel: 0
            },
            offset: parseInt(fromLimit),
            limit: parseInt(toLimit),
            order: [['type', 'ASC']],
            include: [UserModel]
        });
        req.score = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }

}

export const getUserScore: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.userId)) {
        const err = new Error("user id is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    try {
        const data = await ScoreBoardModel.findAll({
            where: {
                userId: params.userId,
                isDel: 0
            },
            include: [{
                model: UserModel,
                attributes: ["id", "userName"]
            }]
        });
        req.score = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const findUserTypeScore: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    const userId = params.userId | req.data.id;

    console.log(userId);

    if (_.isEmpty(params.type)) {
        const err = new Error("Quiz type is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isUndefined(userId)) {
        const err = new Error("User id is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    try {
        const data = await ScoreBoardModel.findAll({
            where: {
                userId: userId,
                type: params.type,
                isDel: 0
            },
            include: [UserModel]
        });
        req.score = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const getUserQuizTypes: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);
    const userId = req.data.id;

    try {
        const data = await ScoreBoardModel.sequelize.query("SELECT DISTINCT(`type`) from `scoreBoard` where `userId`=" + userId + " and `isDel`=0 ");
        console.log(data);
        req.score = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }

}