import { DashboardLayout } from "@/layout/DashboardLayout";
import { MainLayout } from "@/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [],
  },
]);
