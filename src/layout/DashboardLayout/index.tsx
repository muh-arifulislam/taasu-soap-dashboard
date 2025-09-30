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
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useGetMeQuery } from "@/redux/features/users/userApi";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import { useLocation } from "react-router-dom";

export const DashboardLayout: React.FC = () => {
  const breadcrumbNameMap: Record<string, string> = {
    dashboard: "Dashboard",
    products: "Products",
    inventories: "Inventories",
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

  const { data } = useGetMeQuery(undefined);
  // Sample data for demonstration

  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen bg-background w-full">
          {/* Sidebar */}
          <AppSidebar />
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Navbar - Fixed */}
            <header className="flex items-center justify-between px-6 py-0 border-b border-border bg-background dark:bg-primary-foreground">
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
                <NavHeader
                  user={{
                    name: `${data?.data?.firstName} ${data?.data?.lastName}`,
                    email: data?.data?.email ?? "example@gmail.com",
                    avatar: "",
                  }}
                />
              </div>
            </header>

            {/* Main Content - Scrollable */}
            <main className="flex-1 overflow-auto p-4 bg-secondary">
              <Outlet />
            </main>

            {/* Bottom Pagination - Fixed */}
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

// {/* <div
//   className={cn(
//     "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
//     sidebarCollapsed ? "w-16" : "w-64"
//   )}
// >
//   {/* Sidebar Header */}
//   <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
//     {!sidebarCollapsed && (
//       <h2 className="text-lg font-semibold text-sidebar-foreground">
//         Dashboard
//       </h2>
//     )}
//     <Button
//       variant="ghost"
//       size="sm"
//       onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//       className="text-sidebar-foreground hover:bg-sidebar-accent"
//     >
//       {sidebarCollapsed ? (
//         <Menu className="h-4 w-4" />
//       ) : (
//         <X className="h-4 w-4" />
//       )}
//     </Button>
//   </div>

//   {/* Sidebar Navigation */}
//   <nav className="flex-1 p-4 space-y-2">
//     {sidebarItems.map((item, index) => (
//       <Button
//         key={index}
//         variant={item.active ? "default" : "ghost"}
//         className={cn(
//           "w-full justify-start gap-3",
//           sidebarCollapsed && "justify-center px-2",
//           item.active
//             ? "bg-sidebar-primary text-sidebar-primary-foreground"
//             : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//         )}
//       >
//         <item.icon className="h-4 w-4 flex-shrink-0" />
//         {!sidebarCollapsed && <span>{item.label}</span>}
//       </Button>
//     ))}
//   </nav>

//   {/* Sidebar Footer */}
//   <div className="p-4 border-t border-sidebar-border">
//     <div
//       className={cn(
//         "flex items-center gap-3",
//         sidebarCollapsed && "justify-center"
//       )}
//     >
//       <Avatar className="h-8 w-8">
//         <AvatarImage src="/diverse-user-avatars.png" />
//         <AvatarFallback>JD</AvatarFallback>
//       </Avatar>
//       {!sidebarCollapsed && (
//         <div className="flex-1 min-w-0">
//           <p className="text-sm font-medium text-sidebar-foreground truncate">
//             John Doe
//           </p>
//           <p className="text-xs text-sidebar-foreground/70 truncate">
//             john@example.com
//           </p>
//         </div>
//       )}
//     </div>
//   </div>
// </div> */}
