"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService = require("../service/userService");
const userController = require("../controller/userController");
const verifyToken_1 = require("../helpers/verifyToken");
const user = express_1.Router();
user.post('/login', [
    userService.validData,
    userService.login,
    userController.sendLoginToken
]);
user.post('/', [
    userService.validData,
    userService.checkUserName,
    userService.insertUser,
    userController.sendUser
]);
user.get('/', [
    userService.getAllUsers,
    userController.sendUser
]);
user.put('/', verifyToken_1.default, [
    userService.updatePass,
    userController.otherOpps
]);
user.delete('/', verifyToken_1.default, [
    userService.deleteUser,
    userController.otherOpps
]);
exports.default = user;
//# sourceMappingURL=userRoute.js.map