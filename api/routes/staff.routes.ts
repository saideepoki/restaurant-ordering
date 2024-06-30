import {Router} from 'express';
import {registerStaff} from '../controllers/register';
import { verifyUserOtp } from '../controllers/verifyOtp';
import {loginStaff} from '../controllers/login'
import { logoutUser } from '../controllers/logout';
import { checkAuth } from '../controllers/checkAuth';
const staffRouter = Router();

staffRouter.post('/register',registerStaff)
staffRouter.post('/login',loginStaff);
staffRouter.get('/check-auth',checkAuth);
staffRouter.post('/logout',logoutUser);

export default staffRouter;