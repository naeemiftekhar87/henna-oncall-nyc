import { createToken, getSession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newEmail } = await request.json();

    if (!currentPassword || !newEmail) {
      return NextResponse.json(
        { error: "Current password and new email are required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { id: session.id },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 403 },
      );
    }

    if (admin.email === newEmail) {
      return NextResponse.json(
        { error: "New email must be different from current email" },
        { status: 400 },
      );
    }

    const existing = await prisma.admin.findUnique({
      where: { email: newEmail },
    });
    if (existing) {
      return NextResponse.json(
        { error: "This email is already in use" },
        { status: 409 },
      );
    }

    await prisma.admin.update({
      where: { id: session.id },
      data: { email: newEmail },
    });

    // Issue a new token with the updated email
    const token = await createToken({ id: admin.id, email: newEmail });
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Change email error:", error);
    return NextResponse.json(
      { error: "Failed to change email" },
      { status: 500 },
    );
  }
}
