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
const scoreBoardModel_1 = require("../models/scoreBoardModel");
const userModel_1 = require("../models/userModel");
exports.validateDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.type)) {
        const err = new Error("Quiz type is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    console.log("score checking ", params.score);
    if (_.isEmpty(params.score.toString())) {
        const err = new Error("Quiz score is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
});
exports.insertOrUpdateScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(req.score)) {
        const packet = {
            userId: req.data.id,
            type: params.type,
            score: params.score
        };
        try {
            const data = yield scoreBoardModel_1.default.create(packet);
            req.score = data;
            return next();
        }
        catch (error) {
            console.log(error);
            const err = new Error("server side error");
            return res.send(Boom.boomify(err, { statusCode: 500 }));
        }
    }
    else {
        try {
            const data = yield scoreBoardModel_1.default.update({
                score: params.score
            }, {
                where: {
                    userId: req.data.id,
                    type: params.type,
                    isDel: 0
                }
            });
            req.score = data;
            return next();
        }
        catch (error) {
            console.log(error);
            const err = new Error("server side error");
            return res.send(Boom.boomify(err, { statusCode: 500 }));
        }
    }
});
exports.getAllScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body, req.query);
    let fromLimit, toLimit;
    console.log(params.fromLimit, params.toLimit);
    if (_.isUndefined(params.fromLimit) || _.isUndefined(params.fromLimit) || !_.isInteger(parseInt(params.fromLimit)) || !_.isInteger(parseInt(params.toLimit))) {
        fromLimit = 0;
        toLimit = 10;
    }
    else {
        fromLimit = params.fromLimit;
        toLimit = params.toLimit;
    }
    try {
        const data = yield scoreBoardModel_1.default.findAll({
            where: {
                isDel: 0
            },
            offset: parseInt(fromLimit),
            limit: parseInt(toLimit),
            order: [['type', 'ASC']],
            include: [userModel_1.default]
        });
        req.score = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.getUserScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.userId)) {
        const err = new Error("user id is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const data = yield scoreBoardModel_1.default.findAll({
            where: {
                userId: params.userId,
                isDel: 0
            },
            include: [{
                    model: userModel_1.default,
                    attributes: ["id", "userName"]
                }]
        });
        req.score = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.findUserTypeScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    const userId = params.userId | req.data.id;
    console.log(userId);
    if (_.isEmpty(params.type)) {
        const err = new Error("Quiz type is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(userId)) {
        const err = new Error("User id is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const data = yield scoreBoardModel_1.default.findAll({
            where: {
                userId: userId,
                type: params.type,
                isDel: 0
            },
            include: [userModel_1.default]
        });
        req.score = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.getUserQuizTypes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    const userId = req.data.id;
    try {
        const data = yield scoreBoardModel_1.default.sequelize.query("SELECT DISTINCT(`type`) from `scoreBoard` where `userId`=" + userId + " and `isDel`=0 ");
        console.log(data);
        req.score = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
//# sourceMappingURL=scoreBoardService.js.map