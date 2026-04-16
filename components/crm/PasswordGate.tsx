"use client";

import { useState, useRef, useEffect } from "react";
import { Shield, Loader2, AlertCircle, Lock } from "lucide-react";

interface PasswordGateProps {
  onAuthenticated: () => void;
}

const PasswordGate = ({ onAuthenticated }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      if (res.ok) {
        onAuthenticated();
        return;
      }

      if (res.status === 429) {
        setError("Too many attempts. Wait a moment.");
      } else {
        setError("Access denied");
      }

      // Trigger shake animation
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPassword("");
      inputRef.current?.focus();
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#060a13] flex items-center justify-center z-50">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm px-6">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center backdrop-blur-sm">
            <Shield size={28} className="text-primary-400/80" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-lg font-semibold text-slate-200 mb-1">
            Secure Access
          </h1>
          <p className="text-sm text-slate-500">
            Authentication required
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            className={`relative transition-transform ${
              shake ? "animate-[shake_0.5s_ease-in-out]" : ""
            }`}
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Lock size={16} className="text-slate-600" />
            </div>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter access key"
              autoComplete="off"
              spellCheck={false}
              disabled={loading}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-primary-500/40 focus:bg-white/[0.04] transition-all duration-200 disabled:opacity-50"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 mt-3 text-red-400/90 text-xs">
              <AlertCircle size={13} />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!password.trim() || loading}
            className="w-full mt-4 py-3 rounded-xl bg-primary-500/15 text-primary-300 text-sm font-medium border border-primary-500/20 hover:bg-primary-500/25 hover:border-primary-500/30 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Verifying...
              </>
            ) : (
              "Authenticate"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[10px] text-slate-700 mt-8 font-mono">
          Protected endpoint · Session-based auth
        </p>
      </div>

      {/* Shake keyframes */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
};

export default PasswordGate;
