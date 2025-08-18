import { Button } from "@/components/ui/button"; // ShadCN button
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ code = 404 }) => {
  const navigate = useNavigate();

  const errorMessages = {
    404: {
      title: "404 - Page Not Found",
      message: "Oops! The page you’re looking for doesn’t exist.",
    },
    500: {
      title: "500 - Internal Server Error",
      message: "Something went wrong. Please try again later.",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-6">
      {/* Logo */}
      <img
        src="/errors.png" // replace with dark-compatible image (white/transparent preferred)
        alt="Error Logo"
        className="w-28 h-28 mb-6 invert"
      />

      {/* Error Title */}
      <h1 className="text-6xl font-bold">{errorMessages[code].title}</h1>
      <p className="text-lg text-gray-300 mt-4">{errorMessages[code].message}</p>

      {/* Back to Home Button */}
      <Button
        className="mt-6 px-6 py-3 text-lg bg-white text-black hover:bg-gray-200 transition"
        onClick={() => navigate("/")}
      >
        reload
      </Button>
    </div>
  );
};

export default ErrorPage;

