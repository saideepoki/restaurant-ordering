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
import { Link } from "react-router-dom";
import { Soup } from "lucide-react";

function Signup() {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  });

  async function onSubmit(data: any) {
    console.log(data);
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
            <Link to="/sign-in" className="text-zinc-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
