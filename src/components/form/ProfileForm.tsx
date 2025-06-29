import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUpdateUserProfileMutation } from "@/redux/features/users/userApi";
import { toast } from "sonner";
import { isShallowEqual, normalizeToEmptyString, pick } from "@/utils";
import { Loader2Icon } from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email().optional(),
  mobile: z.string().min(7, "Phone number is required"),
  role: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const formFieldKeys: (keyof ProfileFormValues)[] = [
  "firstName",
  "lastName",
  "email",
  "mobile",
  "role",
  "addressLine1",
  "addressLine2",
  "city",
  "postalCode",
];

export const ProfileForm: React.FC<ProfileFormProps> = ({
  data,
  isEditing,
  setIsEditing,
}) => {
  const rawDefaultValues = pick(data, formFieldKeys);
  // Normalize both for comparison
  const defaultFormValues = normalizeToEmptyString(rawDefaultValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaultFormValues,
  });

  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const onSubmit = async (values: ProfileFormValues) => {
    const hasValuesChanged = !isShallowEqual(values, defaultFormValues);

    if (!hasValuesChanged) {
      toast.info("No changes detected. Your profile is already up to date.");
      setIsEditing(false);
      return;
    }

    try {
      await updateProfile({
        id: data._id, // still pass full data object for ID
        payload: values,
      });
      toast.success("Profile updated successfully.");
      setIsEditing(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message ?? "Failed to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            disabled={!isEditing}
          />
          {errors.firstName && (
            <span className="text-sm text-red-500">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            disabled={!isEditing}
          />
          {errors.lastName && (
            <span className="text-sm text-red-500">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" {...register("email")} disabled />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mobile">Phone Number</Label>
          <Input id="mobile" {...register("mobile")} disabled={!isEditing} />
          {errors.mobile && (
            <span className="text-sm text-red-500">
              {errors.mobile.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" {...register("role")} disabled />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="addressLine1">Address Line1</Label>
          <Input
            id="addressLine1"
            type="text"
            {...register("addressLine1")}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="addressLine2">Address Line2</Label>
          <Input
            id="addressLine2"
            type="text"
            {...register("addressLine2")}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            type="text"
            {...register("city")}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal</Label>
          <Input
            id="postalCode"
            type="text"
            {...register("postalCode")}
            disabled={!isEditing}
          />
          {errors.postalCode && (
            <span className="text-sm text-red-500">
              {errors.postalCode.message}
            </span>
          )}
        </div>
      </div>
      {isEditing && (
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading && <Loader2Icon className="animate-spin" />}
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
