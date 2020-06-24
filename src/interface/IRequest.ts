import * as express from 'express';
import IUser from './IUser';
import IQuestion from './IQuestion';
import IScoreBoard from './IScoreBoard';


export default interface IRequest extends express.Request {
    data?: any;
    token?: string;
    users?: IUser | IUser[] | any;
    question?: IQuestion | IQuestion[] | any;
    score?: IScoreBoard | IScoreBoard[] | any;
}