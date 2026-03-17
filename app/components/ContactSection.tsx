"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  service: string;
  package: string;
  message: string;
};

const PACKAGES: Record<string, { label: string; price: number }[]> = {
  bridal: [
    { label: "Blush - $195", price: 195 },
    { label: "Bloom - $295", price: 295 },
    { label: "Lush - $395", price: 395 },
    { label: "Grace - $495", price: 495 },
  ],
  feet: [
    { label: "Petal Feet - $120", price: 120 },
    { label: "Blooming Feet - $180", price: 180 },
    { label: "Regal Steps - $250", price: 250 },
  ],
  party: [{ label: "Party Henna Experience", price: 0 }],
};

const PACKAGE_VALUES: Record<string, string[]> = {
  bridal: ["blush", "bloom", "lush", "grace"],
  feet: ["petal-feet", "blooming-feet", "regal-steps"],
  party: ["party"],
};

export default function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      service: "",
      package: "",
    },
  });

  const selectedService = watch("service");

  const onSubmit = async (data: BookingFormData) => {
    setSubmitStatus("loading");

    const servicePackages = PACKAGES[data.service];
    const packageIndex = PACKAGE_VALUES[data.service]?.indexOf(data.package);
    const price =
      packageIndex !== undefined && packageIndex >= 0
        ? servicePackages[packageIndex].price
        : 0;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, price }),
      });

      if (!res.ok) throw new Error("Booking failed");

      setSubmitStatus("success");
      reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/10 text-base text-white py-3 focus:outline-none focus:border-[#D4AF37] transition-colors peer placeholder-transparent";
  const labelClass =
    "absolute left-0 -top-3.5 text-sm text-[#A0A0A0] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#666] peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#D4AF37] cursor-text";

  return (
    <section
      id="contact"
      className="py-32 px-6 bg-[#050505] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Contact Form */}
        <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-black/40">
          <span className="text-[#D4AF37] text-sm uppercase tracking-[0.2em] mb-4 block font-light">
            Book Now
          </span>
          <h2 className="font-playfair text-4xl tracking-tight font-normal text-[#FFFFFF] mb-10">
            Book Your Henna Session
          </h2>

          {submitStatus === "success" && (
            <div className="mb-8 p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm">
              Your booking has been submitted successfully! We&apos;ll be in
              touch soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              Something went wrong. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative group">
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={inputClass}
                  placeholder="Name"
                />
                <label className={labelClass}>Full Name</label>
                {errors.name && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="relative group">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                  className={inputClass}
                  placeholder="Email"
                />
                <label className={labelClass}>Email Address</label>
                {errors.email && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            {/* Phone and Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative group">
                <input
                  type="tel"
                  {...register("phone", { required: "Phone is required" })}
                  className={inputClass}
                  placeholder="Phone"
                />
                <label className={labelClass}>Phone Number</label>
                {errors.phone && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div className="relative group">
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className="w-full bg-transparent border-b border-white/10 text-base text-white py-3 focus:outline-none focus:border-[#D4AF37] transition-colors peer"
                />
                <label className="absolute left-0 -top-3.5 text-sm text-[#D4AF37]">
                  Event Date
                </label>
                {errors.date && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.date.message}
                  </span>
                )}
              </div>
            </div>

            {/* Street Address */}
            <div className="relative group">
              <input
                type="text"
                {...register("street", { required: "Street is required" })}
                className={inputClass}
                placeholder="Street Address"
              />
              <label className={labelClass}>Street Address</label>
              {errors.street && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.street.message}
                </span>
              )}
            </div>

            {/* Apt and City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative group">
                <input
                  type="text"
                  {...register("apt")}
                  className={inputClass}
                  placeholder="Apt, Suite, etc. (Optional)"
                />
                <label className={labelClass}>Apt / Suite (Optional)</label>
              </div>
              <div className="relative group">
                <input
                  type="text"
                  {...register("city", { required: "City is required" })}
                  className={inputClass}
                  placeholder="City"
                />
                <label className={labelClass}>City</label>
                {errors.city && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.city.message}
                  </span>
                )}
              </div>
            </div>

            {/* State and Zip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative group">
                <input
                  type="text"
                  {...register("state", { required: "State is required" })}
                  className={inputClass}
                  placeholder="State"
                />
                <label className={labelClass}>State</label>
                {errors.state && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.state.message}
                  </span>
                )}
              </div>
              <div className="relative group">
                <input
                  type="text"
                  {...register("zip", { required: "Zip code is required" })}
                  className={inputClass}
                  placeholder="Zip Code"
                />
                <label className={labelClass}>Zip Code</label>
                {errors.zip && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.zip.message}
                  </span>
                )}
              </div>
            </div>

            {/* Service Selection */}
            <div className="relative group">
              <select
                {...register("service", {
                  required: "Please select a service",
                })}
                className="w-full bg-transparent border-b border-white/10 text-base text-white py-3 focus:outline-none focus:border-[#D4AF37] transition-colors peer"
              >
                <option value="">Select Service</option>
                <option value="bridal">Bridal Henna</option>
                <option value="feet">Feet Henna</option>
                <option value="party">Party Henna</option>
              </select>
              <label className="absolute left-0 -top-3.5 text-sm text-[#D4AF37]">
                Service Type
              </label>
              {errors.service && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.service.message}
                </span>
              )}
            </div>

            {/* Package Selection (conditional) */}
            {selectedService && PACKAGES[selectedService] && (
              <div className="relative group">
                <select
                  {...register("package", {
                    required: "Please select a package",
                  })}
                  className="w-full bg-transparent border-b border-white/10 text-base text-white py-3 focus:outline-none focus:border-[#D4AF37] transition-colors peer"
                >
                  <option value="">Select Package</option>
                  {PACKAGES[selectedService].map((pkg, i) => (
                    <option
                      key={PACKAGE_VALUES[selectedService][i]}
                      value={PACKAGE_VALUES[selectedService][i]}
                    >
                      {pkg.label}
                    </option>
                  ))}
                </select>
                <label className="absolute left-0 -top-3.5 text-sm text-[#D4AF37]">
                  Package
                </label>
                {errors.package && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.package.message}
                  </span>
                )}
              </div>
            )}

            {/* Message */}
            <div className="relative group">
              <textarea
                {...register("message")}
                className="w-full bg-transparent border-b border-white/10 text-base text-white py-3 focus:outline-none focus:border-[#D4AF37] transition-colors peer placeholder-transparent resize-none h-20"
                placeholder="Tell us about your vision..."
              ></textarea>
              <label className={labelClass}>Your Vision</label>
            </div>

            <button
              type="submit"
              disabled={submitStatus === "loading"}
              className="w-full bg-[#D4AF37] text-black text-base font-medium py-4 rounded-xl hover:bg-[#E6C76B] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitStatus === "loading"
                ? "Submitting..."
                : "Book My Henna Session"}
            </button>
          </form>
        </div>

        {/* Booking Policies */}
        <div className="flex flex-col justify-center">
          <h3 className="font-playfair text-3xl tracking-tight text-[#FFFFFF] mb-8 border-b border-white/5 pb-6">
            Booking & Service Policies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            <div>
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                Booking
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                A 50% deposit reserves your wedding date. Final payment due 2
                weeks before appointment.
              </p>
            </div>
            <div>
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                Cancellation
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                Cancellations made 30 days before event receive full refund.
                After 30 days, deposit is non-refundable.
              </p>
            </div>
            <div>
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                Travel
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                Travel included within NY, NJ, CT, PA. Additional travel fees
                apply outside service areas.
              </p>
            </div>
            <div>
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                Material
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                100% organic, hand-mixed henna included. Premium add-ons
                available upon request.
              </p>
            </div>
            <div>
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                Duration
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                Session times vary by package. Full day availability for bridal
                appointments.
              </p>
            </div>
            <div>
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                Payment
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                Payment accepted via Venmo, PayPal, and Credit Card. Invoice
                sent upon booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
