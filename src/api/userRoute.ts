import { Router } from 'express';
import * as userService from '../service/userService';
import * as userController from '../controller/userController';
import authentication from '../helpers/verifyToken';
const user: Router = Router();

user.post('/login',[
    userService.validData,
    userService.login,
    userController.sendLoginToken
]);

user.post('/',[
    userService.validData,
    userService.checkUserName,
    userService.insertUser,
    userController.sendUser
]);

user.get('/',[
    userService.getAllUsers,
    userController.sendUser
]);

user.put('/',authentication,[
    userService.updatePass,
    userController.otherOpps
]);

user.delete('/',authentication,[
    userService.deleteUser,
    userController.otherOpps
]);

export default user;