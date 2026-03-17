"use client";

import {
  Footprints,
  Gem,
  LayoutDashboard,
  LogOut,
  Menu,
  PartyPopper,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bridal", label: "Bridal Henna", icon: Gem },
  { href: "/admin/feet", label: "Feet Henna", icon: Footprints },
  { href: "/admin/party", label: "Party Henna", icon: PartyPopper },
];

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#111111] border-b border-white/5">
        <h1 className="font-playfair text-lg text-white">Henna On Call</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white p-2"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 border-b border-white/5">
            <h1 className="font-playfair text-xl text-white">Henna On Call</h1>
            <p className="text-[#A0A0A0] text-xs mt-1">Admin Dashboard</p>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                      : "text-[#A0A0A0] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#A0A0A0] hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
            >
              <LogOut size={18} />
              Sign Out
            </button>
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
