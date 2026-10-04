"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  async function generateVideo() {
    if (!prompt.trim()) {
      setError("Please describe the video you want to create.");
      return;
    }

    setLoading(true);
    setError("");
    setVideoUrl("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed.");
      }

      const url =
        data.video?.video?.url ||
        data.video?.url ||
        data.video_url;

      if (!url) {
        throw new Error("The video was generated but no video URL was returned.");
      }

      setVideoUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-zinc-900 rounded-2xl p-8 border border-zinc-800 shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-2">
          Creator AI ✨
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Turn your ideas into AI videos
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the video you want to create..."
          className="w-full h-40 p-4 rounded-xl bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-purple-500 resize-none"
        />

        <button
          onClick={generateVideo}
          disabled={loading}
          className="w-full mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold disabled:opacity-50"
        >
          {loading ? "Generating video..." : "Generate Video →"}
        </button>

        {error && (
          <p className="mt-4 text-red-400 text-center">
            {error}
          </p>
        )}

        {videoUrl && (
          <div className="mt-8">
            <video
              src={videoUrl}
              controls
              className="w-full rounded-xl"
            />

            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center mt-4 text-purple-400"
            >
              Open generated video
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
