import {Router} from 'express';
import registerUser from '../controllers/register';
import { verifyUserOtp } from '../controllers/verifyOtp';

const userRouter = Router();

userRouter.post('/register',registerUser)
userRouter.post('/verify',verifyUserOtp)

export default userRouter;