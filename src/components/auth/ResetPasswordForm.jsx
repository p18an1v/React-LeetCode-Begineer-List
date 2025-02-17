import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordForm = ({ setFormType, setError, resetToken }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    try {
      await resetPassword(resetToken, data.newPassword);
      toast.success("Password reset successful! Please login.");
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
        <Label className="text-black">Token</Label>
        <Input
          type="text"
          {...register("token", { required: "Token is required" })}
        />
        {errors.token && <p className="text-red-500 text-sm">{errors.token.message}</p>}
      </div>

      <div>
        <Label className="text-black">New Password</Label>
        <Input
          type="password"
          placeholder="New Password"
          {...register("newPassword", {
            required: "New Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
        />
        {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Reset Password
      </Button>

      <div className="text-center text-sm text-black mt-4">
        <button className="text-blue-500 hover:underline" onClick={() => setFormType("login")}>
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
