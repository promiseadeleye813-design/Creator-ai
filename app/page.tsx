"use client"
import { useState } from "react"

export default function Page() {
  const [prompt, setPrompt] = useState("")
  const [mode, setMode] = useState("video")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function generate() {
    if (!prompt) return alert("Type something first!")
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mode })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data.video || data.result || data)
    } catch (e:any) {
      alert("Error: " + e.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a1a0f] text-white p-4">
      <h1 className="text-3xl font-bold text-center mt-6">
        <span className="text-emerald-400">Creator</span> AI Green
      </h1>
      <p className="text-center text-gray-400 mt-2">Real AI Video Generator</p>
      <div className="flex gap-2 justify-center mt-6">
        {[
          { id: "video", label: "Video" },
          { id: "image", label: "Image" },
          { id: "story", label: "Story" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-5 py-3 rounded-full font-bold ${mode === m.id ? "bg-emerald-500 text-black" : "bg-zinc-800 text-gray-400"}`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-zinc-900 rounded-2xl p-4 border border-emerald-900/50">
          <p className="text-emerald-400 text-sm mb-2">Mode: {mode.toUpperCase()}</p>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="a cat dancing..." className="w-full h-28 bg-zinc-800 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500" />
          <button onClick={generate} disabled={loading} className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-xl text-lg disabled:opacity-50">
            {loading ? "Generating..." : `Generate ${mode}`}
          </button>
        </div>
        {result && (
          <div className="mt-6 bg-zinc-900 rounded-2xl p-4">
            <p className="text-emerald-400 font-bold mb-2">Done!</p>
            {typeof result === "string" && result.startsWith("http") ? <video src={result} controls className="w-full rounded-xl" /> : <pre className="text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>}
          </div>
        )}
      </div>
    </div>
  )
}
