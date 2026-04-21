import { NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!placeId || !apiKey) {
    return NextResponse.json(
      { error: "Google API not configured" },
      { status: 500 },
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews,rating,user_ratings_total&key=${apiKey}&reviews_sort=newest`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`Google API error: ${res.status}`);
    }

    const data = await res.json();

    if (data.status !== "OK") {
      throw new Error(`Google Places status: ${data.status}`);
    }

    return NextResponse.json({
      rating: data.result?.rating ?? null,
      totalRatings: data.result?.user_ratings_total ?? null,
      reviews: data.result?.reviews ?? [],
    });
  } catch (err) {
    console.error("Failed to fetch Google reviews:", err);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}
