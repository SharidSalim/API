import { useState, useRef } from "react";
import { Label, Button } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleResend = async() => {
    try{
      await axios.put("http://localhost:3000/api/v1/otp",{email})
      toast.success("OTP resent!");
      
    } catch(err){
      toast.error("Something went wrong")
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (otp.length === 6) {
      try {
        await axios.post("http://localhost:3000/api/v1/otp", {
          email,
          otp: Number(otp),
        });
        navigate("/welcome");
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          const statusCode = err.response.status;
          if (statusCode === 401) {
            toast.error("Incorrect OTP");
          } else toast.error("Failed");
        }
      }
    } else {
      toast.error("Please enter all 6 digits");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-lg bg-white p-8 shadow-lg"
      >
        <h1 className="text-center text-2xl font-bold text-gray-800">
          OTP Verification
        </h1>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="otp">Enter OTP</Label>
          </div>

          <input
            id="otp"
            ref={inputRef}
            type="text"
            value={otp}
            onChange={handleChange}
            maxLength={6}
            inputMode="numeric"
            className="absolute opacity-0"
            autoFocus
          />

          {/* OTP boxes */}
          <div
            className="flex cursor-text gap-2"
            onClick={() => inputRef.current?.focus()}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 text-lg font-semibold"
              >
                {otp[i] ?? ""}
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>

        <p className="text-center text-sm text-gray-600">
          Didn't receive the OTP?{" "}
          <span
            onClick={handleResend}
            className="cursor-pointer font-semibold text-blue-600 hover:underline"
          >
            Resend OTP
          </span>
        </p>
      </form>

      <Toaster position="top-center" />
    </div>
  );
};

export default OtpPage;
