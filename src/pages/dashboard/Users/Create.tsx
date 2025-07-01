"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Eye, EyeOff, Loader2Icon, UserPlus } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateAdminUserMutation } from "@/redux/features/users/userApi";

const formSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters."),
    lastName: z.string().min(2, "Last name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
    role: z.string({ required_error: "Please select a role." }),
    mobile: z.string().optional(),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    accountType: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

type FormValues = z.infer<typeof formSchema>;

const adminRoles = [
  { value: "admin", label: "Admin" },
  { value: "moderator", label: "Moderator" },
];

export default function CreateUserPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "moderator",
      accountType: "email",
    },
  });

  const [handleCreateAdminUser, { isLoading }] = useCreateAdminUserMutation();

  const onSubmit = async (values: FormValues) => {
    if (values?.password === values?.confirmPassword) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...userPayload } = values;
        await handleCreateAdminUser({
          payload: userPayload,
        });
        reset();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Admin User</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Admin User Information
          </CardTitle>
          <CardDescription>
            Fill in the details below to create a new admin user account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && (
                  <span className="text-sm text-red-500">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <span className="text-sm text-red-500">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Phone Number (Optional)</Label>
                <Input id="mobile" {...register("mobile")} />
                {errors.mobile && (
                  <span className="text-sm text-red-500">
                    {errors.mobile.message}
                  </span>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
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
            </div>

            {/* Role & Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  onValueChange={(value) => {
                    register("role").onChange({
                      target: { value, name: "role" },
                    });
                  }}
                  defaultValue="moderator"
                >
                  <SelectTrigger
                    id="role"
                    className={`w-full ${errors.role ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {adminRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && (
                  <span className="text-sm text-red-500">
                    {errors.role.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select defaultValue="IT Department" disabled>
                  <SelectTrigger
                    id="department"
                    className={`w-full ${errors.role ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select a Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={"it"} value={"IT Department"}>
                      IT Department
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <span className="text-sm text-red-500">
                    {errors.role.message}
                  </span>
                )}
              </div>
            </div>

            {/* isActive */}

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox id="isActive" defaultChecked disabled />

              <div className="space-y-1 leading-none">
                <Label htmlFor="isActive">Active Account</Label>
                <p className="text-sm">
                  This admin user will be able to log in and access the
                  dashboard
                </p>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isLoading}
              >
                {isLoading && <Loader2Icon className="animate-spin" />}
                Create New User
              </Button>
              <Button type="button" variant="outline" onClick={() => reset()}>
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
