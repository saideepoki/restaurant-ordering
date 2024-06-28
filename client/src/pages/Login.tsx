import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema } from "../schemas/Login";
import { Link } from "react-router-dom";
import { Croissant } from "lucide-react";

function Login() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="flex min-h-width items-center justify-center p-4 mt-10">
      <div className="bg-zinc-200 p-8 rounded shadow-md w-full max-w-md">
      <div className = "flex flex-row justify-center items-center mb-2">
            <h2 className = "text-zinc-950 font-extrabold text-2xl mr-3">Welcome Back!</h2>
            <span><Croissant/></span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email / Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Haven't registered?{" "}
            <Link to="/sign-up" className="text-zinc-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
