"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Boom = require("boom");
const questionModel_1 = require("../models/questionModel");
exports.validateDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.insertQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    const packet = {
        question: params.question,
        option_a: params.option_a,
        option_b: params.option_b,
        option_c: params.option_c,
        option_d: params.option_d,
        correct: params.correct,
        type: params.type
    };
    try {
        const data = yield questionModel_1.default.create(packet);
        req.question = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.getQuestionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.id)) {
        const err = new Error("Question's id is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const data = yield questionModel_1.default.findAll({
            where: {
                id: params.id,
                isDel: 0
            }
        });
        req.question = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.getQuestionByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.type)) {
        const err = new Error("Question's type is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const data = yield questionModel_1.default.findAll({
            where: {
                type: params.type,
                isDel: 0
            }
        });
        req.question = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.findQuestionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.id)) {
        const err = new Error("Question's id is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const data = yield questionModel_1.default.findAll({
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
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.findQuestionByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.type)) {
        const err = new Error("Question's type is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const data = yield questionModel_1.default.findAll({
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
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.updateQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    try {
        const data = yield questionModel_1.default.update({
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
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.deleteQuistionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    try {
        const data = yield questionModel_1.default.update({
            isDel: 1
        }, {
            where: {
                id: params.id
            }
        });
        req.question = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.deleteQuistionByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    try {
        const data = yield questionModel_1.default.update({
            isDel: 1
        }, {
            where: {
                type: params.type
            }
        });
        req.question = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
//# sourceMappingURL=questionService.js.map