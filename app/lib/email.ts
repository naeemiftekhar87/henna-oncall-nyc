import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const SERVICE_LABELS: Record<string, string> = {
  blush: "Blush",
  bloom: "Bloom",
  lush: "Lush",
  grace: "Grace",
  "petal-feet": "Petal Feet",
  "blooming-feet": "Blooming Feet",
  "regal-steps": "Regal Steps",
  party: "Party Henna",
};

type BookingData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  price: number;
  partySize?: number | null;
  numberOfHours?: number | null;
  quantities?: string | null;
  travelFee?: number | null;
  street: string;
  apt?: string | null;
  city: string;
  state: string;
  zip: string;
  message?: string | null;
};

function formatDuration(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const parts = [];
  if (h > 0) parts.push(`${h} hr${h > 1 ? "s" : ""}`);
  if (m > 0) parts.push(`${m} mins`);
  return parts.join(" ") || `${totalMinutes} mins`;
}

function formatServiceWithQty(booking: BookingData): string {
  const services = booking.service.split(",").map((s: string) => s.trim());
  const qty: Record<string, number> = booking.quantities
    ? JSON.parse(booking.quantities)
    : {};
  return services
    .map((s) => {
      const label = SERVICE_LABELS[s] || s;
      if (qty[s]) return `${label} (${qty[s]} qty)`;
      if (s !== "party" && booking.partySize && services.length === 1)
        return `${label} (${booking.partySize} qty)`;
      return label;
    })
    .join(", ");
}

