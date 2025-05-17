import { useState } from "react";
import { useLocation } from "wouter";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

interface AuthProps {
  defaultMode?: "login" | "register";
}

export default function Auth({ defaultMode = "login" }: AuthProps) {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<"login" | "register">(defaultMode);

  const handleSuccess = () => {
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {mode === "login" ? (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToRegister={() => setMode("register")}
          />
        ) : (
          <RegisterForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setMode("login")}
          />
        )}
      </div>
    </div>
  );
}
