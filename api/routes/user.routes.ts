import {Router} from 'express';
import {registerUser} from '../controllers/register';
import { verifyUserOtp } from '../controllers/verifyOtp';
import {loginUser} from '../controllers/login'
import { logoutUser } from '../controllers/logout';
import { checkAuth } from '../controllers/checkAuth';
const userRouter = Router();

userRouter.post('/register',registerUser)
userRouter.post('/verify',verifyUserOtp)
userRouter.post('/login',loginUser);
userRouter.get('/check-auth',checkAuth);
userRouter.post('/logout',logoutUser);

export default userRouter;