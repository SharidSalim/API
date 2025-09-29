import { useEffect, useState } from "react";

import axios from "axios";
import ACard from "../component/ACard";

export default function WelcomePage() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    const abc = async () => {
      const res = await axios.get("http://localhost:3000/api/v1/members");
      setMembers(res.data);
    };
    abc();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Background animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 h-96 w-96 animate-pulse rounded-full bg-purple-400 opacity-30 blur-3xl"></div>
        <div className="absolute right-10 bottom-10 h-80 w-80 animate-ping rounded-full bg-pink-400 opacity-25 blur-3xl"></div>
      </div>

      {/* Welcome message */}
      <h1 className="mb-8 text-4xl font-bold text-white drop-shadow-lg">
        🎉 Welcome to the Server!
      </h1>

      {/* Members list */}
      <div className="flex items-center w-11/12 max-w-5xl flex-wrap">
        {members.map((user, i) => (
          <ACard
            key={i}
            username={user.username}
            email={user.email}
            otpVerified={user.otpVerification}
          />
        ))}
      </div>
    </div>
  );
}
