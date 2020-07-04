"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const userModel_1 = require("./userModel");
class ScoreBoardModel extends sequelize_2.Model {
}
ScoreBoardModel.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: 'id'
        }
    },
    type: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    score: {
        type: sequelize_1.INTEGER,
        defaultValue: 0
    },
    isDel: {
        type: sequelize_1.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: db_1.default,
    modelName: 'scoreBoard',
    tableName: 'scoreBoard'
});
exports.default = ScoreBoardModel;
//# sourceMappingURL=scoreBoardModel.js.map