export async function sendAdminNotification(booking: BookingData) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("SMTP not configured, skipping email notification");
    return;
  }

  const serviceName = formatServiceWithQty(booking);

  await transporter.sendMail({
    from: `"Henna On Call NYC" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: `New Booking: ${serviceName} - ${booking.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #fff; padding: 32px; border-radius: 16px;">
        <h1 style="color: #D4AF37; font-size: 24px; margin-bottom: 24px;">New Booking Received</h1>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #A0A0A0;">Client</td><td style="padding: 8px 0; color: #fff;">${booking.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #A0A0A0;">Email</td><td style="padding: 8px 0; color: #fff;">${booking.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #A0A0A0;">Phone</td><td style="padding: 8px 0; color: #fff;">${booking.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #A0A0A0;">Service</td><td style="padding: 8px 0; color: #D4AF37;">${serviceName}</td></tr>
          <tr><td style="padding: 8px 0; color: #A0A0A0;">Date</td><td style="padding: 8px 0; color: #fff;">${booking.date}</td></tr>
          <tr><td style="padding: 8px 0; color: #A0A0A0;">Price</td><td style="padding: 8px 0; color: #fff;">$${booking.price}</td></tr>
          ${booking.partySize ? `<tr><td style="padding: 8px 0; color: #A0A0A0;">Quantity</td><td style="padding: 8px 0; color: #D4AF37;">${booking.partySize}</td></tr>` : ""}
          ${booking.numberOfHours ? `<tr><td style="padding: 8px 0; color: #A0A0A0;">Duration</td><td style="padding: 8px 0; color: #D4AF37;">${formatDuration(booking.numberOfHours)}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #A0A0A0;">Address</td><td style="padding: 8px 0; color: #fff;">${booking.street}${booking.apt ? `, ${booking.apt}` : ""}<br>${booking.city}, ${booking.state} ${booking.zip}</td></tr>
          ${booking.message ? `<tr><td style="padding: 8px 0; color: #A0A0A0;">Message</td><td style="padding: 8px 0; color: #fff;">${booking.message}</td></tr>` : ""}
        </table>
        <p style="margin-top: 24px; color: #666; font-size: 12px;">View in dashboard: ${process.env.NEXT_PUBLIC_URL || "https://hennaoncallnyc.com"}/admin</p>
      </div>
    `,
  });
}

export async function sendCustomerConfirmation(booking: BookingData) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("SMTP not configured, skipping email notification");
    return;
  }

  const serviceName = formatServiceWithQty(booking);

  const location = `${booking.street}${booking.apt ? `, ${booking.apt}` : ""}, ${booking.city}, ${booking.state} ${booking.zip}`;

  await transporter.sendMail({
    from: `"Henna On Call NYC" <${process.env.SMTP_USER}>`,
    to: booking.email,
    subject: `Your Henna Inquiry ✨ | HennaOnCall NYC`,
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #fff; padding: 40px; border-radius: 16px; border: 1px solid rgba(212,175,55,0.15);">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #D4AF37; font-size: 22px; font-weight: 400; letter-spacing: 1px; margin: 0;">Henna On Call NYC</h1>
          <div style="width: 40px; height: 1px; background: #D4AF37; margin: 12px auto;"></div>
        </div>

        <p style="color: #E0E0E0; font-size: 15px; line-height: 1.7; margin-bottom: 8px;">Hello ${booking.name},</p>

        <p style="color: #A0A0A0; font-size: 14px; line-height: 1.7; margin-bottom: 24px;">Thank you for your inquiry with Henna On Call NYC. I truly appreciate the opportunity to be part of your special event.</p>

        <p style="color: #A0A0A0; font-size: 14px; margin-bottom: 16px;">Here is a summary of your request:</p>

        <div style="background: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.15); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #A0A0A0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Service</td>
              <td style="padding: 10px 0; color: #D4AF37; font-size: 15px; font-weight: 500;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A0A0A0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid rgba(255,255,255,0.05);">Event Date</td>
              <td style="padding: 10px 0; color: #fff; font-size: 15px; border-top: 1px solid rgba(255,255,255,0.05);">${booking.date}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A0A0A0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid rgba(255,255,255,0.05);">Location</td>
              <td style="padding: 10px 0; color: #fff; font-size: 15px; border-top: 1px solid rgba(255,255,255,0.05);">${location}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A0A0A0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid rgba(255,255,255,0.05);">Estimated Total</td>
              <td style="padding: 10px 0; color: #D4AF37; font-size: 17px; font-weight: 600; border-top: 1px solid rgba(255,255,255,0.05);">$${booking.price}</td>
            </tr>
            ${
              booking.travelFee && booking.travelFee > 0
                ? `
            <tr>
              <td style="padding: 10px 0; color: #A0A0A0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid rgba(255,255,255,0.05);">Travel Fee</td>
              <td style="padding: 10px 0; color: #D4AF37; font-size: 15px; font-weight: 500; border-top: 1px solid rgba(255,255,255,0.05);">$${booking.travelFee}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A0A0A0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid rgba(255,255,255,0.05);">Grand Total</td>
              <td style="padding: 10px 0; color: #D4AF37; font-size: 19px; font-weight: 700; border-top: 1px solid rgba(255,255,255,0.05);">$${booking.price + booking.travelFee}</td>
            </tr>`
                : ""
            }
          </table>
        </div>

        <p style="color: #A0A0A0; font-size: 14px; line-height: 1.7; margin-bottom: 20px;">Please let me know if the above details are correct or if you would like to make any adjustments.</p>

        <div style="background: rgba(212,175,55,0.08); border-left: 3px solid #D4AF37; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
          <p style="color: #E0E0E0; font-size: 14px; line-height: 1.6; margin: 0 0 8px 0;">To ensure your date is exclusively reserved, a <strong style="color: #D4AF37;">20% deposit</strong> is required.</p>
          <p style="color: #A0A0A0; font-size: 14px; line-height: 1.6; margin: 0;">Your booking will be confirmed once the deposit has been received.</p>
        </div>

        <p style="color: #888; font-size: 13px; font-style: italic; margin-bottom: 24px;">Note: Availability is limited, especially during summer, and dates are reserved on a first-confirmed basis.</p>

        <p style="color: #A0A0A0; font-size: 14px; line-height: 1.7; margin-bottom: 4px;">I look forward to creating something beautiful for you.</p>

        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
          <p style="color: #A0A0A0; font-size: 14px; margin: 0 0 4px 0;">Warm regards,</p>
          <p style="color: #D4AF37; font-size: 15px; font-weight: 500; margin: 0;">Henna On Call NYC</p>
        </div>
      </div>
    `,
  });
}
