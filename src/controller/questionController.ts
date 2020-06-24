import { RequestHandler, NextFunction } from 'express';
import IRequest from "../interface/IRequest";
import IResponse from '../interface/IResponse';

export const sendQuestions: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    return res.json({
        questions: req.question
    });
}

export const otherOpps: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    return res.json({
        message: "Operation done!!"
    });
}