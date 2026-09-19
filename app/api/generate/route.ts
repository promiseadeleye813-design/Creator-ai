import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  return NextResponse.json({ success: true, prompt: prompt });
}

export async function GET() {
  return NextResponse.json({ status: "API working green!" });
}
