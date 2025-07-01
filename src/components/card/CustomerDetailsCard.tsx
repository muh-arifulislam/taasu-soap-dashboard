import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Mail, MapPin } from "lucide-react";
import { Separator } from "../ui/separator";
import { NavLink } from "react-router-dom";
import type { IUser, IUserAddress } from "@/types";
import dayjs from "dayjs";

interface CustomerDetailsProps {
  data: IUser;
}

export default function CustomerDetailsCard({ data }: CustomerDetailsProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">
            Customer Details
          </CardTitle>
        </div>
        <Separator />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={""} alt={"profile picture"} />
            <AvatarFallback className="text-lg font-semibold">U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <NavLink
              to={"#"}
              className="text-lg font-semibold text-foreground hover:underline"
            >
              {data?.firstName} {data?.lastName}
            </NavLink>
            <p className="text-sm text-muted-foreground">
              Customer since {dayjs(data?.createdAt).format("YYYY")}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {data?.email}
              </p>
              <p className="text-xs text-muted-foreground">Primary email</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Delivery Address
              </p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  {(data?.address as unknown as IUserAddress)?.addressLine1}
                </p>
                <p> {(data?.address as unknown as IUserAddress)?.city}</p>
                <p>Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {/* <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Orders</span>
            <span className="font-medium">24</span>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
