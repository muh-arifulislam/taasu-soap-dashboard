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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import OrderStatusHistory from "@/components/card/OrderStatusHistory";

const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const { data } = useGetOrderQuery(id as string);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="col-span-1 sm:col-span-3 grid grid-cols-1 gap-4">
          <div className="border rounded p-4">
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-xl font-medium">#0758267/90</h4>
                <Button size={"sm"} className="bg-slate-50 text-green-600">
                  Paid
                </Button>
                <Button size={"sm"} variant={"outline"}>
                  In Progress
                </Button>
              </div>
              <div>
                <h5 className="text-sm">
                  Order / Order Details / #0758267/90 - April 23 , 2024 at 6:23
                  pm
                </h5>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <Button variant={"secondary"} className="font-regular">
                Estimated shipping date : Apr 25 , 2024
              </Button>
              <Button variant={"default"} className="font-regular">
                Make as Ready to Ship
              </Button>
            </div>
          </div>
          <div className="">
            <Card>
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
                    {data?.data?.items.map((item: any) => (
                      <TableRow key={item?.product?._id}>
                        <TableCell>
                          {/* Replace with actual product image if available */}
                          <Avatar>
                            <AvatarImage src={item?.product?.images[0]} />
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
          </div>
          <div className="">
            <OrderStatusHistory />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4">
            <div className="">
              <Card className="w-full">
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
                      <span className="font-medium">500</span>
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
                    <span className="text-lg font-bold">500</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="">
              <CustomerDetailsCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
