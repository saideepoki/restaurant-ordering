import { transporter } from "../utils/nodemailerConfig";

export async function sendVerificationEmail(email: string, otp: string) {

  const options = {
    from: 'deeps2657@gmail.com',
    to: email,
    subject: 'OTP Verification',
    html: `Your OTP is ${otp}`,
  };

  try{
    await transporter.sendMail(options);
   return {success: true, message: 'Successfully sent Verification code'};
  } catch(verificationEmailError) {
    console.log("Error sending Verification Email",verificationEmailError);
    return {success: false, message: "Error Sending Verification Email"};
  }
}
