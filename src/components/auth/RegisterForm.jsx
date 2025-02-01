import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register as registerUser } from "@/services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = ({ setFormType, setError }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    try {
      await registerUser(data.email, data.password);
      toast.success("Registration successful! Please login.");
      setFormType("login");
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

      <div>
        <Label className="text-black">Confirm Password</Label>
        <Input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Register
      </Button>

      <div className="text-center text-sm text-black mt-4">
        <p>
          Already have an account?{" "}
          <button className="text-blue-500 hover:underline" onClick={() => setFormType("login")}>
            Login
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
