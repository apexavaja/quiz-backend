import { Router, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import CONFIG from '../config/config';
const admin: Router = Router();

admin.post('/login', (req, res, next) => {
    const params = _.merge(req.body, req.params);

    if (params.email === 'ranahiren27@gmail.com' && params.password === 'hiren@27') {
        jwt.sign({ email: params.email, password: params.password }, CONFIG.JWT_ENCRYPTION, (err: any, token: any) => {
            console.log(token);
            res.json({
                token:token
            });
        });
    } else {
        res.json({
            message: "Enter valid email and password"
        });
    }
});

export default admin;
