import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).max(30, { message: "Username must be less than 30 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});