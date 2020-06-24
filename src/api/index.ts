import { Router } from 'express';
import user from './userRoute';
import scoreBoadr from './scoreBoardRoute';
import question from './questionRoute';
import admin from './adminRoute';
import scoreBoard from './scoreBoardRoute';

const router: Router = Router();

router.use('/admin', admin);
router.use('/user', user);
router.use('/score', scoreBoard);
router.use('/question',question);

router.get('/', (req,res)=>{
    res.send({
        msg : 'working!'
    });
})

export default router;