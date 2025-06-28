import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";
import { useLoginWithEmailMutation } from "@/redux/features/auth/authApi";
import { verifyToken } from "@/utils";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Eye, EyeOff, LogIn, Shield, User } from "lucide-react";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginWithEmail, { isLoading }] = useLoginWithEmailMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Demo credentials
  const demoCredentials = {
    moderator: {
      email: "visitor@example.com",
      password: "visitor",
      role: "Moderator",
    },
    admin: {
      email: "admin@example.com",
      password: "admin",
      role: "Admin",
    },
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt:", { email, password });
      alert(`Login attempt with: ${email}`);
    }, 1000);
  };

  const handleDemoLogin = async (role: "moderator" | "admin") => {
    try {
      const credentials = demoCredentials[role];

      // Simulate API call
      const result = await loginWithEmail({
        email: credentials.email,
        password: credentials.password,
      });

      if (result?.data?.success) {
        const token = result?.data?.data?.accessToken;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = verifyToken(token);
        const user = {
          email: decoded.email,
          role: decoded.role,
          // add other required fields if TUser has more
        };

        dispatch(setUser({ user, token }));
        navigate("/dashboard");
      } else {
        throw new Error("Failed to login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <>
      <div
        className={cn([
          "min-h-screen flex items-center justify-center",
          className,
        ])}
        {...props}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or try demo accounts
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent cursor-pointer"
                onClick={() => handleDemoLogin("moderator")}
                disabled={isLoading}
              >
                <User className="h-4 w-4 mr-2" />
                Demo Moderator Login
                <Badge variant="secondary" className="ml-2">
                  Moderator
                </Badge>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent cursor-pointer"
                onClick={() => handleDemoLogin("admin")}
                disabled={isLoading}
              >
                <Shield className="h-4 w-4 mr-2" />
                Demo Admin Login
                <Badge variant="destructive" className="ml-2">
                  Admin
                </Badge>
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium">Demo Credentials:</p>
              <div className="space-y-1 pl-2">
                <p>
                  Staff: {demoCredentials.moderator.email} /{" "}
                  {demoCredentials.moderator.password}
                </p>
                <p>
                  Admin: {demoCredentials.admin.email} /{" "}
                  {demoCredentials.admin.email}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Button variant="link" className="p-0 h-auto font-normal">
                Sign up here
              </Button>
            </div>
            <Button variant="link" className="text-xs h-auto p-0">
              Forgot your password?
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
// <div className={cn("flex flex-col gap-6", className)} {...props}>
//   <Card>
//     <CardHeader>
//       <CardTitle>Login to your account</CardTitle>
//       <CardDescription>
//         Enter your email below to login to your account
//       </CardDescription>
//     </CardHeader>
//     <CardContent>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleEmailLogin(e);
//         }}
//       >
//         <div className="flex flex-col gap-6">
//           <div className="grid gap-3">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="m@example.com"
//               required
//             />
//           </div>
//           <div className="grid gap-3">
//             <div className="flex items-center">
//               <Label htmlFor="password">Password</Label>
//               <a
//                 href="#"
//                 className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//               >
//                 Forgot your password?
//               </a>
//             </div>
//             <Input id="password" type="password" required />
//           </div>
//           <div className="flex flex-col gap-3">
//             <Button type="submit" className="w-full">
//               Login
//             </Button>
//             <Button variant="outline" className="w-full">
//               Login with Google
//             </Button>
//           </div>
//         </div>
//         <div className="mt-4 text-center text-sm">
//           Don&apos;t have an account?{" "}
//           <a href="#" className="underline underline-offset-4">
//             Sign up
//           </a>
//         </div>
//       </form>
//     </CardContent>
//   </Card>
// </div>
