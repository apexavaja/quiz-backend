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
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
const _ = require("lodash");
const Boom = require("boom");
const userModel_1 = require("../models/userModel");
exports.validData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.userName)) {
        const err = new Error("Enter userName");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.password)) {
        const err = new Error("Enter password");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
});
exports.checkUserName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    try {
        const data = yield userModel_1.default.findAll({
            where: {
                userName: params.userName,
                isDel: 0
            }
        });
        console.log(data);
        if (_.isEmpty(data) === false) {
            const err = new Error("This username is taken");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        else {
            return next();
        }
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.insertUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    const packet = {
        userName: params.userName,
        password: crypto.createHmac('sha256', config_1.default.SHA_KEY).update(params.password.trim()).digest('hex')
    };
    try {
        const data = yield userModel_1.default.create(packet);
        req.users = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    try {
        const data = yield userModel_1.default.findOne({
            where: {
                userName: params.userName,
                password: crypto.createHmac('sha256', config_1.default.SHA_KEY).update(params.password.trim()).digest('hex'),
                isDel: 0
            }
        });
        req.users = data;
        if (!_.isEmpty(data)) {
            req.token = jwt.sign(JSON.stringify(data), config_1.default.JWT_ENCRYPTION);
            return next();
        }
        else {
            const err = new Error("username and password is incorrect");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.updatePass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.password)) {
        const err = new Error("Enter password");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    const id = req.data.id;
    try {
        const data = yield userModel_1.default.update({
            password: crypto.createHmac('sha256', config_1.default.SHA_KEY).update(params.password.trim()).digest('hex')
        }, {
            where: {
                id
            }
        });
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.data.id;
    try {
        const data = yield userModel_1.default.update({
            isDel: 1
        }, {
            where: {
                id
            }
        });
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const data = yield userModel_1.default.findAll({
            where: {
                isDel: 0
            },
            offset: parseInt(fromLimit),
            limit: parseInt(toLimit)
        });
        req.users = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
//# sourceMappingURL=userService.js.map