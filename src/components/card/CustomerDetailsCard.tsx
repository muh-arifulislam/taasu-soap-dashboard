import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Mail, MapPin } from "lucide-react";
import { Separator } from "../ui/separator";
import { NavLink } from "react-router-dom";

interface CustomerDetailsProps {
  name?: string;
  email?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  profileImage?: string;
}

export default function CustomerDetailsCard({
  name = "Sarah Johnson",
  email = "sarah.johnson@example.com",
  address = {
    street: "123 Oak Street, Apt 4B",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    country: "United States",
  },
  profileImage = "/placeholder.svg?height=80&width=80",
}: CustomerDetailsProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

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
            <AvatarImage src={profileImage || "/placeholder.svg"} alt={name} />
            <AvatarFallback className="text-lg font-semibold">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <NavLink
              to={"#"}
              className="text-xl font-semibold text-foreground hover:underline"
            >
              {name}
            </NavLink>
            <p className="text-sm text-muted-foreground">Customer since 2023</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{email}</p>
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
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p>{address.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Orders</span>
            <span className="font-medium">24</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
