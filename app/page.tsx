export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-zinc-900 rounded-2xl p-8 border border-zinc-800 shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Creator AI ✨
        </h1>
        <p className="text-zinc-400 text-center mb-8">Generate anything with AI</p>
        
        <div className="space-y-4">
          <input 
            id="prompt"
            placeholder="Describe what you want to create..." 
            className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-purple-500"
          />
          <button 
            onClick={() => alert('Now we will connect real AI! Build is GREEN!')}
            className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold hover:opacity-90"
          >
            Generate Magic →
          </button>
        </div>

        <p className="text-center text-xs text-zinc-500 mt-6">Your site is LIVE and FIXED! ✅</p>
      </div>
    </main>
  )
}
