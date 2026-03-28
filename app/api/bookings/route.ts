import { prisma } from "@/app/lib/db";
import { sendAdminNotification } from "@/app/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      date,
      street,
      apt,
      city,
      state,
      zip,
      service,
      message,
      price,
      partySize,
    } = body;

    if (
      !name ||
      !email ||
      !phone ||
      !date ||
      !street ||
      !city ||
      !state ||
      !zip ||
      !service
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        date,
        street,
        apt: apt || null,
        city,
        state,
        zip,
        service,
        message: message || null,
        price: parseFloat(price) || 0,
        partySize:
          service === "party" && partySize ? parseInt(partySize) : null,
        status: "pending",
      },
    });

    // Send admin notification (non-blocking)
    sendAdminNotification(booking).catch((err) =>
      console.error("Email notification failed:", err),
    );

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}
