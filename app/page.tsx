'use client'
export default function Home(){
 return <div style={{padding:20,background:'#0a0a0a',color:'#fff',minHeight:'100vh'}}>
 <h1>Creator AI Studio</h1>
 <p>Your AI Studio. Your Story. Your Cinema.</p>
 <div style={{marginTop:30,padding:20,background:'#111',borderRadius:12}}>
 <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
 <h2 style={{margin:0}}>Video Vault</h2>
 <button style={{padding:8,background:'#333',color:'#fff',borderRadius:6,border:0}}>Retry All</button>
 <a href="/movie-maker" style={{padding:10,background:'#6d28d9',borderRadius:8,color:'#fff',textDecoration:'none'}}>🎬 Movie Maker</a>
 </div>
 </div>
 </div>
}
