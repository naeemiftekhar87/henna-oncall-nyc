"use client";

import { Eye, EyeOff, Lock, Mail, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type ChangeEmailForm = {
  currentPassword: string;
  newEmail: string;
  confirmEmail: string;
};

export default function ChangeEmailPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangeEmailForm>();

  const newEmail = watch("newEmail");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.admin?.email) setCurrentEmail(data.admin.email);
      });
  }, [success]);

  const onSubmit = async (data: ChangeEmailForm) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/change-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newEmail: data.newEmail,
        }),
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.error || "Failed to change email");
      }

      setSuccess("Email changed successfully!");
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#D4AF37]/10 p-2.5 rounded-xl">
          <Mail className="text-[#D4AF37]" size={24} />
        </div>
        <div>
          <h1 className="font-playfair text-2xl text-white">Change Email</h1>
          <p className="text-[#A0A0A0] text-sm mt-0.5">
            Update your admin account email
          </p>
        </div>
      </div>

      <div className="max-w-lg">
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 shadow-2xl">
          {currentEmail && (
            <div className="mb-6 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-[#A0A0A0] text-xs uppercase tracking-wider mb-1">
                Current Email
              </p>
              <p className="text-white text-sm">{currentEmail}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="text-sm text-[#A0A0A0] block mb-2">
                Current Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("currentPassword", {
                    required: "Password is required to change email",
                  })}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.currentPassword && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-sm text-[#A0A0A0] block mb-2">
                New Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]"
                  size={16}
                />
                <input
                  type="email"
                  {...register("newEmail", {
                    required: "New email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Enter new email address"
                />
              </div>
              {errors.newEmail && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.newEmail.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-sm text-[#A0A0A0] block mb-2">
                Confirm New Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]"
                  size={16}
                />
                <input
                  type="email"
                  {...register("confirmEmail", {
                    required: "Please confirm your new email",
                    validate: (value) =>
                      value === newEmail || "Emails do not match",
                  })}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Confirm new email address"
                />
              </div>
              {errors.confirmEmail && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.confirmEmail.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-black font-medium py-3 rounded-lg hover:bg-[#E6C76B] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save size={16} />
              {loading ? "Changing Email..." : "Change Email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
