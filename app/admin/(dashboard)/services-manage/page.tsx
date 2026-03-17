"use client";

import { Check, Pencil, Settings2, X } from "lucide-react";
import { useEffect, useState } from "react";

type Service = {
  id: string;
  key: string;
  name: string;
  price: number;
  duration: string;
  category: string;
  active: boolean;
  sortOrder: number;
};

const CATEGORY_STYLES: Record<string, string> = {
  bridal: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  feet: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  party: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    duration: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch("/api/admin/services");
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    setServices(data.services);
    setLoading(false);
  };

  const startEditing = (service: Service) => {
    setEditingId(service.id);
    setEditForm({
      name: service.name,
      price: service.price.toString(),
      duration: service.duration,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: string) => {
    setSaving(true);
    const res = await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name: editForm.name,
        price: editForm.price,
        duration: editForm.duration,
      }),
    });
    const data = await res.json();
    if (data.service) {
      setServices((prev) => prev.map((s) => (s.id === id ? data.service : s)));
    }
    setEditingId(null);
    setSaving(false);
  };

  const toggleActive = async (id: string, active: boolean) => {
    const res = await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active }),
    });
    const data = await res.json();
    if (data.service) {
      setServices((prev) => prev.map((s) => (s.id === id ? data.service : s)));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-white mb-2">Services</h1>
        <p className="text-[#A0A0A0] text-sm">
          Manage service names, pricing, and availability
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service) => {
          const isEditing = editingId === service.id;

          return (
            <div
              key={service.id}
              className={`bg-[#111111] border rounded-xl p-5 transition-colors ${
                service.active
                  ? "border-white/5"
                  : "border-red-500/10 opacity-60"
              }`}
            >
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[#A0A0A0] text-xs uppercase tracking-wider block mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                      />
                    </div>
                    <div>
                      <label className="text-[#A0A0A0] text-xs uppercase tracking-wider block mb-1.5">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm({ ...editForm, price: e.target.value })
                        }
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                      />
                    </div>
                    <div>
                      <label className="text-[#A0A0A0] text-xs uppercase tracking-wider block mb-1.5">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={editForm.duration}
                        onChange={(e) =>
                          setEditForm({ ...editForm, duration: e.target.value })
                        }
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(service.id)}
                      disabled={saving}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-lg text-sm hover:bg-[#D4AF37]/20 transition-colors disabled:opacity-50"
                    >
                      <Check size={14} />
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[#A0A0A0] hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors"
                    >
                      <X size={14} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#D4AF37]/10 p-2.5 rounded-lg">
                      <Settings2 size={18} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-sm">
                          {service.name}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border capitalize ${
                            CATEGORY_STYLES[service.category] || "text-[#666]"
                          }`}
                        >
                          {service.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[#666] text-xs mt-0.5">
                        <span className="text-[#D4AF37] font-medium">
                          ${service.price}
                        </span>
                        <span>{service.duration}</span>
                        <span className="text-[#555]">{service.key}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActive(service.id, !service.active)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        service.active
                          ? "text-green-400 border-green-500/20 hover:bg-green-500/10"
                          : "text-red-400 border-red-500/20 hover:bg-red-500/10"
                      }`}
                    >
                      {service.active ? "Active" : "Inactive"}
                    </button>
                    <button
                      onClick={() => startEditing(service)}
                      className="p-2 rounded-lg text-[#A0A0A0] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
