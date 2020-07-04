"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class UserModel extends sequelize_2.Model {
}
UserModel.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: sequelize_1.STRING
    },
    password: {
        type: sequelize_1.STRING
    },
    isDel: {
        type: sequelize_1.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: db_1.default,
    modelName: 'users',
    tableName: 'users'
});
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map