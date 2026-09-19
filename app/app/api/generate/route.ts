import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { prompt, mode } = await req.json()
  return NextResponse.json({ 
    result: `Generated ${mode}: ${prompt}`,
    video: null,
    message: "Add your REPLICATE_API_TOKEN in Vercel Env to generate real video"
  })
}
