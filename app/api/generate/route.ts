import { NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "A prompt is required." },
        { status: 400 }
      );
    }

    if (!process.env.FAL_KEY) {
      return NextResponse.json(
        { error: "FAL_KEY is not configured." },
        { status: 500 }
      );
    }

    fal.config({
      credentials: process.env.FAL_KEY,
    });

    const result = await fal.subscribe("fal-ai/kling-video/v2.1/standard/text-to-video", {
      input: {
        prompt,
        duration: "5",
        aspect_ratio: "9:16",
      },
      logs: true,
    });

    return NextResponse.json({
      success: true,
      video: result.data,
    });
  } catch (error) {
    console.error("Video generation error:", error);

    return NextResponse.json(
      { error: "Video generation failed." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Creator AI video API is running",
  });
}
