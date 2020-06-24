import { Router, NextFunction } from 'express';
import * as questionService from '../service/questionService';
import * as questionController from '../controller/questionController';
import * as _ from 'lodash';
import authentication from '../helpers/verifyToken';
const question: Router = Router();

question.post('/',authentication,[
    questionService.validateDate,
    questionService.insertQuestion,
    questionController.sendQuestions
]);

question.get('/type/:type',[
    questionService.getQuestionByType,
    questionController.sendQuestions

]);

question.get('/id/:id',[
    questionService.getQuestionById,
    questionController.sendQuestions

]);

question.put('/:id',authentication,[
    questionService.validateDate,
    questionService.findQuestionById,
    questionService.updateQuestion,
    questionController.otherOpps
]);

question.delete('/id/:id',[
    questionService.findQuestionById,
    questionService.deleteQuistionById,
    questionController.otherOpps
]);

question.delete('/type/:type',[
    questionService.findQuestionByType,
    questionService.deleteQuistionByType,
    questionController.otherOpps
]);

export default question;