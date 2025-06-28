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
          url: "#",
        },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: Box,
      items: [
        {
          title: "List",
          url: "#",
        },
        {
          title: "Create",
          url: "#",
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
          url: "#",
        },
        {
          title: "Create",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavAdmin items={data.admin} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
