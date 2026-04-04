import { getSession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { sendCustomerConfirmation } from "@/app/lib/email";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const service = searchParams.get("service");
  const status = searchParams.get("status");

  const where: Record<string, unknown> = {};
  if (service) where.service = { contains: service };
  if (status) where.status = status;

  const bookings = await prisma.booking.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ bookings });
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status required" },
        { status: 400 },
      );
    }

    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    if (status === "confirmed") {
      try {
        await sendCustomerConfirmation(booking);
      } catch (err) {
        console.error("Customer confirmation email failed:", err);
      }
    }

    // Revalidate admin pages that show booking counts/stats
    revalidatePath("/admin", "layout");

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 },
    );
  }
}
