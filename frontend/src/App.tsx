import { Label, TextInput, Button, HelperText } from "flowbite-react";
import { useState } from "react";
import { HiMail, HiLockClosed, HiUser } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/reg", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const statusCode = err.response.status;
        if (statusCode === 302) {
          toast.error("Account with this email already exist!");
        }
      }
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow-md"
      >
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Register
        </h1>
        {/* Username */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username">Username</Label>
          </div>
          <TextInput
            id="username"
            type="text"
            icon={HiUser}
            placeholder="JohnDoe"
            required
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        {/* Email */}
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
            autoComplete="off"
            color="gray"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
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
          Submit
        </Button>

        <HelperText className="text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="cursor-pointer font-semibold text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </HelperText>
      </form>

      <Toaster position="top-center" />
    </div>
  );
};

export default App;
