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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center px-6">
      {/* Logo */}
      <img 
         src="/errors.png" // Replace with your logo path
        //src="/code-error.png"
        alt="Code Logo"
        className="w-24 h-24 mb-4"
      />

      {/* Error Title */}
      <h1 className="text-6xl font-bold text-black-500">{errorMessages[code].title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">{errorMessages[code].message}</p>

      {/* Back to Home Button */}
      <Button
        className="mt-6 px-6 py-3 text-lg hover:bg-white-600 text-white"
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default ErrorPage;
