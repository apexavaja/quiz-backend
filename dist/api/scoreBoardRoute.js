"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scoreBoardService = require("../service/scoreBoardService");
const questionService = require("../service/questionService");
const scoreBoardController = require("../controller/scoreBoardController");
const verifyToken_1 = require("../helpers/verifyToken");
const scoreBoard = express_1.Router();
scoreBoard.post('/', verifyToken_1.default, [
    scoreBoardService.validateDate,
    questionService.findQuestionByType,
    scoreBoardService.findUserTypeScore,
    scoreBoardService.insertOrUpdateScore,
    scoreBoardController.sendScore
]);
scoreBoard.get('/', [
    scoreBoardService.getAllScore,
    scoreBoardController.sendScore
]);
scoreBoard.get('/userScore/:userId', [
    scoreBoardService.getUserScore,
    scoreBoardController.sendScore
]);
scoreBoard.get('/type', verifyToken_1.default, [
    scoreBoardService.getUserQuizTypes,
    scoreBoardController.sendScore
]);
exports.default = scoreBoard;
//# sourceMappingURL=scoreBoardRoute.js.map