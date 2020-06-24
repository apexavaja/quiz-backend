import { RequestHandler, NextFunction } from 'express';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import * as _ from 'lodash';
import Boom = require('boom');
import IQuestion from '../interface/IQuestion';
import QuestionModel from '../models/questionModel';

export const validateDate: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.question)) {
        const err = new Error("Enter question");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.option_a)) {
        const err = new Error("Enter option_a");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.option_b)) {
        const err = new Error("Enter option_b");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.option_c)) {
        const err = new Error("Enter option_c");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.option_d)) {
        const err = new Error("Enter option_d");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.correct)) {
        const err = new Error("Enter correct answer");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.type)) {
        const err = new Error("Enter type of question");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    return next();
}

export const insertQuestion: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    const packet: IQuestion = {
        question: params.question,
        option_a: params.option_a,
        option_b: params.option_b,
        option_c: params.option_c,
        option_d: params.option_d,
        correct: params.correct,
        type: params.type
    }

    try {
        const data = await QuestionModel.create(packet);
        req.question = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }

}

export const getQuestionById: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.id)) {
        const err = new Error("Question's id is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    try {
        const data = await QuestionModel.findAll({
            where: {
                id: params.id,
                isDel: 0
            }
        });

        req.question = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const getQuestionByType: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.type)) {
        const err = new Error("Question's type is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    try {
        const data = await QuestionModel.findAll({
            where: {
                type: params.type,
                isDel: 0
            }
        });
        req.question = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const findQuestionById: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.id)) {
        const err = new Error("Question's id is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    try {
        const data = await QuestionModel.findAll({
            where: {
                id: params.id,
                isDel: 0
            }
        });
        if (_.isEmpty(data)) {
            const err = new Error(`Question with id ${params.id} is not exist...`);
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }

}

export const findQuestionByType: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.type)) {
        const err = new Error("Question's type is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    try {
        const data = await QuestionModel.findAll({
            where: {
                type: params.type,
                isDel: 0
            }
        });
        if (_.isEmpty(data)) {
            const err = new Error(`Question with type ${params.type} is not exist...`);
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }

}

export const updateQuestion: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    try {
        const data = await QuestionModel.update({
            question: params.question,
            option_a: params.option_a,
            option_b: params.option_b,
            option_c: params.option_c,
            option_d: params.option_d,
            correct: params.correct,
            type: params.type
        }, {
            where: {
                id: params.id
            }
        });
        req.question = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }

}

export const deleteQuistionById: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    try {
        const data = await QuestionModel.update({
            isDel: 1
        }, {
            where: {
                id: params.id
            }
        });
        req.question = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const deleteQuistionByType: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    try {
        const data = await QuestionModel.update({
            isDel: 1
        }, {
            where: {
                type: params.type
            }
        });
        req.question = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}