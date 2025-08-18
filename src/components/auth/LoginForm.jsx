import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = ({ onLogin, setFormType, setError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setError("");
    try {
      const response = await login(data.email, data.password);
      localStorage.setItem("token", response.data.token);
      if (onLogin) onLogin();
      window.location.reload();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label className="text-black">Email</Label>
        <Input
          type="email"
          placeholder="Email"
          className="text-black"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label className="text-black">Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="text-black pr-10"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
          >
            {showPassword ?  "👁️": "🙈"}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Login
      </Button>

      <div className="text-center text-sm text-black mt-4">
        <button
          type="button"
          className="text-blue-500 hover:underline"
          onClick={() => setFormType("forgot")}
        >
          Forgot Password?
        </button>
        <p className="mt-2">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => setFormType("register")}
          >
            Register
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;


