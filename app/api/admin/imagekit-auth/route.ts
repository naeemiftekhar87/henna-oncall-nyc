import { getSession } from "@/app/lib/auth";
import { getImageKit } from "@/app/lib/imagekit";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const imagekit = getImageKit();
    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    console.error("ImageKit auth error:", error);
    return NextResponse.json(
      { error: "ImageKit not configured" },
      { status: 500 },
    );
  }
}
