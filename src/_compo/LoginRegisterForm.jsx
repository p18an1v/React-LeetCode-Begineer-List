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
import { login, register, forgotPassword, resetPassword } from "@/services/api"; // Import resetPassword API function

export default function LoginRegisterForm({ onLogin }) {
  const [formType, setFormType] = useState("login"); // "login" | "register" | "forgot" | "reset"
  const [error, setError] = useState("");
  const [resetToken, setResetToken] = useState(""); // Store the reset token

  const {
    register: formRegister,
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
        console.log("Registration Response:", response.data);
        alert("Registration successful! Please login.");
        setFormType("login");
      } else if (formType === "forgot") {
        // Forgot Password API call
        const response = await forgotPassword(data.email);
        console.log("Forgot Password Response:", response.data);
        setResetToken(response.data.token); // Store the token
        alert("Password reset token sent to your email.");
        setFormType("reset"); // Switch to reset password form
      } else if (formType === "reset") {
        // Reset Password API call
        const response = await resetPassword(data.token, data.newPassword);
        console.log("Reset Password Response:", response.data);
        alert("Password reset successful! Please login.");
        setFormType("login"); // Redirect to login after reset
      } else {
        // Login API call
        const response = await login(data.email, data.password);
        console.log("Login Response:", response.data);
        localStorage.setItem("token", response.data.token); // Store token
        alert("Login successful!");
        if (onLogin) onLogin(); 
        window.location.reload(); // Refresh the page to update the UI
      }
    } catch (err) {
      console.error("API Error:", err);
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
            {formType === "login"
              ? "Login"
              : formType === "register"
              ? "Register"
              : formType === "forgot"
              ? "Forgot Password"
              : "Reset Password"}
          </DialogTitle>
          <DialogDescription className="text-black">
            {formType === "login"
              ? "Enter your email and password to login."
              : formType === "register"
              ? "Create an account to get started."
              : formType === "forgot"
              ? "Enter your email to reset your password."
              : "Enter your new password."}
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field (for Login, Register, and Forgot Password) */}
          {(formType === "login" || formType === "register" || formType === "forgot") && (
            <div>
              <Label className="text-black">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                {...formRegister("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          )}

          {/* Password Fields (for Login and Register) */}
          {(formType === "login" || formType === "register") && (
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

          {/* New Password and Token Fields (for Reset Password) */}
{formType === "reset" && (
  <>
    {/* Token Field */}
    <div>
      <Label className="text-black">Token</Label>
      <Input
        type="text"
        {...formRegister("token", {
          required: "Token is required",
        })}
      />
      {errors.token && <p className="text-red-500 text-sm">{errors.token.message}</p>}
    </div>

    {/* New Password Field */}
    <div>
      <Label className="text-black">New Password</Label>
      <Input
        type="password"
        {...formRegister("newPassword", {
          required: "New Password is required",
          minLength: { value: 6, message: "Password must be at least 6 characters" },
        })}
      />
      {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
    </div>
  </>
)}

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            {formType === "login"
              ? "Login"
              : formType === "register"
              ? "Register"
              : formType === "forgot"
              ? "Send Reset Token"
              : "Reset Password"}
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
          ) : formType === "forgot" ? (
            <button className="text-blue-500 hover:underline" onClick={() => setFormType("login")}>
              Back to Login
            </button>
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