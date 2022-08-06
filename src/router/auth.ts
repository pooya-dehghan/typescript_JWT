const router = require('express').Router();
import {loginController , refreshController} from '../controller/auth'

router.post('/login', loginController);
router.post('/refresh', refreshController);

export default router;
