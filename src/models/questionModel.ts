import sequelize from '../config/db';
import { INTEGER, STRING } from 'sequelize';
import { Model, Sequelize } from 'sequelize';
import { DATE } from 'sequelize';

class QuestionModel extends Model { }

QuestionModel.init({
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    question:{
        type: STRING,
        allowNull: false
    },
    option_a:{
        type: STRING,
        allowNull: false
    },
    option_b:{
        type: STRING,
        allowNull: false
    },
    option_c:{
        type: STRING,
        allowNull: false
    },
    option_d:{
        type: STRING,
        allowNull: false
    },
    correct:{
        type: STRING,
        allowNull: false
    },
    type:{
        type: STRING,
        allowNull: false
    },
    isDel: {
        type: INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'questions',
    tableName: 'questions'
});

export default QuestionModel;