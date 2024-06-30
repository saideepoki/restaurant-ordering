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
import { Link, useNavigate } from "react-router-dom";
import { Croissant } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useToast } from "../components/ui/use-toast";
import { ApiResponse } from "../types/ApiResponse";

function Login() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmit(data: any) {
    try {
      const response = await axios.post('/user/login', {
        identifier: data.identifier,
        password: data.password,
      });

      if (!response.data.success) {
        toast({
          title: "Login",
          description: response.data.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Login",
          description: "Login successful",
          variant: "default"
        });

        // Redirect to dashboard or another authenticated page
        navigate('/');
      }
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message ?? "Internal Server Error";
      console.error(errorMessage);
      toast({
        title: "Login",
        description: errorMessage,
        variant: "destructive"
      });
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left section with the photo */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('sign-in.jpg')" }}>
        {/* You can add any content here if needed */}
      </div>

      {/* Right section with the form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 mb-12">
        <div className="flex flex-row justify-center items-center mb-6">
          <Link to="/" className="flex items-center">
            <Croissant className="h-8 w-8 mr-2" />
            <h2 className="text-zinc-950 font-extrabold text-2xl">Welcome Back!</h2>
          </Link>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email / Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email or Username" {...field} />
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
