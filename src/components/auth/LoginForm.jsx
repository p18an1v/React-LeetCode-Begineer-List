import React from "react";
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

  const onSubmit = async (data) => {
    setError("");
    try {
      const response = await login(data.email, data.password);
      localStorage.setItem("token", response.data.token);
      if (onLogin) onLogin();
     
      window.location.reload();
     // toast.success("Login successful!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
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
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <Label className="text-black">Password</Label>
        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Login
      </Button>

      <div className="text-center text-sm text-black mt-4">
        <button className="text-blue-500 hover:underline" onClick={() => setFormType("forgot")}>
          Forgot Password?
        </button>
        <p className="mt-2">
          Don't have an account?{" "}
          <button className="text-blue-500 hover:underline" onClick={() => setFormType("register")}>
            Register
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;

