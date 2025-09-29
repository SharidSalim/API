import { Card, Badge } from "flowbite-react";

type ACardProps = {
  username: string;
  email: string;
  otpVerified: boolean;
};

const ACard = ({ username, email, otpVerified }: ACardProps) => {
  return (
    <Card className="flex w-[295px] h-[311px] mx-5 flex-col items-center text-center">
      <img
        src="https://static.wikia.nocookie.net/beluga/images/d/da/V8z0crk5gho71.webp/revision/latest?cb=20221103210216"
        alt="profile"
        className="mb-3 h-20 w-20 mx-auto rounded-full border-2 border-gray-300"
      />
      <h2 className="text-lg font-semibold">{username}</h2>
      <p className="text-sm text-gray-600">{email}</p>
      {otpVerified ? (
        <Badge color="success" className="mt-2 text-center">
          ✅ Verified
        </Badge>
      ) : (
        <Badge color="failure" className="mt-2 text-center">
          ❌ Not Verified
        </Badge>
      )}
    </Card>
  );
};

export default ACard;
