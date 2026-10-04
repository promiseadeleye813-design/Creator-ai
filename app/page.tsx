"use client";

import { useState } from "react";

type Job = {
  id: string;
  prompt: string;
  aspectRatio: string;
  duration: number;
  status: string;
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [duration, setDuration] = useState(18);
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState("");

  async function generateVideo() {
    setError("");
    setJob(null);

    if (!prompt.trim()) {
      setError("Describe the video you want to create.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          aspectRatio,
          duration,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Generation failed.");
      }

      setJob(data.job);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-5 py-10">
      <div className="mx-auto max-w-4xl">

        <header className="mb-10 text-center">
          <div className="mb-4 inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            ✨ AI Video Studio
          </div>

          <h1 className="text-5xl font-bold tracking-tight">
            Creator AI
          </h1>

          <p className="mt-4 text-zinc-400">
            Turn your ideas into cinematic AI videos.
          </p>
        </header>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">

          <label className="mb-3 block text-sm font-medium text-zinc-300">
            What do you want to create?
          </label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: A young engineer discovers a mysterious glowing machine inside an abandoned laboratory..."
            className="min-h-[180px] w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-white outline-none transition focus:border-purple-500"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Aspect ratio
              </label>

              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-white outline-none"
              >
                <option value="9:16">9:16 — TikTok / Reels / Shorts</option>
                <option value="16:9">16:9 — YouTube / Cinema</option>
                <option value="1:1">1:1 — Square</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Video length
              </label>

              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-white outline-none"
              >
                <option value={18}>18 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>60 seconds</option>
                <option value={90}>90 seconds</option>
                <option value={120}>2 minutes</option>
              </select>
            </div>

          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            onClick={generateVideo}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-4 font-bold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating your video..." : "Generate Video ✨"}
          </button>
        </section>

        {job && (
          <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Generation Job
              </h2>

              <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300">
                {job.status}
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-zinc-500">Prompt</p>
                <p className="mt-1 text-zinc-200">
                  {job.prompt}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-500">Format</p>
                  <p className="mt-1">{job.aspectRatio}</p>
                </div>

                <div>
                  <p className="text-zinc-500">Duration</p>
                  <p className="mt-1">{job.duration}s</p>
                </div>
              </div>

              <div className="rounded-xl bg-zinc-900 p-4 text-zinc-400">
                Your generation request has been accepted. The video
                model can now be connected to this job system.
              </div>
            </div>

          </section>
        )}

        <footer className="mt-10 text-center text-xs text-zinc-600">
          Creator AI • AI Video Creation Studio
        </footer>

      </div>
    </main>
  );
}
