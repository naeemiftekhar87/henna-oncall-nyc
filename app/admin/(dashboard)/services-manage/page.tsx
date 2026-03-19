"use client";

import {
  Check,
  CheckCircle,
  Clock,
  Loader2,
  Pencil,
  Settings2,
  Shirt,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Service = {
  id: string;
  key: string;
  name: string;
  price: number;
  duration: string;
  category: string;
  description: string | null;
  tagline: string | null;
  coverage: string | null;
  includes: string | null;
  guide: string | null;
  imageUrl: string | null;
  active: boolean;
  sortOrder: number;
};

const CATEGORY_STYLES: Record<string, string> = {
  bridal: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  feet: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  party: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const inputClass =
  "w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50";
const labelClass =
  "text-[#A0A0A0] text-xs uppercase tracking-wider block mb-1.5";

function parseJsonArray(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    duration: "",
    category: "",
    description: "",
    tagline: "",
    coverage: "",
    includes: "",
    guide: "",
    imageUrl: "",
    sortOrder: "",
    key: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let ignore = false;
    async function fetchServices() {
      const res = await fetch("/api/admin/services");
      if (ignore) return;
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (ignore) return;
      setServices(data.services);
      setLoading(false);
    }
    fetchServices();
    return () => {
      ignore = true;
    };
  }, []);

  const uploadToImageKit = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const authRes = await fetch("/api/admin/imagekit-auth");
      if (!authRes.ok) throw new Error("Auth failed");
      const authParams = await authRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", `service-${Date.now()}`);
      formData.append("folder", "/henna-oncall/services/");
      formData.append(
        "publicKey",
        process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
      );
      formData.append("signature", authParams.signature);
      formData.append("expire", authParams.expire.toString());
      formData.append("token", authParams.token);

      const uploadRes = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        { method: "POST", body: formData },
      );

      if (!uploadRes.ok) throw new Error("Upload failed");
      const uploadData = await uploadRes.json();
      setEditForm((prev) => ({ ...prev, imageUrl: uploadData.url }));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Check ImageKit configuration.");
    } finally {
      setUploading(false);
    }
  }, []);

  const startEditing = (service: Service) => {
    setEditingId(service.id);
    setEditForm({
      name: service.name,
      price: service.price.toString(),
      duration: service.duration,
      category: service.category,
      description: service.description || "",
      tagline: service.tagline || "",
      coverage: service.coverage || "",
      includes: parseJsonArray(service.includes).join("\n"),
      guide: parseJsonArray(service.guide).join("\n"),
      imageUrl: service.imageUrl || "",
      sortOrder: service.sortOrder.toString(),
      key: service.key,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: string) => {
    setSaving(true);
    const includesArr = editForm.includes
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const guideArr = editForm.guide
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const res = await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name: editForm.name,
        price: editForm.price,
        duration: editForm.duration,
        category: editForm.category,
        description: editForm.description,
        tagline: editForm.tagline,
        coverage: editForm.coverage,
        includes: JSON.stringify(includesArr),
        guide: JSON.stringify(guideArr),
        imageUrl: editForm.imageUrl,
        sortOrder: editForm.sortOrder,
        key: editForm.key,
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
          Manage service names, pricing, images, and details
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service) => {
          const isEditing = editingId === service.id;
          const includesList = parseJsonArray(service.includes);
          const guideList = parseJsonArray(service.guide);

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
                  {/* Row 1: Core fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Price ($)</label>
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm({ ...editForm, price: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Duration</label>
                      <input
                        type="text"
                        value={editForm.duration}
                        onChange={(e) =>
                          setEditForm({ ...editForm, duration: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Category</label>
                      <select
                        value={editForm.category}
                        onChange={(e) =>
                          setEditForm({ ...editForm, category: e.target.value })
                        }
                        className={inputClass}
                      >
                        <option value="bridal">Bridal</option>
                        <option value="feet">Feet</option>
                        <option value="party">Party</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Sort Order</label>
                      <input
                        type="number"
                        value={editForm.sortOrder}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            sortOrder: e.target.value,
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Key</label>
                      <input
                        type="text"
                        value={editForm.key}
                        onChange={(e) =>
                          setEditForm({ ...editForm, key: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Tagline */}
                  <div>
                    <label className={labelClass}>Tagline</label>
                    <input
                      type="text"
                      value={editForm.tagline}
                      onChange={(e) =>
                        setEditForm({ ...editForm, tagline: e.target.value })
                      }
                      placeholder={
                        editForm.category === "feet"
                          ? "Minimal • Delicate"
                          : "Minimal • Serene • Elegant"
                      }
                      className={inputClass}
                    />
                  </div>

                  {/* Coverage — feet only */}
                  {editForm.category === "feet" && (
                    <div>
                      <label className={labelClass}>Coverage</label>
                      <input
                        type="text"
                        value={editForm.coverage}
                        onChange={(e) =>
                          setEditForm({ ...editForm, coverage: e.target.value })
                        }
                        placeholder="Ankle-length"
                        className={inputClass}
                      />
                    </div>
                  )}

                  {/* Image upload */}
                  <div>
                    <label className={labelClass}>Image</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadToImageKit(file);
                      }}
                    />
                    <div className="flex items-center gap-3">
                      {editForm.imageUrl ? (
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0">
                          <Image
                            src={editForm.imageUrl}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-[#A0A0A0] hover:text-white hover:border-white/20 transition-colors disabled:opacity-50"
                      >
                        {uploading ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Upload size={14} />
                        )}
                        {uploading
                          ? "Uploading..."
                          : editForm.imageUrl
                            ? "Change Image"
                            : "Upload Image"}
                      </button>
                      {editForm.imageUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            setEditForm({ ...editForm, imageUrl: "" })
                          }
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      placeholder="Service description..."
                      className={inputClass + " resize-none"}
                    />
                  </div>

                  {/* Includes & Guide — bridal: both; party: includes only; feet: neither */}
                  {editForm.category !== "feet" && (
                    <div
                      className={`grid grid-cols-1 ${editForm.category === "bridal" ? "sm:grid-cols-2" : ""} gap-4`}
                    >
                      <div>
                        <label className={labelClass}>
                          What&apos;s Included (one per line)
                        </label>
                        <textarea
                          value={editForm.includes}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              includes: e.target.value,
                            })
                          }
                          rows={4}
                          placeholder={
                            editForm.category === "party"
                              ? "Mobile henna setup for 5–50 guests\nCustomizable designs for each guest\n100% organic hand-mixed henna"
                              : "Wrist-length design\n100% organic henna\nBridal prep guide"
                          }
                          className={inputClass + " resize-none"}
                        />
                      </div>
                      {editForm.category === "bridal" && (
                        <div>
                          <label className={labelClass}>
                            Guide / Recommended For (one per line)
                          </label>
                          <textarea
                            value={editForm.guide}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                guide: e.target.value,
                              })
                            }
                            rows={4}
                            placeholder={
                              "Full-sleeve outfits\nModest gowns\nAbayas & Traditional attire"
                            }
                            className={inputClass + " resize-none"}
                          />
                        </div>
                      )}
                    </div>
                  )}

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
                <div>
                  {/* Top row: icon/image + name + actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {service.imageUrl ? (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={service.imageUrl}
                            alt={service.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="bg-[#D4AF37]/10 p-2.5 rounded-lg shrink-0">
                          <Settings2 size={18} className="text-[#D4AF37]" />
                        </div>
                      )}
                      <div className="min-w-0">
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
                          <span className="text-[#555]">
                            #{service.sortOrder}
                          </span>
                        </div>
                        {service.tagline && (
                          <p className="text-[#D4AF37]/60 text-xs mt-0.5 uppercase tracking-wider">
                            {service.tagline}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() =>
                          toggleActive(service.id, !service.active)
                        }
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

                  {/* Description */}
                  {service.description && (
                    <p className="text-[#A0A0A0] text-xs mt-3 leading-relaxed">
                      {service.description}
                    </p>
                  )}

                  {/* Feet category: Coverage + Duration */}
                  {service.category === "feet" && service.coverage && (
                    <div className="flex items-center gap-4 text-xs mt-3 pt-3 border-t border-white/5">
                      <span className="text-[#A0A0A0]">
                        <span className="text-white">Coverage:</span>{" "}
                        {service.coverage}
                      </span>
                      <span className="text-[#A0A0A0]">
                        <span className="text-white">Duration:</span>{" "}
                        {service.duration}
                      </span>
                    </div>
                  )}

                  {/* Bridal: Includes & Guide */}
                  {service.category === "bridal" &&
                    (includesList.length > 0 || guideList.length > 0) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 pt-4 border-t border-white/5">
                        {includesList.length > 0 && (
                          <div>
                            <h4 className="text-white text-xs uppercase tracking-wider mb-2">
                              What&apos;s Included
                            </h4>
                            <ul className="space-y-1.5">
                              {includesList.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-[#A0A0A0] text-xs"
                                >
                                  <CheckCircle className="text-[#D4AF37] mt-0.5 shrink-0 w-3.5 h-3.5" />
                                  {item}
                                </li>
                              ))}
                              <li className="flex items-start gap-2 text-[#A0A0A0] text-xs">
                                <Clock className="text-[#D4AF37] mt-0.5 shrink-0 w-3.5 h-3.5" />
                                Session Duration: {service.duration}
                              </li>
                            </ul>
                          </div>
                        )}
                        {guideList.length > 0 && (
                          <div>
                            <h4 className="text-white text-xs uppercase tracking-wider mb-2">
                              Guide: Perfect For Brides Wearing
                            </h4>
                            <ul className="space-y-1.5">
                              {guideList.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-[#A0A0A0] text-xs"
                                >
                                  <Shirt className="text-[#D4AF37] mt-0.5 shrink-0 w-3.5 h-3.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                  {/* Party: Includes only */}
                  {service.category === "party" && includesList.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <h4 className="text-white text-xs uppercase tracking-wider mb-2">
                        What&apos;s Included
                      </h4>
                      <ul className="space-y-1.5">
                        {includesList.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-[#A0A0A0] text-xs"
                          >
                            <CheckCircle className="text-[#D4AF37] mt-0.5 shrink-0 w-3.5 h-3.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
