"use client";

import { useEffect, useState } from "react";
import PasswordGate from "./PasswordGate";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/admin/me", {
        credentials: "same-origin",
      });

      if (res.ok) {
        setAuthState("authenticated");
      } else {
        setAuthState("unauthenticated");
      }
    } catch {
      setAuthState("unauthenticated");
    }
  };

  if (authState === "loading") {
    return (
      <div className="fixed inset-0 bg-[#060a13] flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary-400/30 border-t-primary-400 rounded-full animate-spin" />
          <p className="text-xs text-slate-600 font-mono">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (authState === "unauthenticated") {
    return <PasswordGate onAuthenticated={() => setAuthState("authenticated")} />;
  }

  return <>{children}</>;
};

export default AuthProvider;
