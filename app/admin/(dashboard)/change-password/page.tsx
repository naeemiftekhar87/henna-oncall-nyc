"use client";

import { Eye, EyeOff, KeyRound, Lock, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: ChangePasswordForm) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.error || "Failed to change password");
      }

      setSuccess("Password changed successfully!");
      reset();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to change password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#D4AF37]/10 p-2.5 rounded-xl">
          <KeyRound className="text-[#D4AF37]" size={24} />
        </div>
        <div>
          <h1 className="font-playfair text-2xl text-white">Change Password</h1>
          <p className="text-[#A0A0A0] text-sm mt-0.5">
            Update your admin account password
          </p>
        </div>
      </div>

      <div className="max-w-lg">
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 shadow-2xl">
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
                  type={showCurrent ? "text" : "password"}
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors"
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
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
                New Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]"
                  size={16}
                />
                <input
                  type={showNew ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors"
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.newPassword && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-sm text-[#A0A0A0] block mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]"
                  size={16}
                />
                <input
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-black font-medium py-3 rounded-lg hover:bg-[#E6C76B] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save size={16} />
              {loading ? "Changing Password..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
