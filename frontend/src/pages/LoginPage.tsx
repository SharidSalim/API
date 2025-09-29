import axios from "axios";
import { Label, TextInput, Button, HelperText } from "flowbite-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiMail, HiLockClosed } from "react-icons/hi";
import { Link, useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/login", {
        email,
        password,
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const statusCode = err.response.status;
        if (statusCode === 401 && err.response.data === "Incorrect password") {
          toast.error(err.response.data);
        } else if (statusCode === 401) {
          navigate("/otp", { state: { email } });
        }
      }
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-lg bg-white p-8 shadow-lg"
      >
        <h1 className="text-center text-2xl font-bold text-gray-800">Login</h1>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Email</Label>
          </div>
          <TextInput
            id="email"
            type="email"
            icon={HiMail}
            placeholder="name@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Password</Label>
          </div>
          <TextInput
            id="password"
            type="password"
            icon={HiLockClosed}
            placeholder="••••••••"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>

        <HelperText className="text-center">
          Don't have an account?{" "}
          <Link
            to="/"
            className="cursor-pointer font-semibold text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </HelperText>
      </form>
      <Toaster position="top-center" />
    </div>
  );
};

export default LoginPage;
