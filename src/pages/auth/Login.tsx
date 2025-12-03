// Login.tsx - UPDATED
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login, clearError } from "../../store/slices/authSlice";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="));

    if (token) {
      console.log("Already logged in, redirecting...");
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const result = await dispatch(login({ email, password })).unwrap();
      
      if (result?.token) {
        toast.success("Login successful!");
        navigate("/dashboard", { replace: true });
      } else {
        toast.error("Login failed: No token received");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Debug button - remove in production */}
            {import.meta.env.DEV && (
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setEmail("admin@example.com");
                    setPassword("admin123");
                  }}
                >
                  Use Test Credentials
                </Button>
                
             
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;