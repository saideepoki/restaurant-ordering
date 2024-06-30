import {Router} from 'express';
import {registerStaff} from '../controllers/register.js';
import { verifyUserOtp } from '../controllers/verifyOtp.js';
import {loginStaff} from '../controllers/login.js'
import { logoutUser } from '../controllers/logout.js';
import { checkAuth } from '../controllers/checkAuth.js';
const staffRouter = Router();

staffRouter.post('/register',registerStaff)
staffRouter.post('/login',loginStaff);
staffRouter.get('/check-auth',checkAuth);
staffRouter.post('/logout',logoutUser);

export default staffRouter;