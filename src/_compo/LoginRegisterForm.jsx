import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login, register, forgotPassword } from "@/services/api"; // Import API functions

export default function LoginRegisterForm() {
  const [formType, setFormType] = useState("login"); // "login" | "register" | "forgot"
  const [error, setError] = useState("");

  const {
    register: formRegister, // Renaming register from useForm to avoid conflicts
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError(""); // Clear previous errors
    console.log("Form Data:", data); // Debugging: Log the form data

    try {
      if (formType === "register") {
        // Register API call
        const response = await register(data.email, data.password);
        console.log("Registration Response:", response.data); // Debugging: Log the response
        alert("Registration successful! Please login.");
        setFormType("login"); // Redirect to login after registration
      } else if (formType === "forgot") {
        // Forgot Password API call
        const response = await forgotPassword(data.email);
        console.log("Forgot Password Response:", response.data); // Debugging: Log the response
        alert("Password reset link sent to your email.");
      } else {
        // Login API call
        const response = await login(data.email, data.password);
        console.log("Login Response:", response.data); // Debugging: Log the response
        localStorage.setItem("token", response.data.token); // Store token
        alert("Login successful!");
        window.location.reload(); // Refresh the page to update the UI
      }
    } catch (err) {
      console.error("API Error:", err); // Debugging: Log the error
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-[#09090B]">
          Login / Register
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm bg-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-black">
            {formType === "login" ? "Login" : formType === "register" ? "Register" : "Forgot Password"}
          </DialogTitle>
          <DialogDescription className="text-black">
            {formType === "login"
              ? "Enter your email and password to login."
              : formType === "register"
              ? "Create an account to get started."
              : "Enter your email to reset your password."}
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <Label className="text-black">Email</Label>
            <Input
              type="email"
              placeholder="m@example.com"
              {...formRegister("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Fields */}
          {formType !== "forgot" && (
            <>
              <div>
                <Label className="text-black">Password</Label>
                <Input
                  type="password"
                  {...formRegister("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              {/* Confirm Password (Only for Register) */}
              {formType === "register" && (
                <div>
                  <Label className="text-black">Confirm Password</Label>
                  <Input
                    type="password"
                    {...formRegister("confirmPassword", {
                      validate: (value) => value === watch("password") || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            {formType === "login" ? "Login" : formType === "register" ? "Register" : "Reset Password"}
          </Button>
        </form>

        {/* Toggle Between Forms */}
        <div className="text-center text-sm text-black mt-4">
          {formType === "login" ? (
            <>
              <button className="text-blue-500 hover:underline" onClick={() => setFormType("forgot")}>
                Forgot Password?
              </button>
              <p className="mt-2">
                Don't have an account?{" "}
                <button className="text-blue-500 hover:underline" onClick={() => setFormType("register")}>
                  Register
                </button>
              </p>
            </>
          ) : formType === "register" ? (
            <p>
              Already have an account?{" "}
              <button className="text-blue-500 hover:underline" onClick={() => setFormType("login")}>
                Login
              </button>
            </p>
          ) : (
            <button className="text-blue-500 hover:underline" onClick={() => setFormType("login")}>
              Back to Login
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}