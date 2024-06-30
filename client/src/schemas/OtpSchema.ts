import {z} from 'zod';

export const OtpSchema = z.object({
    otp: z.string().min(6).max(6),
  });