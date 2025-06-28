import { DashboardLayout } from "@/layout/DashboardLayout";
import { MainLayout } from "@/layout/MainLayout";
import Login from "@/pages/auth/Login";
import Orders from "@/pages/dashboard/Orders";
import OrderDetails from "@/pages/dashboard/Orders/Details";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:id",
        element: <OrderDetails />,
      },
    ],
  },
]);
