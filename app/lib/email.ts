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
  street: string;
  apt?: string | null;
  city: string;
  state: string;
  zip: string;
  message?: string | null;
};

export async function sendAdminNotification(booking: BookingData) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("SMTP not configured, skipping email notification");
    return;
  }

  const serviceName = SERVICE_LABELS[booking.service] || booking.service;

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
          ${booking.partySize ? `<tr><td style="padding: 8px 0; color: #A0A0A0;">Party Size</td><td style="padding: 8px 0; color: #D4AF37;">${booking.partySize} persons</td></tr>` : ""}
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

  const serviceName = SERVICE_LABELS[booking.service] || booking.service;

  await transporter.sendMail({
    from: `"Henna On Call NYC" <${process.env.SMTP_USER}>`,
    to: booking.email,
    subject: `Booking Confirmed - ${serviceName} | Henna On Call NYC`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #fff; padding: 32px; border-radius: 16px;">
        <h1 style="color: #D4AF37; font-size: 24px; margin-bottom: 8px;">Thank You, ${booking.name}!</h1>
        <p style="color: #A0A0A0; margin-bottom: 24px;">Your henna session has been confirmed! Here are your details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #A0A0A0;">Service</td><td style="padding: 8px 0; color: #D4AF37;">${serviceName}</td></tr>
          <tr><td style="padding: 8px 0; color: #A0A0A0;">Date</td><td style="padding: 8px 0; color: #fff;">${booking.date}</td></tr>
          <tr><td style="padding: 8px 0; color: #A0A0A0;">Price</td><td style="padding: 8px 0; color: #fff;">$${booking.price}</td></tr>
        </table>
        <p style="margin-top: 24px; color: #A0A0A0; font-size: 14px;">Your appointment is confirmed. A 20% deposit reserves your date.</p>
        <p style="margin-top: 16px; color: #666; font-size: 12px;">Henna On Call NYC | Luxury Bridal Henna</p>
      </div>
    `,
  });
}
