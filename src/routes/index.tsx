import ProtectedAdmin from "@/Authentication/ProtectedAdmin";
import ProtectedRoute from "@/Authentication/ProtectedRoute";
import { DashboardLayout } from "@/layout/DashboardLayout";
import { MainLayout } from "@/layout/MainLayout";
import Login from "@/pages/auth/Login";
import DashboardPage from "@/pages/dashboard";
import Customers from "@/pages/dashboard/Customers";
import CustomerDetails from "@/pages/dashboard/Customers/CustomerDetails";
import Orders from "@/pages/dashboard/Orders";
import OrderDetails from "@/pages/dashboard/Orders/Details";
import ProfilePage from "@/pages/dashboard/Profile";
import Users from "@/pages/dashboard/Users";
import CreateUserPage from "@/pages/dashboard/Users/Create";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "customers/:id",
        element: <CustomerDetails />,
      },
      { path: "account", element: <ProfilePage /> },
      {
        path: "users",
        element: (
          <ProtectedAdmin>
            <Users />
          </ProtectedAdmin>
        ),
      },
      {
        path: "users/create",
        element: (
          <ProtectedAdmin>
            <CreateUserPage />
          </ProtectedAdmin>
        ),
      },
    ],
  },
]);
