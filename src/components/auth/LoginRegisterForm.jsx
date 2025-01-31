import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { Button } from "@/components/ui/button";

const LoginRegisterForm = React.forwardRef(({ onLogin }, ref) => {
  const [formType, setFormType] = useState("login"); // "login" | "register" | "forgot" | "reset"
  const [error, setError] = useState("");
  const [resetToken, setResetToken] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-[#09090B]">
          Login / Register
        </Button>
      </DialogTrigger>
      <DialogContent ref={ref} className="max-w-sm bg-white rounded-lg shadow-lg p-6">
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

        {formType === "login" && (
          <LoginForm onLogin={onLogin} setFormType={setFormType} setError={setError} />
        )}

        {formType === "register" && (
          <RegisterForm setFormType={setFormType} setError={setError} />
        )}

        {formType === "forgot" && (
          <ForgotPasswordForm
            setFormType={setFormType}
            setError={setError}
            setResetToken={setResetToken}
          />
        )}

        {formType === "reset" && (
          <ResetPasswordForm
            setFormType={setFormType}
            setError={setError}
            resetToken={resetToken}
          />
        )}
      </DialogContent>
    </Dialog>
  );
});

export default LoginRegisterForm;