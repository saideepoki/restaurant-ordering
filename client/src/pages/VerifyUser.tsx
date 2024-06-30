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
import { useParams, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useToast } from "../components/ui/use-toast";
import { ApiResponse } from "../types/ApiResponse";
import { OtpSchema } from "../schemas/OtpSchema";
import { Soup } from "lucide-react";
import { Link } from "react-router-dom";

function VerifyOtp() {
  const { email } = useParams(); // Extract email from route params
  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: '',
    },
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmit(data: any) {
    try {
      const response = await axios.post('/user/verify', {
        email: email,
        otp: data.otp,
      });
      if (!response.data.success) {
        toast({
          title: "Verification",
          description: response.data.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Verification",
          description: response.data.message,
          variant: "default"
        });
        navigate('/sign-in'); // Redirect to sign-in page on success
      }
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message ?? "Internal Server Error";
      console.error(errorMessage);
      toast({
        title: "Verification",
        description: errorMessage,
        variant: "destructive"
      });
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left section with the photo */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: `url("/verify-otp.jpg")`}}>
        
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
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your OTP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center">
              <Button type="submit">Verify OTP</Button>
            </div>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Didn't receive an OTP?{" "}
            <Link to="/resend-otp" className="text-zinc-600">
              Resend OTP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
