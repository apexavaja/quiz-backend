import sequelize from '../config/db';
import { INTEGER, STRING } from 'sequelize';
import { Model, Sequelize } from 'sequelize';
import { DATE } from 'sequelize';
import UserModel from './userModel';

class ScoreBoardModel extends Model { }

ScoreBoardModel.init({
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    type: {
        type: STRING,
        allowNull: false
    },
    score: {
        type: INTEGER,
        defaultValue: 0
    },
    isDel: {
        type: INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'scoreBoard',
    tableName: 'scoreBoard'
});

export default ScoreBoardModel;