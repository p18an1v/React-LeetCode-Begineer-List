import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordForm = ({ setFormType, setError, setResetToken }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const response = await forgotPassword(data.email);
      setResetToken(response.data.token);
      toast.success("Password reset token sent to your email.");
      setFormType("reset");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
      toast.error("Failed to send reset token. Please try again.");
    } finally {
      setLoading(false);
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
          disabled={loading}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Token Sending..." : "Send Reset Token To Email"}
      </Button>

      <div className="text-center text-sm text-black mt-4">
        <button
          type="button"
          className="text-blue-500 hover:underline"
          onClick={() => setFormType("login")}
          disabled={loading}
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
