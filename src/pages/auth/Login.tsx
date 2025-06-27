import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement email/password login logic here
    setTimeout(() => setLoading(false), 1000);
  };

  //   const handleGoogleLogin = async () => {
  //     setLoading(true);
  //     // TODO: Implement Google login logic here
  //     setTimeout(() => setLoading(false), 1000);
  //   };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          {/* <Separator className="my-6" />
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={handleGoogleLogin}
            disabled={loading}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
              fill="none"
            >
              <g>
                <path
                  fill="#4285F4"
                  d="M43.6 20.5h-1.9V20H24v8h11.3c-1.5 4-5.3 7-9.3 7-5.5 0-10-4.5-10-10s4.5-10 10-10c2.4 0 4.6.8 6.3 2.2l6.1-6.1C34.1 8.1 29.3 6 24 6 13.5 6 5 14.5 5 25s8.5 19 19 19c9.5 0 18-7 18-19 0-1.3-.1-2.2-.4-3.5z"
                />
                <path
                  fill="#34A853"
                  d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c2.4 0 4.6.8 6.3 2.2l6.1-6.1C34.1 8.1 29.3 6 24 6c-7.2 0-13.4 4.1-16.7 10.7z"
                />
                <path
                  fill="#FBBC05"
                  d="M24 44c5.3 0 10.1-1.8 13.8-4.9l-6.4-5.2c-1.8 1.3-4.1 2.1-7.4 2.1-4 0-7.8-3-9.3-7l-6.6 5.1C10.6 40.8 16.8 44 24 44z"
                />
                <path
                  fill="#EA4335"
                  d="M43.6 20.5h-1.9V20H24v8h11.3c-0.7 2-2.1 3.7-4.1 5l6.4 5.2c-0.6 0.6 6.4-4.7 6.4-13.2 0-1.3-.1-2.2-.4-3.5z"
                />
              </g>
            </svg>
            {loading ? "Please wait..." : "Login with Google"}
          </Button> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
