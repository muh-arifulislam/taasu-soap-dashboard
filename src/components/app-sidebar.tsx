"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavAdmin } from "@/components/nav-admin";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Box, CreditCard, ShoppingCart, UserCircle, Users } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/users/userApi";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/dashboard/orders",
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
      items: [
        {
          title: "List",
          url: "/dashboard/customers",
        },
      ],
    },
    {
      title: "Payments",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "List",
          url: "/dashboard/payments",
        },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: Box,
      items: [
        {
          title: "Products List",
          url: "/dashboard/products",
        },
        {
          title: "Add Product",
          url: "/dashboard/products/create",
        },
        {
          title: "Manage Categories",
          url: "/dashboard/products/categories",
        },
        {
          title: "Manage Discounts",
          url: "/dashboard/products/discounts",
        },
      ],
    },
  ],
  admin: [
    {
      title: "Users",
      url: "#",
      icon: UserCircle,
      items: [
        {
          title: "List",
          url: "/dashboard/users",
        },
        {
          title: "Create",
          url: "/dashboard/users/create",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector(selectCurrentUser);

  const { data: userData } = useGetMeQuery(undefined);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                {/* < className="!size-5" /> */}
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        {(user?.role === "admin" || user?.role === "superAdmin") && (
          <NavAdmin items={data.admin} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: `${userData?.data?.firstName} ${userData?.data?.lastName}`,
            email: userData?.data?.email ?? "example@gmail.com",
            avatar: "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
