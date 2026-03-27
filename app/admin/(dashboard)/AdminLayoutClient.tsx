"use client";

import {
  BarChart3,
  Crown,
  Flower2,
  Footprints,
  Gem,
  Home,
  ImageIcon,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  PartyPopper,
  Settings2,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, key: "" },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
    key: "analytics",
  },
  {
    href: "/admin/services-manage",
    label: "Edit Services",
    icon: Settings2,
    key: "services-manage",
  },
  {
    href: "/admin/content",
    label: "Content & Images",
    icon: ImageIcon,
    key: "content",
  },
];

const serviceItems = [
  { href: "/admin/blush", label: "Blush", icon: Flower2, key: "blush" },
  { href: "/admin/bloom", label: "Bloom", icon: Sparkles, key: "bloom" },
  { href: "/admin/lush", label: "Lush", icon: Star, key: "lush" },
  { href: "/admin/grace", label: "Grace", icon: Crown, key: "grace" },
  {
    href: "/admin/petal-feet",
    label: "Petal Feet",
    icon: Footprints,
    key: "petal-feet",
  },
  {
    href: "/admin/blooming-feet",
    label: "Blooming Feet",
    icon: Footprints,
    key: "blooming-feet",
  },
  {
    href: "/admin/regal-steps",
    label: "Regal Steps",
    icon: Gem,
    key: "regal-steps",
  },
  {
    href: "/admin/party",
    label: "Party Henna",
    icon: PartyPopper,
    key: "party",
  },
];

export default function AdminLayoutClient({
  children,
  pendingCounts,
}: {
  children: React.ReactNode;
  pendingCounts: Record<string, number>;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const totalPending = Object.values(pendingCounts).reduce(
    (sum, n) => sum + n,
    0,
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#111111] border-b border-white/5">
        <h1 className="font-playfair text-lg text-white">Henna On Call</h1>
        <div className="flex items-center gap-2">
          {totalPending > 0 && (
            <span className="bg-yellow-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalPending}
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white p-2"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 flex flex-col ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 border-b border-white/5">
            <h1 className="font-playfair text-xl text-white">Henna On Call</h1>
            <p className="text-[#A0A0A0] text-xs mt-1">Admin Dashboard</p>
          </div>

          <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                      : "text-[#A0A0A0] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon size={18} />
                    {item.label}
                  </span>
                  {item.key === "" && totalPending > 0 && (
                    <span className="bg-yellow-500 text-black text-[10px] font-bold min-w-4.5 h-4.5 flex items-center justify-center rounded-full px-1">
                      {totalPending}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-4 pb-2">
              <p className="text-[#666] text-[10px] uppercase tracking-widest px-4">
                Services
              </p>
            </div>

            {serviceItems.map((item) => {
              const isActive = pathname === item.href;
              const pending = pendingCounts[item.key] || 0;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                      : "text-[#A0A0A0] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon size={16} />
                    {item.label}
                  </span>
                  {pending > 0 && (
                    <span className="bg-yellow-500 text-black text-[10px] font-bold min-w-4.5 h-4.5 flex items-center justify-center rounded-full px-1">
                      {pending}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5 space-y-1">
            <Link
              href="/admin/change-password"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all w-full ${
                pathname === "/admin/change-password"
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                  : "text-[#A0A0A0] hover:text-white hover:bg-white/5"
              }`}
            >
              <KeyRound size={18} />
              Change Password
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#A0A0A0] hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
            >
              <LogOut size={18} />
              Sign Out
            </button>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#A0A0A0] hover:text-white hover:bg-white/5 transition-all w-full"
            >
              <Home size={18} />
              Back to Home
            </Link>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-h-screen lg:min-h-screen">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
