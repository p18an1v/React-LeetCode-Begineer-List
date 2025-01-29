import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginRegisterForm() {
  const [formType, setFormType] = useState("login"); // "login" | "register" | "forgot" | "verify"
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (formType === "register") {
      setFormType("verify");
      setEmailSent(true);
    } else if (formType === "forgot") {
      alert("Password reset link sent to your email.");
    } else {
      alert("Logging in...");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-[#09090B]">Login / Register</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm bg-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-black">
            {formType === "login" ? "Login" : formType === "register" ? "Register" : formType === "forgot" ? "Forgot Password" : "Verify Email"}
          </DialogTitle>
          <DialogDescription className="text-black">
            {formType === "login"
              ? "Enter your email and password to login."
              : formType === "register"
              ? "Create an account to get started."
              : formType === "forgot"
              ? "Enter your email to reset your password."
              : "A verification link has been sent to your email. Check your inbox and verify your account."}
          </DialogDescription>
        </DialogHeader>
        {formType !== "verify" ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <Label className="text-black">Email</Label>
              <Input type="email" placeholder="m@example.com" {...register("email", { required: "Email is required" })} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Fields */}
            {formType !== "forgot" && (
              <>
                <div>
                  <Label className="text-black">Password</Label>
                  <Input type="password" {...register("password", { required: "Password is required", minLength: 6 })} />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Confirm Password (Only for Register) */}
                {formType === "register" && (
                  <div>
                    <Label className="text-black">Confirm Password</Label>
                    <Input
                      type="password"
                      {...register("confirmPassword", {
                        validate: (value) => value === watch("password") || "Passwords do not match",
                      })}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                  </div>
                )}
              </>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              {formType === "login" ? "Login" : formType === "register" ? "Register" : "Reset Password"}
            </Button>
          </form>
        ) : (
          <div className="text-center text-green-500">
            ✅ Verification email sent to <strong>{watch("email")}</strong>. Please check your inbox.
          </div>
        )}

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
