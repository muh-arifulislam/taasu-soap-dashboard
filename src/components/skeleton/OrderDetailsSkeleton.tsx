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

export default function OrderDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {/* Left Column - Main Content */}
      <div className="col-span-1 sm:col-span-3 grid grid-cols-1 gap-4">
        {/* Order Header Section */}
        <div className="border rounded p-4">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              {/* Order ID */}
              <div className="h-7 w-24 bg-gray-200 rounded animate-pulse"></div>
              {/* Payment Status Badge */}
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              {/* Order Status Badge */}
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div>
              {/* Breadcrumb */}
              <div className="h-4 w-80 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Estimated shipping date */}
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
            {/* Ready to ship button */}
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    </TableHead>
                    <TableHead>
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    </TableHead>
                    <TableHead>
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    </TableHead>
                    <TableHead>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Product Row Skeletons */}
                  {[1, 2, 3].map((item) => (
                    <TableRow key={item}>
                      <TableCell>
                        {/* Product Image */}
                        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                      </TableCell>
                      <TableCell>
                        {/* Product Name */}
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </TableCell>
                      <TableCell>
                        {/* Price */}
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </TableCell>
                      <TableCell>
                        {/* Quantity */}
                        <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Order Status History Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status History Items */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Column - Sidebar */}
      <div>
        <div className="grid grid-cols-1 gap-4">
          {/* Order Summary Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                <div className="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
              </CardTitle>
              <Separator />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {/* Summary Line Items */}
                {["Subtotal", "Discount", "Delivery Charge", "Tax"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex justify-between items-center"
                    >
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  )
                )}
              </div>
              <Separator />
              <div className="flex justify-between items-center pt-2">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Details Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              </CardTitle>
              <Separator />
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer Avatar */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-3">
                <div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-28 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 w-14 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-40 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
