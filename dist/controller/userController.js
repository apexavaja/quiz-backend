"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLoginToken = (req, res, next) => {
    return res.json({
        data: req.users,
        token: req.token
    });
};
exports.sendUser = (req, res, next) => {
    return res.json({
        data: req.users
    });
};
exports.otherOpps = (req, res, next) => {
    return res.json({
        message: "Operation done!!"
    });
};
//# sourceMappingURL=userController.js.map