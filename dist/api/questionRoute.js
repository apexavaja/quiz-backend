"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questionService = require("../service/questionService");
const questionController = require("../controller/questionController");
const verifyToken_1 = require("../helpers/verifyToken");
const question = express_1.Router();
question.post('/', verifyToken_1.default, [
    questionService.validateDate,
    questionService.insertQuestion,
    questionController.sendQuestions
]);
question.get('/type/:type', [
    questionService.getQuestionByType,
    questionController.sendQuestions
]);
question.get('/id/:id', [
    questionService.getQuestionById,
    questionController.sendQuestions
]);
question.put('/:id', verifyToken_1.default, [
    questionService.validateDate,
    questionService.findQuestionById,
    questionService.updateQuestion,
    questionController.otherOpps
]);
question.delete('/id/:id', [
    questionService.findQuestionById,
    questionService.deleteQuistionById,
    questionController.otherOpps
]);
question.delete('/type/:type', [
    questionService.findQuestionByType,
    questionService.deleteQuistionByType,
    questionController.otherOpps
]);
exports.default = question;
//# sourceMappingURL=questionRoute.js.map