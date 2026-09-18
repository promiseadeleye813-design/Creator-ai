'use client'
import { useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [videos, setVideos] = useState([{id:1, title:'My First Movie'}])

  function createMovie(){
    if(!prompt) return alert('Type idea first')
    setVideos([{id:Date.now(), title:prompt}, ...videos])
    setPrompt('')
  }

  return (
    <main style={{background:'#000', color:'#fff', minHeight:'100vh', padding:24, fontFamily:'Arial'}}>
      <h1 style={{fontSize:28, fontWeight:900}}>CREATOR AI <span style={{color:'#22ff88'}}>LIVE</span></h1>
      <p style={{opacity:0.6}}>Movie Maker - Ede Edition</p>

      <div style={{marginTop:30, display:'flex', gap:10}}>
        <input
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          placeholder="Movie idea - e.g. Nollywood chase"
          style={{flex:1, padding:16, borderRadius:12, border:'1px solid #333', background:'#111', color:'#fff'}}
        />
        <button onClick={createMovie} style={{background:'#22ff88', color:'#000', padding:16, borderRadius:12, fontWeight:900, border:0}}>CREATE</button>
      </div>

      <h2 style={{marginTop:40}}>Video Vault {videos.length}</h2>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
        {videos.map((v)=>(
          <div key={v.id} style={{background:'#151515', padding:20, borderRadius:16, border:'1px solid #222'}}>
            <div style={{fontSize:30}}>🎬</div>
            <div style={{marginTop:8, fontWeight:700}}>{v.title}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
