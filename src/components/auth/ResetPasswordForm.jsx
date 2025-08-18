import React, { useState } from "react";
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

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      await resetPassword(resetToken, data.newPassword);
      toast.success("Password reset successful! Please login.");
      setFormType("login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Token Field */}
      <div>
        <Label className="text-black">Token</Label>
        <Input
          type="text"
          className="text-black"
          {...register("token", { required: "Token is required" })}
        />
        {errors.token && (
          <p className="text-red-500 text-sm">{errors.token.message}</p>
        )}
      </div>

      {/* Password Field with Show/Hide */}
      <div className="relative">
        <Label className="text-black">New Password</Label>
        <Input
          type={showPassword ? "text" : "password"}
          className="text-black pr-10"
          placeholder="New Password"
          {...register("newPassword", {
            required: "New Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-sm text-blue-500"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
        {errors.newPassword && (
          <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Reset Password"
        )}
      </Button>

      {/* Back to Login */}
      <div className="text-center text-sm text-black mt-4">
        <button
          type="button"
          className="text-blue-500 hover:underline"
          onClick={() => setFormType("login")}
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
