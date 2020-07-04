"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class QuestionModel extends sequelize_2.Model {
}
QuestionModel.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    question: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    option_a: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    option_b: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    option_c: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    option_d: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    correct: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    type: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    isDel: {
        type: sequelize_1.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: db_1.default,
    modelName: 'questions',
    tableName: 'questions'
});
exports.default = QuestionModel;
//# sourceMappingURL=questionModel.js.map