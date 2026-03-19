"use client";

import { Check, ImageIcon, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ImageSlot = {
  key: string;
  label: string;
  group: string;
};

const IMAGE_SLOTS: ImageSlot[] = [
  { key: "logo", label: "Website Logo", group: "Brand" },
  { key: "hero_image", label: "Hero Banner", group: "Brand" },
  { key: "service_blush_image", label: "Blush", group: "Bridal Services" },
  { key: "service_bloom_image", label: "Bloom", group: "Bridal Services" },
  { key: "service_lush_image", label: "Lush", group: "Bridal Services" },
  { key: "service_grace_image", label: "Grace", group: "Bridal Services" },
  {
    key: "service_petal_feet_image",
    label: "Petal Feet",
    group: "Feet Services",
  },
  {
    key: "service_blooming_feet_image",
    label: "Blooming Feet",
    group: "Feet Services",
  },
  {
    key: "service_regal_steps_image",
    label: "Regal Steps",
    group: "Feet Services",
  },
  { key: "gallery_1", label: "Gallery 1", group: "Gallery" },
  { key: "gallery_2", label: "Gallery 2", group: "Gallery" },
  { key: "gallery_3", label: "Gallery 3", group: "Gallery" },
  { key: "gallery_4", label: "Gallery 4", group: "Gallery" },
  { key: "gallery_5", label: "Gallery 5", group: "Gallery" },
  { key: "gallery_6", label: "Gallery 6", group: "Gallery" },
  { key: "gallery_7", label: "Gallery 7", group: "Gallery" },
  { key: "gallery_8", label: "Gallery 8", group: "Gallery" },
  { key: "gallery_9", label: "Gallery 9", group: "Gallery" },
  { key: "gallery_10", label: "Gallery 10", group: "Gallery" },
  { key: "gallery_11", label: "Gallery 11", group: "Gallery" },
  { key: "gallery_12", label: "Gallery 12", group: "Gallery" },
  { key: "party_1", label: "Party 1", group: "Party Henna" },
  { key: "party_2", label: "Party 2", group: "Party Henna" },
  { key: "party_3", label: "Party 3", group: "Party Henna" },
  { key: "party_4", label: "Party 4", group: "Party Henna" },
];

const GROUPS = [
  "Brand",
  "Bridal Services",
  "Feet Services",
  "Gallery",
  "Party Henna",
];

export default function ContentManagementPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    const res = await fetch("/api/admin/site-config");
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    setConfig(data.config || {});
    setLoading(false);
  };

  const uploadToImageKit = useCallback(async (file: File, key: string) => {
    setUploading(key);
    try {
      // Get auth params from our endpoint
      const authRes = await fetch("/api/admin/imagekit-auth");
      if (!authRes.ok) throw new Error("Auth failed");
      const authParams = await authRes.json();

      // Upload to ImageKit
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", `${key}-${Date.now()}`);
      formData.append("folder", "/henna-oncall/");
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
      const imageUrl = uploadData.url;

      // Save URL to site config
      const saveRes = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: imageUrl }),
      });

      if (!saveRes.ok) throw new Error("Save failed");

      setConfig((prev) => ({ ...prev, [key]: imageUrl }));
      setSaved(key);
      setTimeout(() => setSaved(null), 2000);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Check ImageKit configuration.");
    } finally {
      setUploading(null);
    }
  }, []);

  const removeImage = async (key: string) => {
    const res = await fetch("/api/admin/site-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: "" }),
    });
    if (res.ok) {
      setConfig((prev) => ({ ...prev, [key]: "" }));
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
        <h1 className="font-playfair text-3xl text-white mb-2">
          Content Management
        </h1>
        <p className="text-[#A0A0A0] text-sm">
          Upload and manage website images. Changes appear on the live site
          after upload.
        </p>
        <p className="text-[#666] text-xs mt-1">
          Images are hosted on ImageKit CDN for fast global delivery.
        </p>
      </div>

      {GROUPS.map((group) => {
        const slots = IMAGE_SLOTS.filter((s) => s.group === group);
        return (
          <div key={group} className="mb-10">
            <h2 className="text-white text-lg font-medium mb-1">{group}</h2>
            <p className="text-[#666] text-xs mb-4">
              {group === "Brand" && "Logo and hero banner images"}
              {group === "Bridal Services" &&
                "Service card images for bridal packages"}
              {group === "Feet Services" &&
                "Service card images for feet packages"}
              {group === "Gallery" && "Gallery grid images"}
              {group === "Party Henna" && "Party henna section showcase images"}
            </p>
            <div
              className={`grid gap-4 ${
                group === "Gallery"
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {slots.map((slot) => (
                <ImageSlotCard
                  key={slot.key}
                  slot={slot}
                  imageUrl={config[slot.key] || ""}
                  isUploading={uploading === slot.key}
                  isSaved={saved === slot.key}
                  onUpload={uploadToImageKit}
                  onRemove={removeImage}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ImageSlotCard({
  slot,
  imageUrl,
  isUploading,
  isSaved,
  onUpload,
  onRemove,
}: {
  slot: ImageSlot;
  imageUrl: string;
  isUploading: boolean;
  isSaved: boolean;
  onUpload: (file: File, key: string) => void;
  onRemove: (key: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file, slot.key);
      e.target.value = "";
    }
  };

  return (
    <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
      <div className="aspect-video relative bg-[#0A0A0A] flex items-center justify-center">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={slot.label}
              fill
              className="object-cover"
              unoptimized
            />
            <button
              onClick={() => onRemove(slot.key)}
              className="absolute top-2 right-2 bg-black/60 hover:bg-red-500/80 text-white p-1.5 rounded-lg transition-colors z-10"
              title="Remove image"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="text-center">
            <ImageIcon size={24} className="text-[#333] mx-auto mb-1" />
            <p className="text-[#444] text-[10px]">No image</p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
            <Loader2 size={24} className="text-[#D4AF37] animate-spin" />
          </div>
        )}

        {isSaved && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center z-20">
            <Check size={24} className="text-green-400" />
          </div>
        )}
      </div>

      <div className="p-3 flex items-center justify-between">
        <div>
          <p className="text-white text-sm">{slot.label}</p>
          <p className="text-[#555] text-[10px]">{slot.key}</p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-lg text-xs hover:bg-[#D4AF37]/20 transition-colors disabled:opacity-50"
          >
            <Upload size={12} />
            {imageUrl ? "Replace" : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
