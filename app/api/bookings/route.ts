import { prisma } from "@/app/lib/db";
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
      package: pkg,
      message,
      price,
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
      !service ||
      !pkg ||
      !price
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
        package: pkg,
        message: message || null,
        price: parseFloat(price),
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}
