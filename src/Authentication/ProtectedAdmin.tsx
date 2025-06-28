import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);

  if (user?.role === "superAdmin" || user?.role === "admin") {
    return children;
  } else {
    return <Navigate to={"/dashboard"} />;
  }
};

export default ProtectedAdmin;
