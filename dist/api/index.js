"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoute_1 = require("./userRoute");
const questionRoute_1 = require("./questionRoute");
const adminRoute_1 = require("./adminRoute");
const scoreBoardRoute_1 = require("./scoreBoardRoute");
const router = express_1.Router();
router.use('/admin', adminRoute_1.default);
router.use('/user', userRoute_1.default);
router.use('/score', scoreBoardRoute_1.default);
router.use('/question', questionRoute_1.default);
router.get('/', (req, res) => {
    res.send({
        msg: 'working!'
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map