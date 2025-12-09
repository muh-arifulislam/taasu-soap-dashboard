"use client";

import { useState } from "react";
import { Crown, Database, Key, Shield, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useGetMeQuery } from "@/redux/features/users/userApi";
import ProfileForm from "@/components/form/ProfileForm";
import PasswordChangeForm from "@/components/form/PasswordChangeForm";

const userRoles = {
  customer: "Customer",
  moderator: "Moderator",
  admin: "Admin",
  superAdmin: "Super Admin",
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading } = useGetMeQuery(undefined);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-full sm:max-w-6xl animate-pulse">
        {/* Profile Header Skeleton */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8">
          <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-muted" />
          <div className="flex-1 w-full">
            <div className="flex flex-row items-center gap-2 sm:gap-3 mb-2">
              <div className="h-6 sm:h-8 w-32 sm:w-48 bg-muted rounded" />
              <div className="h-6 w-6 bg-yellow-200 rounded-full" />
            </div>
            <div className="h-4 w-40 bg-muted rounded mb-2" />
            <div className="flex gap-2 mt-2">
              <div className="h-6 w-20 bg-muted rounded" />
              <div className="h-6 w-16 bg-muted rounded" />
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <div className="h-10 w-32 bg-muted rounded" />
          </div>
        </div>
        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
          {/* Card Skeleton */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow p-6 space-y-4">
              <div className="h-6 w-40 bg-muted rounded mb-2" />
              <div className="h-4 w-64 bg-muted rounded mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="h-10 bg-muted rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted rounded" />
                <div className="h-10 bg-muted rounded" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-10 bg-muted rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-10 bg-muted rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-10 bg-muted rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-10 bg-muted rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="h-10 w-32 bg-muted rounded" />
                <div className="h-10 w-32 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-full sm:max-w-6xl">
      {/* Admin Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8">
        <Avatar className="h-16 w-16 sm:h-24 sm:w-24">
          <AvatarImage
            src="/placeholder.svg?height=96&width=96"
            alt="Admin Profile"
          />
          <AvatarFallback className="text-lg bg-primary text-primary-foreground">
            SA
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 w-full">
          <div className="flex flex-row items-center gap-2 sm:gap-3 mb-2">
            <h1 className="text-lg sm:text-3xl font-bold">
              {data?.data?.firstName} {data?.data?.lastName}
            </h1>
            <Crown className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-muted-foreground break-all">{data?.data?.email}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="destructive">
              {
                userRoles[
                  data?.data?.role as
                    | "moderator"
                    | "customer"
                    | "admin"
                    | "superAdmin"
                ]
              }
            </Badge>
            <Badge variant="outline">Active</Badge>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => setIsEditing(!isEditing)}
            className="w-full sm:w-auto"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full h-full">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">Permissions</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Information</CardTitle>
              <CardDescription>
                Your administrative profile and contact details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProfileForm
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                data={data?.data}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Security Settings</CardTitle>
              <CardDescription>
                Enhanced security settings for administrative access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <PasswordChangeForm data={data?.data ?? {}} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Multi-Factor Authentication</CardTitle>
              <CardDescription>
                Required for all administrative accounts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-sm text-muted-foreground">
                    Currently active - Google Authenticator
                  </p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <Separator />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="font-medium">Backup Codes</p>
                  <p className="text-sm text-muted-foreground">
                    8 unused backup codes remaining
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  View Codes
                </Button>
              </div>
              <Separator />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="font-medium">Hardware Key</p>
                  <p className="text-sm text-muted-foreground">
                    YubiKey registered
                  </p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg gap-2">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground">
                      Chrome on Windows - 192.168.1.100
                    </p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg gap-2">
                  <div>
                    <p className="font-medium">Mobile Session</p>
                    <p className="text-sm text-muted-foreground">
                      Safari on iPhone - Last active 2 hours ago
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    Revoke
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  Revoke All Other Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Permissions</CardTitle>
              <CardDescription>
                Your current administrative access levels and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">User Management</h4>
                    <div className="space-y-3 pl-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Create Users</span>
                        <Badge variant="secondary">Granted</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Delete Users</span>
                        <Badge variant="secondary">Granted</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Modify Permissions</span>
                        <Badge variant="secondary">Granted</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">System Access</h4>
                    <div className="space-y-3 pl-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database Access</span>
                        <Badge variant="secondary">Granted</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">System Configuration</span>
                        <Badge variant="secondary">Granted</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Server Management</span>
                        <Badge variant="destructive">Restricted</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Content Management</h4>
                    <div className="space-y-3 pl-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Product Management</span>
                        <Badge variant="secondary">Granted</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Order Management</span>
                        <Badge variant="secondary">Granted</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Content Publishing</span>
                        <Badge variant="secondary">Granted</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Financial Access</h4>
                    <div className="space-y-3 pl-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">View Reports</span>
                        <Badge variant="secondary">Granted</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Payment Processing</span>
                        <Badge variant="destructive">Restricted</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Financial Reports</span>
                        <Badge variant="secondary">Granted</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>
                Configure your administrative interface preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Use dark theme for admin interface
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="font-medium">Advanced Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Show advanced configuration options
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="font-medium">Auto-save Changes</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically save configuration changes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Platform Version</Label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">
                    v2.4.1
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Database Version</Label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">
                    PostgreSQL 15.2
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Last Backup</Label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">
                    2024-01-15 03:00 UTC
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Server Uptime</Label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">
                    47 days, 12 hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
