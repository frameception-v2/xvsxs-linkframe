import { fetchFrameData } from "~/lib/api/neynarClient";
import { NextResponse } from "next/server";
import { z } from "zod";

const QuerySchema = z.object({
  page: z.string().min(1),
});

export async function GET(
  request: Request,
  { params }: { params: { page: string } }
) {
  try {
    // Validate query params
    const { success } = QuerySchema.safeParse(params);
    if (!success) {
      return new NextResponse("Invalid frame ID", { status: 400 });
    }

    // Fetch frame data from Neynar
    const frameData = await fetchFrameData(params.page);
    
    return NextResponse.json(frameData, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60",
      },
    });
  } catch (error) {
    console.error("Frame API error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch frame data" }),
      { status: 500 }
    );
  }
}
