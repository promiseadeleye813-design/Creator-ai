'use client'
import { useState } from 'react'

export default function Page() {
  const [prompt, setPrompt] = useState('')
  const [videos, setVideos] = useState([
    { id: 1, title: 'My First AI Movie', thumb: '🎬' }
  ])

  const createMovie = () => {
    if(!prompt) return alert('Enter movie idea first!')
    const newVid = { id: Date.now(), title: prompt.slice(0,25), thumb: '✨' }
    setVideos([newVid, ...videos])
    setPrompt('')
    alert('Movie added to Vault! (AI video generation connects next)')
  }

  return (
    <div style={{minHeight:'100vh', background:'#0a0a0a', color:'#fff', fontFamily:'system-ui', padding:20}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth:1000, margin:'0 auto'}}>
        <h1 style={{fontSize:24, fontWeight:900}}>CREATOR AI <span style={{color:'#22c55e'}}>● LIVE</span></h1>
        <a href="https://creator-ai-green.vercel.app" style={{background:'#fff', color:'#000', padding:'8px 16px', borderRadius:20, textDecoration:'none', fontWeight:700, fontSize:13}}>LIVE LINK</a>
      </header>

      <main style={{maxWidth:1000, margin:'40px auto'}}>
        <h2 style={{fontSize:48, fontWeight:900, lineHeight:1, marginBottom:10}}>Movie Maker</h2>
        <p style={{opacity:0.6, marginBottom:30}}>Type idea → Generate → Vault → APK</p>

        <div style={{background:'#171717', borderRadius:20, padding:20, display:'flex', gap:12, marginBottom:40}}>
          <input 
            value={prompt}
            onChange={e=>setPrompt(e.target.value)}
            placeholder="e.g. A Nollywood sci-fi chase in Ede..."
            style={{flex:1, background:'#000', border:'1px solid #333', padding:'16px', borderRadius:12, color:'#fff', fontSize:16}}
          />
          <button onClick={createMovie} style={{background:'#22c55e', color:'#000', border:0, padding:'0 28px', borderRadius:12, fontWeight:900, cursor:'pointer'}}>CREATE</button>
        </div>

        <h3 style={{fontSize:20, marginBottom:16}}>📦 Video Vault ({videos.length})</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px,1fr))', gap:16}}>
          {videos.map(v=>(
            <div key={v.id} style={{background:'#171717', borderRadius:16, padding:20, border:'1px solid #262626'}}>
              <div style={{fontSize:40, marginBottom:10}}>{v.thumb}</div>
              <div style={{fontWeight:700}}>{v.title}</div>
              <div style={{fontSize:12, opacity:0.5, marginTop:6}}>Ready
