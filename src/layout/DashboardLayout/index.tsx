import { AppSidebar } from "@/components/app-sidebar";
import NavHeader from "@/components/nav-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import { useLocation } from "react-router-dom";
export const DashboardLayout: React.FC = () => {
  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  const breadcrumbNameMap: Record<string, string> = {
    dashboard: "Dashboard",
    products: "Products",
    customers: "Customers",
    users: "Users",
    payments: "Payments",
    list: "List",
    orders: "Orders",
    create: "Create",
  };

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  // const currentPath = location.pathname;
  // const pageTitle = breadcrumbMap[currentPath] || "Page";

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    {pathnames.map((segment, index) => {
                      const routeTo = `/${pathnames
                        .slice(0, index + 1)
                        .join("/")}`;
                      const isLast = index === pathnames.length - 1;
                      const label = breadcrumbNameMap[segment] || segment;

                      return (
                        <React.Fragment key={routeTo}>
                          <BreadcrumbItem>
                            {isLast ? (
                              <BreadcrumbPage>{label}</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink asChild>
                                <NavLink to={routeTo}>{label}</NavLink>
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                      );
                    })}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <NavHeader user={user} />
            </div>
          </header>
          <main className="min-h-[100vh]">
            <div className="p-4">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

{
  /* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
  <div className="grid auto-rows-min gap-4 md:grid-cols-3">
    <div className="bg-muted/50 aspect-video rounded-xl" />
    <div className="bg-muted/50 aspect-video rounded-xl" />
    <div className="bg-muted/50 aspect-video rounded-xl" />
  </div>
  <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
</div>; */
}
