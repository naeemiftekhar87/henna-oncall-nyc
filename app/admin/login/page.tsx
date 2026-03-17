"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Login failed");
      }

      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-playfair text-3xl text-white mb-2">
            Admin Portal
          </h1>
          <p className="text-[#A0A0A0] text-sm">Henna On Call NYC Dashboard</p>
        </div>

        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="text-sm text-[#A0A0A0] block mb-2">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="admin@hennaoncall.com"
              />
              {errors.email && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-sm text-[#A0A0A0] block mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="••••••••"
              />
              {errors.password && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-black font-medium py-3 rounded-lg hover:bg-[#E6C76B] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
