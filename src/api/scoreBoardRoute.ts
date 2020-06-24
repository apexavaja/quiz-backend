import { Router, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import * as scoreBoardService from '../service/scoreBoardService';
import * as questionService from '../service/questionService';
import * as scoreBoardController from '../controller/scoreBoardController';
import authentication from '../helpers/verifyToken';
const scoreBoard: Router = Router();

scoreBoard.post('/',authentication,[
    scoreBoardService.validateDate,
    questionService.findQuestionByType,
    scoreBoardService.findUserTypeScore,
    scoreBoardService.insertOrUpdateScore,
    scoreBoardController.sendScore
]);

scoreBoard.get('/',[
    scoreBoardService.getAllScore,
    scoreBoardController.sendScore
]);

scoreBoard.get('/userScore/:userId',[
    scoreBoardService.getUserScore,
    scoreBoardController.sendScore
]);

scoreBoard.get('/type',authentication,[
    scoreBoardService.getUserQuizTypes,
    scoreBoardController.sendScore
]);


export default scoreBoard;