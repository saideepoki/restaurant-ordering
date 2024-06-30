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
import { SignupSchema } from "../schemas/Signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link,useNavigate} from "react-router-dom";
import { Soup } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useToast } from "../components/ui/use-toast";
import { ApiResponse } from "../types/ApiResponse";

function StaffRegister() {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  });
  const {toast} = useToast();
  const navigate = useNavigate();

  async function onSubmit(data: any) {
    try{
      const response = await axios.post('/staff/register',{
        username: data.username,
        email: data.email,
        password: data.password
      })
      if(!response.data.success) {
        toast({
          title: "Registration",
          description: response.data.message,
          variant: "destructive"
        })
      }
      toast({
        title: "Registration",
        description: response.data.message,
        variant: "default"
      })
      navigate(`/verify/${data.email}`);
    }catch(err) {
      const axiosError = err as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message ?? "Internal Server Error";
      console.error(errorMessage);
      toast({
        title: "Registration",
        description: errorMessage,
        variant: "destructive"
      })

    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left section with the photo */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: `url("/sign-up.jpg")`}}>
        
      </div>

      {/* Right section with the form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 mb-10">
        <div className="flex flex-row justify-center items-center mb-6">
          <Link to="/" className="flex items-center">
            <Soup className="h-8 w-8 mr-2" />
            <h2 className="text-zinc-950 font-extrabold text-2xl">Welcome to Eat</h2>
          </Link>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
            Already registered?{" "}
            <Link to="/staff/login" className="text-zinc-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StaffRegister;
