"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config_1 = require("../config/config");
const admin = express_1.Router();
admin.post('/login', (req, res, next) => {
    const params = _.merge(req.body, req.params);
    if (params.email === 'ranahiren27@gmail.com' && params.password === 'hiren@27') {
        jwt.sign({ email: params.email, password: params.password }, config_1.default.JWT_ENCRYPTION, (err, token) => {
            console.log(token);
            res.json({
                token: token
            });
        });
    }
    else {
        res.json({
            message: "Enter valid email and password"
        });
    }
});
exports.default = admin;
//# sourceMappingURL=adminRoute.js.map