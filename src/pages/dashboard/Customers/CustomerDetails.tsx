/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  User,
  Calendar,
  CreditCard,
  Package,
  MoreHorizontal,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NavLink, useParams } from "react-router-dom";
import { useGetCustomerQuery } from "@/redux/features/customers/customerApi";
import dayjs from "dayjs";
import CustomerDetailSkeleton from "@/components/skeleton/CustomerDetailsSkeleton";

// Mock customer data
const customer = {
  name: "Customer",
  email: "customer@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder-user.jpg",
  billingAddress: {
    street: "Sadar South",
    city: "Cumilla",
    state: "CY",
    zipCode: "3500",
    country: "Bangladesh",
  },
  shippingAddress: {
    street: "Sadar South",
    city: "Cumilla",
    state: "CY",
    zipCode: "3500",
    country: "Bangladesh",
  },
};

export default function CustomerDetails() {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetCustomerQuery(id as string);

  if (isLoading) {
    return (
      <>
        <CustomerDetailSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <span className="text-4xl mb-2">😕</span>
        <h2 className="text-xl font-semibold mb-1">
          Failed to load customer details
        </h2>
        <p className="text-muted-foreground mb-4">Please try again later.</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6  max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <NavLink to="/dashboard/customers">
            <ArrowLeft className="h-4 w-4" />
          </NavLink>
        </Button>
        <div className="flex items-center gap-4 flex-1">
          <Avatar className="h-12 w-12">
            <AvatarImage src={"/placeholder.svg"} alt={"avatar"} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              {data?.data?.customer?.firstName} {data?.data?.customer?.lastName}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            Active
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Edit Customer
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Deactivate Customer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Customer Information */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-md shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.data?.orders?.length ?? 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Since{" "}
                  {dayjs(data?.data?.customer?.createdAt).format("MMM YYYY")}
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-md shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Spent
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${data?.data?.totalAmountSpent}
                </div>
                <p className="text-xs text-muted-foreground">Lifetime value</p>
              </CardContent>
            </Card>
            <Card className="rounded-md shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg Order Value
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${data?.data?.averageAmountSpent}
                </div>
                <p className="text-xs text-muted-foreground">Per order</p>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card className="rounded-md shadow-none">
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.orders?.map((order: any) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">
                        #{order?.orderId}
                      </TableCell>
                      <TableCell>
                        {dayjs(order?.createdAt).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{order?.orderStatus}</Badge>
                      </TableCell>
                      <TableCell>{order?.items?.length ?? 0}</TableCell>
                      <TableCell>{order?.payment?.method}</TableCell>
                      <TableCell className="text-right font-medium">
                        {order?.totalAmount}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <NavLink
                                to={`/dashboard/orders/${order?.orderId}`}
                              >
                                View Details
                              </NavLink>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Customer Details Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="rounded-md shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {customer.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {customer.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Customer Since</p>
                  <p className="text-sm text-muted-foreground">
                    {dayjs(data?.data?.customer?.createdAt).format("MMM YYYY")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card className="rounded-md shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Billing Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p>{customer.billingAddress.street}</p>
                <p>
                  {customer.billingAddress.city},{" "}
                  {customer.billingAddress.state}{" "}
                  {customer.billingAddress.zipCode}
                </p>
                <p>{customer.billingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="rounded-md shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p>{customer.shippingAddress.street}</p>
                <p>
                  {customer.shippingAddress.city},{" "}
                  {customer.shippingAddress.state}{" "}
                  {customer.shippingAddress.zipCode}
                </p>
                <p>{customer.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="rounded-md shadow-none">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Call Customer
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
