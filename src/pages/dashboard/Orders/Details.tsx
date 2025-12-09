/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import CustomerDetailsCard from "@/components/card/CustomerDetailsCard";
import { useGetOrderQuery } from "@/redux/features/orders/orderApi";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OrderStatusHistory from "@/components/card/OrderStatusHistory";
import dayjs from "dayjs";
import OrderDetailsSkeleton from "@/components/skeleton/OrderDetailsSkeleton";
import UpdateOrderStatusButton from "./UpdateStatusButton";

const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetOrderQuery(id as string);

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-red-600 font-semibold">
          Failed to load order details. Please try again.
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="col-span-1 sm:col-span-3 grid grid-cols-1 gap-4">
          <Card className="rounded-md shadow-none">
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-xl font-medium">
                    #{data?.data?.orderId}
                  </h4>
                  <Button
                    size={"sm"}
                    className="bg-slate-50 dark:bg-slate-50/10 text-green-600"
                  >
                    {data?.data?.payment?.status ?? "Unknown"}
                  </Button>
                  <Button size={"sm"} variant={"outline"}>
                    {data?.data?.orderStatus}
                  </Button>
                </div>
                <div>
                  <h5 className="text-sm">
                    Order / Order Details / #{data?.data?.orderId} -{" "}
                    {dayjs(data?.data?.createdAt).format(
                      "MMMM D, YYYY [at] h:mm a"
                    )}
                  </h5>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <Button variant={"secondary"} className="font-regular">
                  Estimated shipping date :{" "}
                  {dayjs(data?.data?.createdAt)
                    .add(7, "day")
                    .format("MMMM D, YYYY")}
                </Button>
                <UpdateOrderStatusButton
                  orderId={data?.data?._id}
                  currentStatus={data?.data?.orderStatus}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-md shadow-none">
            <CardHeader className="pb-0">
              <CardTitle className="">Products</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.items?.map((item: any) => (
                    <TableRow key={item?.product?._id}>
                      <TableCell>
                        {/* Replace with actual product image if available */}
                        <Avatar>
                          <AvatarImage
                            src={
                              item?.product?.images?.length
                                ? item?.product?.images[0]
                                : ""
                            }
                          />
                          <AvatarFallback>IMG</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        {/* Replace with actual product name if available */}
                        {item?.product?.name}
                      </TableCell>
                      <TableCell>${item?.price}</TableCell>
                      <TableCell>{item?.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <OrderStatusHistory
            statusHistory={data?.data?.statusHistory}
            orderNumber={data?.data?.orderId}
          />
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4">
            <div className="">
              <Card className="w-full rounded-md shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Order Summary
                  </CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Subtotal
                      </span>
                      <span className="font-medium">
                        {data?.data?.totalAmount}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Discount
                      </span>
                      <div className="flex items-center gap-2">0.00</div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Delivery Charge
                      </span>
                      <span className="font-medium">0.00</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Tax</span>
                      <span className="font-medium">0.00</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-semibold">
                      Total Amount
                    </span>
                    <span className="text-lg font-bold">
                      {data?.data?.totalAmount}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="">
              <CustomerDetailsCard data={data?.data?.user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
