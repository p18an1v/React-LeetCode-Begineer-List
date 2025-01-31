import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/services/authService";

const ForgotPasswordForm = ({ setFormType, setError, setResetToken }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    try {
      const response = await forgotPassword(data.email);
      setResetToken(response.data.token);
      alert("Password reset token sent to your email.");
      setFormType("reset");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label className="text-black">Email</Label>
        <Input
          type="email"
          placeholder="m@example.com"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Send Reset Token
      </Button>

      <div className="text-center text-sm text-black mt-4">
        <button className="text-blue-500 hover:underline" onClick={() => setFormType("login")}>
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;