"use client";
import { useState } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  return (
    <main className={`${isDark ? "bg-black text-white" : "bg-white text-slate-900"} min-h-screen`}>
      <header className={`flex justify-between items-center p-6 border-b ${isDark ? "border-yellow-500/20 bg-black" : "border-blue-200 bg-white"}`}>
        <h1 className="text-2xl font-black">
          <span className={isDark ? "text-yellow-400" : "text-blue-600"}>Movie Maker</span>
          <span className="text-sm font-normal ml-2 opacity-70">by Promouse</span>
        </h1>
        <button onClick={() => setIsDark(!isDark)} className={`px-4 py-2 rounded-full font-bold ${isDark ? "bg-yellow-500 text-black" : "bg-blue-600 text-white"}`}>
          {isDark ? "☀ Light" : "🌙 Dark"}
        </button>
      </header>
      <div className="flex flex-col items-center p-6 mt-10">
        <div className={`w-full max-w-xl rounded-[24px] p-8 border ${isDark ? "bg-zinc-900 border-yellow-500/30" : "bg-white border-blue-200"}`}>
          <h2 className="text-3xl font-bold mb-2">Create Magic ✨</h2>
          <textarea placeholder="Your video idea..." className={`w-full h-32 p-4 rounded-2xl border mb-4 ${isDark ? "bg-black border-yellow-500/20 text-white" : "bg-blue-50 border-blue-200"}`} />
          <button className={`w-full py-4 rounded-2xl font-black text-lg ${isDark ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black" : "bg-gradient-to-r from-blue-600 to-blue-400 text-white"}`}>Generate Video</button>
        </div>
      </div>
    </main>
  );
}
