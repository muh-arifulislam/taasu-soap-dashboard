import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const passwordSchema = z.object({
  currentPassword: z.string().min(5, "Current Password is required!"),
  newPassword: z.string().min(5, "New Password is required!"),
  confirmPassword: z.string().min(5, "Confirm Password is required!"),
});

type FormValues = z.infer<typeof passwordSchema>;

interface ProfileFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
}

export const PasswordChangeForm: React.FC<ProfileFormProps> = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [handlePasswordChange] = useChangePasswordMutation();

  const onSubmit = async (values: FormValues) => {
    const isNewPasswordMatched = values.newPassword === values.confirmPassword;
    if (!isNewPasswordMatched) {
      toast.error("Your new password did not matched!");
      return;
    }

    try {
      const result = await handlePasswordChange({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (result?.data?.success) {
        toast.success(
          "Password change successful. Please! login with new password."
        );
        dispatch(logout());
        navigate("/login", { replace: true });
      } else {
        throw new Error(result?.data?.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message ? err.message : "Failed to change password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <div className="relative">
          <Input
            id="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            {...register("currentPassword")}
            disabled={data?.accountType !== "email"}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.currentPassword && (
          <span className="text-sm text-red-500">
            {errors.currentPassword.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            {...register("newPassword")}
            disabled={data?.accountType !== "email"}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.newPassword && (
          <span className="text-sm text-red-500">
            {errors.newPassword.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            disabled={data?.accountType !== "email"}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <span className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <Button className="w-full sm:w-auto" type="submit">
        Update Password
      </Button>
    </form>
  );
};

export default PasswordChangeForm;
