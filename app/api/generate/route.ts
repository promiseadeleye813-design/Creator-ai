import { NextResponse } from "next/server";

export const runtime = "nodejs";

type GenerateRequest = {
  prompt?: string;
  aspectRatio?: "9:16" | "16:9" | "1:1";
  duration?: number;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GenerateRequest;

    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a video prompt.",
        },
        { status: 400 }
      );
    }

    /*
     * Creator AI generation request
     *
     * This endpoint prepares the generation job.
     * The actual video model can be connected here without
     * changing the frontend.
     */

    const job = {
      id: crypto.randomUUID(),
      prompt,
      aspectRatio: body.aspectRatio ?? "9:16",
      duration: Math.min(Math.max(body.duration ?? 18, 18), 120),
      status: "queued",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Video generation job created.",
      job,
    });
  } catch (error) {
    console.error("Creator AI generation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while creating the generation job.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    service: "Creator AI",
    status: "online",
    message: "Creator AI generation API is running.",
  });
}
