import {Router} from 'express';
import {registerUser} from '../controllers/register.js';
import { verifyUserOtp } from '../controllers/verifyOtp.js';
import {loginUser} from '../controllers/login.js'
import { logoutUser } from '../controllers/logout.js';
import { checkAuth } from '../controllers/checkAuth.js';
const userRouter = Router();

userRouter.post('/register',registerUser)
userRouter.post('/verify',verifyUserOtp)
userRouter.post('/login',loginUser);
userRouter.get('/check-auth',checkAuth);
userRouter.post('/logout',logoutUser);

export default userRouter;