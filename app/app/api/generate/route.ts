import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    const output = await replicate.run(
      "lucataco/hotshot-xl:78b0a0e05043ef1f6af5d8997fa7e57fc57d6bfe9fd581d1c9dcd52bfaef4b84" as any,
      { input: { prompt } }
    )
    return NextResponse.json({ video: output })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
