import { DashboardLayout } from "@/layout/DashboardLayout";
import { MainLayout } from "@/layout/MainLayout";
import Login from "@/pages/auth/Login";
import Customers from "@/pages/dashboard/Customers";
import CustomerDetails from "@/pages/dashboard/Customers/Details";
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
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "customers/:id",
        element: <CustomerDetails />,
      },
    ],
  },
]);
