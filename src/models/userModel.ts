import sequelize from '../config/db';
import { INTEGER, STRING } from 'sequelize';
import { Model, Sequelize } from 'sequelize';
import { DATE } from 'sequelize';

class UserModel extends Model { }

UserModel.init({
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: STRING
    },
    password: {
        type: STRING
    },
    isDel: {
        type: INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'users',
    tableName: 'users'
});

export default UserModel;