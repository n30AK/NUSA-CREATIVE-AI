import { useState } from "react";
import { Aperture, ArrowUpRight, Bot, Clapperboard, ExternalLink, FolderOpen, Image, PackageSearch, Settings2, ShieldCheck, Sparkles, Video, WalletCards } from "lucide-react";

type Mode = "hemat" | "hybrid" | "premium";

export default function App() {
  const [mode, setMode] = useState<Mode>("hemat");
  const [productUrl, setProductUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [duration, setDuration] = useState("45");
  const [platform, setPlatform] = useState("TikTok + Shopee Video");
  const [notice, setNotice] = useState("Studio siap. Generator akan diaktifkan bertahap setelah worker dan database terhubung.");

  function startBrief() {
    if (!productName.trim() && !productUrl.trim()) {
      setNotice("Masukkan nama produk atau tautan marketplace terlebih dahulu.");
      return;
    }
    setNotice("Brief produk tersimpan sementara di sesi browser. Koneksi database dan generator belum diaktifkan.");
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Aperture size={21}/></span><div><b>NUSA</b><small>CREATIVE AI</small></div></div>
        <div className="nav-label">WORKSPACE</div>
        <a className="nav active"><Sparkles size={17}/> Overview</a>
        <a className="nav"><PackageSearch size={17}/> Product Intelligence</a>
        <a className="nav"><Image size={17}/> Image Studio</a>
        <a className="nav"><Video size={17}/> Video Studio</a>
        <a className="nav"><Bot size={17}/> AI Agents</a>
        <a className="nav"><FolderOpen size={17}/> Content Library</a>
        <div className="sidebar-bottom"><Settings2 size={16}/> Settings <span>v0.1.0</span></div>
      </aside>

      <section className="main">
        <header className="topbar"><div><span className="eyebrow">AFFILIATE CONTENT WORKSPACE</span><h1>Creative command center</h1></div><div className="status"><i/> LOCAL-FIRST MODE</div></header>
        <section className="hero">
          <div><span className="eyebrow light">NUSA CREATIVE AI</span><h2>Turn product links<br/>into content that sells.</h2><p>Riset produk, visual promosi, dan video affiliate 9:16 dalam satu alur kerja.</p><button className="primary" onClick={() => document.getElementById("create")?.scrollIntoView({behavior:"smooth"})}>Create content <ArrowUpRight size={16}/></button></div>
          <div className="hero-art"><div className="orb orb-a"/><div className="orb orb-b"/><div className="phone"><div className="phone-top"/><div className="phone-image"><Clapperboard size={35}/></div><div className="phone-line"/><div className="phone-line short"/></div><div className="floating-tag">30–60 SEC VIDEO</div></div>
        </section>

        <section className="panel meta-panel">
          <div className="meta-heading"><div><span className="eyebrow">OPTIONAL AI PROVIDER</span><h3>Meta AI · Dual connection design</h3><p>Jalur akun pengguna dan jalur Meta Model API platform dipisahkan. Keduanya belum aktif.</p></div><span className="locked-pill"><ShieldCheck size={13}/> COST LOCKED</span></div>
          <div className="meta-grid">
            <article className="meta-lane">
              <div className="meta-lane-top"><span className="meta-icon"><Bot size={18}/></span><span className="lane-state">NOT CONNECTED</span></div>
              <h4>1. Akun Meta pengguna</h4>
              <p>Rancangan koneksi akun pribadi. Saat ini Meta tidak mendokumentasikan OAuth pihak ketiga untuk menautkan sesi konsumen meta.ai ke NUSA. Karena itu NUSA tidak meminta password, kode OTP, atau cookie Meta.</p>
              <a className="text-link" href="https://www.meta.ai/" target="_blank" rel="noreferrer">Buka Meta AI <ExternalLink size={13}/></a>
            </article>
            <article className="meta-lane">
              <div className="meta-lane-top"><span className="meta-icon"><Aperture size={18}/></span><span className="lane-state">API KEY REQUIRED</span></div>
              <h4>2. Meta Model API platform</h4>
              <p>Muse Spark untuk teks/agent, Muse Image untuk generate/edit gambar, dan Muse Voice Transcribe untuk speech-to-text. API key hanya di server; tidak pernah di browser.</p>
              <a className="text-link" href="https://dev.meta.ai/" target="_blank" rel="noreferrer">Meta Model API dashboard <ExternalLink size={13}/></a>
            </article>
          </div>
          <div className="meta-governance">
            <div className="governance-title"><WalletCards size={17}/><b>Persetujuan biaya & privasi</b><span>DEFAULT: OFF</span></div>
            <div className="governance-points"><span>• Tidak ada pemanggilan API berbayar sebelum persetujuan.</span><span>• Estimasi biaya dan batas anggaran wajib tampil sebelum tiap pekerjaan.</span><span>• Persetujuan per pekerjaan, pencatatan pemakaian, dan tombol hentikan biaya.</span><span>• Mode Contributor tidak dipilih otomatis karena konten dapat digunakan untuk pelatihan model.</span></div>
            <p className="meta-footnote">Status ini adalah rancangan UI. Penyimpanan persetujuan, billing gate, dan pemanggilan Meta belum terhubung ke backend; tidak ada biaya yang diaktifkan dari halaman ini.</p>
          </div>
        </section>

        <div className="section-head"><div><span className="eyebrow">PRODUCTION PIPELINE</span><h3>Start with a product</h3></div><span className="muted">MVP foundation</span></div>
        <section className="workspace-grid" id="create">
          <div className="panel form-panel">
            <div className="panel-title"><div className="icon-tile"><PackageSearch size={19}/></div><div><b>Product brief</b><small>Marketplace URL or manual input</small></div></div>
            <label>Product URL</label><input value={productUrl} onChange={e=>setProductUrl(e.target.value)} placeholder="https://shopee.co.id/..."/>
            <div className="or"><span>OR MANUAL ENTRY</span></div>
            <label>Product name</label><input value={productName} onChange={e=>setProductName(e.target.value)} placeholder="Contoh: Botol minum stainless 1L"/>
            <div className="two"><div><label>Target platform</label><select value={platform} onChange={e=>setPlatform(e.target.value)}><option>TikTok + Shopee Video</option><option>Instagram Reels</option><option>YouTube Shorts</option><option>Multi-platform</option></select></div><div><label>Video duration</label><select value={duration} onChange={e=>setDuration(e.target.value)}><option value="30">30 seconds</option><option value="45">45 seconds</option><option value="60">60 seconds</option></select></div></div>
            <label>Generation mode</label><div className="modes">{(["hemat","hybrid","premium"] as Mode[]).map(m=><button key={m} className={mode===m?"mode selected":"mode"} onClick={()=>setMode(m)}><b>{m.toUpperCase()}</b><small>{m==="hemat"?"Local tools first":m==="hybrid"?"Free + optional API":"Paid AI providers"}</small></button>)}</div>
            <button className="primary wide" onClick={startBrief}>Prepare content brief <Sparkles size={16}/></button>
            <p className="notice">{notice}</p>
          </div>
          <div className="right-stack">
            <div className="panel metric"><div><span className="eyebrow">CURRENT BUILD</span><h3>Foundation stage</h3><p>UI scaffold is ready for integration.</p></div><span className="metric-icon"><Aperture size={24}/></span></div>
            <div className="panel checklist"><b>Production modules</b>{["Product Intelligence","Image Studio","Video Engine · FFmpeg","Voice & Subtitles","AI Agent Orchestrator","Quality & Disclosure Check"].map((s,i)=><div className="check-row" key={s}><span className={i===0?"dot current":"dot"}/>{s}<small>{i===0?"NEXT":"PLANNED"}</small></div>)}</div>
            <div className="cost-note"><Sparkles size={17}/><div><b>Gratis-first by design</b><p>Paid generation stays off until you explicitly enable a provider and approve its estimated cost.</p></div></div>
          </div>
        </section>
        <footer>© 2026 NUSA CREATIVE AI <span>Built for responsible affiliate content production.</span></footer>
      </section>
    </main>
  );
}
