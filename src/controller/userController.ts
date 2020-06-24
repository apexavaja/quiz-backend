import { RequestHandler, NextFunction } from 'express';
import IRequest from "../interface/IRequest";
import IResponse from '../interface/IResponse';

export const sendLoginToken: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        data: req.users,
        token: req.token
    });
}

export const sendUser: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        data: req.users
    });
}

export const otherOpps: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        message: "Operation done!!"
    });
}

