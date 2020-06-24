import { RequestHandler, NextFunction } from 'express';
import IRequest from "../interface/IRequest";
import IResponse from '../interface/IResponse';

export const sendScore: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        score: req.score
    });
}

