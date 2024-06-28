import {z} from 'zod';

// Login schema
export const LoginSchema = z.object({
    identifier: z.string({ message: "Invalid Username or email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  });