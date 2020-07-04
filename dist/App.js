"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const index_1 = require("./api/index");
const errorHandler = require("./helpers/errorHandler");
const boom = require('express-boom');
const db_1 = require("./config/db");
const _ = require("lodash");
const scoreBoardModel_1 = require("./models/scoreBoardModel");
const userModel_1 = require("./models/userModel");
class App {
    constructor() {
        this.express = express();
        this.setMiddleware();
        this.setRoutes();
        this.catchErrors();
        this.connectToDatebase();
    }
    setMiddleware() {
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use('/static', express.static('uploads'));
        this.express.use(cors());
        this.express.use(boom());
        this.express.use((req, res, next) => {
            const params = _.merge(req.body, req.params);
            console.table(params);
            return next();
        });
    }
    setRoutes() {
        this.express.use('/v1', index_1.default);
    }
    catchErrors() {
        this.express.use(errorHandler.notFound);
        this.express.use(errorHandler.internalServerError);
    }
    connectToDatebase() {
        db_1.default.sync({ force: false });
        db_1.default.authenticate()
            .then(() => {
            // realation defenation will come here
            scoreBoardModel_1.default.belongsTo(userModel_1.default);
            console.log('Connection has been established successfully.');
        })
            .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map