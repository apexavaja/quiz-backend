import { RequestHandler, NextFunction } from 'express';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import CONFIG from '../config/config';
import * as _ from 'lodash';
import Boom = require('boom');
import IUser from '../interface/IUser';
import UserModel from '../models/userModel';


export const validData: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.userName)) {
        const err = new Error("Enter userName");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.password)) {
        const err = new Error("Enter password");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    return next();
}

export const checkUserName: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    try {
        const data: IUser | any = await UserModel.findAll({
            where: {
                userName: params.userName,
                isDel: 0
            }
        });
        console.log(data);
        if (_.isEmpty(data) === false) {
            const err = new Error("This username is taken");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        } else {
            return next();
        }
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const insertUser: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);
    const packet = {
        userName: params.userName,
        password: crypto.createHmac('sha256', CONFIG.SHA_KEY).update(params.password.trim()).digest('hex')
    }

    try {
        const data: IUser | any = await UserModel.create(packet);
        req.users = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }

}

export const login: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    try {
        const data: IUser | any = await UserModel.findOne({
            where: {
                userName: params.userName,
                password: crypto.createHmac('sha256', CONFIG.SHA_KEY).update(params.password.trim()).digest('hex'),
                isDel: 0
            }
        });
        req.users = data;
        if (!_.isEmpty(data)) {
            req.token = jwt.sign(JSON.stringify(data), CONFIG.JWT_ENCRYPTION);
            return next();
        } else {
            const err = new Error("username and password is incorrect");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }

}

export const updatePass: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.password)) {
        const err = new Error("Enter password");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    const id = req.data.id;
    try {
        const data = await UserModel.update({
            password: crypto.createHmac('sha256', CONFIG.SHA_KEY).update(params.password.trim()).digest('hex')
        }, {
            where: {
                id
            }
        });
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const deleteUser: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const id = req.data.id;

    try {
        const data = await UserModel.update({
            isDel: 1
        }, {
            where: {
                id
            }
        });
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const getAllUsers: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
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
        const data: IUser[] | any = await UserModel.findAll({
            where: {
                isDel: 0
            },
            offset: parseInt(fromLimit),
            limit: parseInt(toLimit)
        });
        req.users = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}