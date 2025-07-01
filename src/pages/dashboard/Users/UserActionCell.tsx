// components/table/UserActionCell.tsx

"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import type { IUser } from "@/types";
import {
  useDeleteAdminUserMutation,
  useUpdateAdminUserMutation,
} from "@/redux/features/users/userApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

interface UserActionCellProps {
  user: IUser;
}

export const UserActionCell: React.FC<UserActionCellProps> = ({ user }) => {
  const currentUser = useAppSelector(selectCurrentUser);

  const [updateUserStatus, { isLoading }] = useUpdateAdminUserMutation();

  const [deleteUser] = useDeleteAdminUserMutation();

  const canCurrentUserModify = () => {
    if (!currentUser || !user) return false;

    if (user.email === "moderator@gmail.com") return false;

    if (currentUser.email === user.email) return false; // cannot modify self
    if (currentUser.role === "superAdmin") {
      // superAdmin can modify admin and moderator
      return user.role === "admin" || user.role === "moderator";
    }
    if (currentUser.role === "admin") {
      // admin can modify moderator
      return user.role === "moderator";
    }
    return false;
  };

  const handleToggleStatus = async () => {
    try {
      await updateUserStatus({
        id: user?._id,
        payload: {
          isDisabled: !user?.isDisabled,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update user status.");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser({
        id: user?._id,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <NavLink to={`/dashboard/customers/${user._id}`}>
            View customer
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={handleToggleStatus}
            disabled={
              user.role === "admin" ||
              user.role === "superAdmin" ||
              isLoading ||
              !canCurrentUserModify()
            }
            size={"sm"}
            className="w-full"
            variant={user.isDisabled ? "default" : "outline"}
          >
            {user.isDisabled ? "Enable" : "Disable"}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={handleDeleteUser}
            size={"sm"}
            className="w-full"
            variant={"destructive"}
            disabled={!canCurrentUserModify()}
          >
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
