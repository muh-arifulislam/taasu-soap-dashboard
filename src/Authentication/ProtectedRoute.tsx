import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectCurrentToken);

  // if (loading) {
  //   return (
  //     <>
  //       <Flex style={{ height: "100vh" }} justify="center" align="center">
  //         <Spin size="large" />
  //       </Flex>
  //     </>
  //   );
  // }
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
