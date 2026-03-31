"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  partySize: string;
  numberOfHours: string;
  message: string;
};

const SERVICES = [
  { value: "blush", label: "Blush (Bridal) - $195", price: 195 },
  { value: "bloom", label: "Bloom (Bridal) - $295", price: 295 },
  { value: "lush", label: "Lush (Bridal) - $395", price: 395 },
  { value: "grace", label: "Grace (Bridal) - $495", price: 495 },
  { value: "petal-feet", label: "Petal Feet - $120", price: 120 },
  { value: "blooming-feet", label: "Blooming Feet - $180", price: 180 },
  { value: "regal-steps", label: "Regal Steps - $250", price: 250 },
  { value: "party", label: "Party Henna Experience", price: 0 },
];

export default function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      service: "",
      partySize: "",
      numberOfHours: "",
    },
  });

  const selectedService = watch("service");

  const onSubmit = async (data: BookingFormData) => {
    setSubmitStatus("loading");

    const selected = SERVICES.find((s) => s.value === data.service);
    const price = selected?.price ?? 0;
    const partySize =
      data.service === "party" && data.partySize
        ? parseInt(data.partySize)
        : null;
    const numberOfHours = data.numberOfHours
      ? parseInt(data.numberOfHours)
      : null;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, price, partySize, numberOfHours }),
      });

      if (!res.ok) throw new Error("Booking failed");

      setSubmitStatus("success");
      reset();
      toast.success("Booking submitted successfully!", {
        description: "We'll be in touch soon to confirm your appointment.",
      });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      toast.error("Something went wrong", {
        description: "Please try again or contact us directly.",
      });
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
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#050505] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Contact Form */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl shadow-black/40">
          <span className="text-[#D4AF37] text-sm uppercase tracking-[0.2em] mb-4 block font-light">
            Book Now
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl tracking-tight font-normal text-[#FFFFFF] mb-6 sm:mb-10">
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
                  min={today}
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
                <select
                  {...register("state", { required: "State is required" })}
                  className="w-full bg-transparent border-b border-white/10 text-base text-white py-3 focus:outline-none focus:border-[#D4AF37] transition-colors peer"
                >
                  <option value="">Select State</option>
                  {[
                    "AL",
                    "AK",
                    "AZ",
                    "AR",
                    "CA",
                    "CO",
                    "CT",
                    "DE",
                    "FL",
                    "GA",
                    "HI",
                    "ID",
                    "IL",
                    "IN",
                    "IA",
                    "KS",
                    "KY",
                    "LA",
                    "ME",
                    "MD",
                    "MA",
                    "MI",
                    "MN",
                    "MS",
                    "MO",
                    "MT",
                    "NE",
                    "NV",
                    "NH",
                    "NJ",
                    "NM",
                    "NY",
                    "NC",
                    "ND",
                    "OH",
                    "OK",
                    "OR",
                    "PA",
                    "RI",
                    "SC",
                    "SD",
                    "TN",
                    "TX",
                    "UT",
                    "VT",
                    "VA",
                    "WA",
                    "WV",
                    "WI",
                    "WY",
                    "DC",
                  ].map((st) => (
                    <option className="text-black" key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <label className="absolute left-0 -top-3.5 text-sm text-[#D4AF37]">
                  State
                </label>
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
                <option className="text-black" value="">
                  Select Service
                </option>
                {SERVICES.map((s) => (
                  <option className="text-black" key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <label className="absolute left-0 -top-3.5 text-sm text-[#D4AF37]">
                Service
              </label>
              {errors.service && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.service.message}
                </span>
              )}
            </div>

            {/* Number of Hours - shown for all services */}
            <div className="relative group">
              <input
                type="number"
                min="1"
                {...register("numberOfHours", {
                  min: { value: 1, message: "At least 1 hour required" },
                })}
                className={inputClass}
                placeholder="Number of Hours"
              />
              <label className={labelClass}>Number of Hours</label>
              {errors.numberOfHours && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.numberOfHours.message}
                </span>
              )}
            </div>

            {/* Quantity - only shown when Party Henna is selected */}
            {selectedService === "party" && (
              <div className="relative group">
                <input
                  type="number"
                  min="1"
                  {...register("partySize", {
                    required:
                      selectedService === "party"
                        ? "Quantity is required"
                        : false,
                    min: { value: 1, message: "At least 1 required" },
                  })}
                  className={inputClass}
                  placeholder="Number of Quantity"
                />
                <label className={labelClass}>Number of Quantity</label>
                {errors.partySize && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.partySize.message}
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
          <h3 className="font-['Playfair_Display'] text-3xl tracking-tight text-[#FFFFFF] mb-8 border-b border-white/5 pb-6">
            Booking &amp; Service Policies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            <div>
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                Booking Deposit
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                A 20% non-refundable deposit is required to secure your date.
                Remaining balance due on the day of the appointment.
              </p>
            </div>

            <div>
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                Travel Policy
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                Henna On Call NYC is a mobile service. Travel fees may apply
                depending on event location.
              </p>
            </div>

            <div>
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                Cancellation &amp; Rescheduling
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                Notice required 48 hours in advance. Deposits are non-refundable
                but may transfer to rescheduled bookings if notice is provided.
              </p>
            </div>

            <div>
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                Allergy Responsibility
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                Clients must confirm they have no henna allergies before
                appointment.
              </p>
            </div>

            <div>
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                Photography
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                Photos/videos may be taken for portfolio unless requested
                otherwise.
              </p>
            </div>

            <div>
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                Late Arrival Policy
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                Appointments start at scheduled time. Delays may reduce service
                time if other bookings follow.
              </p>
            </div>

            <div className="sm:col-span-2 border-t border-white/5 pt-8 mt-2">
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-3 font-medium">
                Event Setup Requirements
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light mb-2 leading-relaxed">
                Hosts should provide: Comfortable seating, Adequate lighting,
                Small table for materials.
              </p>
              <p className="text-xs text-[#A0A0A0] italic font-light">
                A calm environment helps ensure precise and beautiful designs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
