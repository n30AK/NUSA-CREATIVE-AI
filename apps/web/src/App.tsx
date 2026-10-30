import { useState } from "react";
import {
  Aperture, ArrowUpRight, Bot, Clapperboard, ExternalLink, FolderOpen,
  Image, PackageSearch, Settings2, ShieldCheck, Sparkles, Video
} from "lucide-react";

type Mode = "hemat" | "hybrid" | "premium";

const imageProviders = [
  {
    name: "AI Horde",
    tag: "Komunitas open-source",
    detail: "Gratis melalui GPU sukarelawan. Tanpa paket kredit; antrean anonim paling rendah dan kecepatan bergantung worker aktif.",
    href: "https://api.stablehorde.net/generate/image/",
    action: "Buka AI Horde Studio",
    recommended: true,
  },
  {
    name: "FreeImgGen",
    tag: "Tanpa akun",
    detail: "Mengiklankan generasi tanpa batas harian dan tanpa kredit. Tetap menerapkan fair-use/rate limit saat ramai; file disimpan sementara.",
    href: "https://freeimggen.com/",
    action: "Buka FreeImgGen",
  },
  {
    name: "GenFree",
    tag: "Tanpa akun",
    detail: "Mengiklankan tanpa kredit harian, tetapi memakai verifikasi manusia dan perlindungan terhadap permintaan berlebihan.",
    href: "https://genfree.app/",
    action: "Buka GenFree",
  },
];

const videoProviders = [
  {
    name: "LoreMotion",
    tag: "Pilihan utama · Image-to-video",
    detail: "LTX-Video gratis tanpa batas harian setelah akun gratis dibuat; 720p, 3/5/8 detik, antrean bersama dan iklan singkat per render. Bukan API untuk diotomasi.",
    href: "https://loremotion.com/generate/",
    action: "Buka LoreMotion",
    recommended: true,
  },
  {
    name: "Movoa",
    tag: "Alternatif · MiniMax H3",
    detail: "Free lane tanpa batas harian untuk H3 480p/4 detik dengan akun gratis; antrean bersama. Ketentuan melarang bot, skrip, dan otomasi.",
    href: "https://movoa.ai/video",
    action: "Buka Movoa",
  },
];

export default function App() {
  const [mode, setMode] = useState<Mode>("hemat");
  const [productUrl, setProductUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [duration, setDuration] = useState("45");
  const [platform, setPlatform] = useState("TikTok + Shopee Video");
  const [notice, setNotice] = useState("Pilih provider gratis di bawah. NUSA tidak meminta kartu pembayaran atau mengaktifkan tagihan.");

  function startBrief() {
    if (!productName.trim() && !productUrl.trim()) {
      setNotice("Masukkan nama produk atau tautan marketplace terlebih dahulu.");
      return;
    }
    setNotice("Brief siap di sesi browser. Salin detail produk ke provider yang Anda pilih; marketplace belum diambil otomatis.");
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Aperture size={21}/></span><div><b>NUSA</b><small>CREATIVE AI</small></div></div>
        <div className="nav-label">WORKSPACE</div>
        <a className="nav active" href="#overview"><Sparkles size={17}/> Overview</a>
        <a className="nav" href="#create"><PackageSearch size={17}/> Product Brief</a>
        <a className="nav" href="#image-studio"><Image size={17}/> Text to Image</a>
        <a className="nav" href="#video-studio"><Video size={17}/> Image to Video</a>
        <a className="nav" href="#guardrails"><Bot size={17}/> Provider Rules</a>
        <a className="nav" href="#library"><FolderOpen size={17}/> Content Library</a>
        <div className="sidebar-bottom"><Settings2 size={16}/> Settings <span>v0.2.0</span></div>
      </aside>

      <section className="main">
        <header className="topbar" id="overview"><div><span className="eyebrow">AFFILIATE CONTENT WORKSPACE</span><h1>Creative command center</h1></div><div className="status"><i/> GRATIS-FIRST MODE</div></header>
        <section className="hero">
          <div><span className="eyebrow light">NUSA CREATIVE AI</span><h2>From product photo<br/>to moving content.</h2><p>Gunakan generator gambar dan image-to-video yang benar-benar punya jalur gratis tanpa paket kredit harian.</p><button className="primary" onClick={() => document.getElementById("image-studio")?.scrollIntoView({behavior:"smooth"})}>Open free studios <ArrowUpRight size={16}/></button></div>
          <div className="hero-art"><div className="orb orb-a"/><div className="orb orb-b"/><div className="phone"><div className="phone-top"/><div className="phone-image"><Clapperboard size={35}/></div><div className="phone-line"/><div className="phone-line short"/></div><div className="floating-tag">IMAGE → MOTION</div></div>
        </section>

        <div className="section-head" id="create"><div><span className="eyebrow">PRODUCT INPUT</span><h3>Prepare product brief</h3></div><span className="muted">Tidak mengambil data marketplace otomatis</span></div>
        <section className="workspace-grid">
          <div className="panel form-panel">
            <div className="panel-title"><div className="icon-tile"><PackageSearch size={19}/></div><div><b>Product brief</b><small>Masukkan tautan atau detail produk</small></div></div>
            <label>Product URL</label><input value={productUrl} onChange={e=>setProductUrl(e.target.value)} placeholder="https://shopee.co.id/..."/>
            <div className="or"><span>ATAU INPUT MANUAL</span></div>
            <label>Product name</label><input value={productName} onChange={e=>setProductName(e.target.value)} placeholder="Contoh: Botol minum stainless 1L"/>
            <div className="two"><div><label>Target platform</label><select value={platform} onChange={e=>setPlatform(e.target.value)}><option>TikTok + Shopee Video</option><option>Instagram Reels</option><option>YouTube Shorts</option><option>Multi-platform</option></select></div><div><label>Target final duration</label><select value={duration} onChange={e=>setDuration(e.target.value)}><option value="30">30 seconds</option><option value="45">45 seconds</option><option value="60">60 seconds</option></select></div></div>
            <label>Workflow mode</label><div className="modes">{(["hemat","hybrid","premium"] as Mode[]).map(m=><button key={m} className={mode===m?"mode selected":"mode"} onClick={()=>setMode(m)}><b>{m.toUpperCase()}</b><small>{m==="hemat"?"Free providers":m==="hybrid"?"Free + manual editing":"Provider berbayar (nonaktif)"}</small></button>)}</div>
            <button className="primary wide" onClick={startBrief}>Prepare content brief <Sparkles size={16}/></button>
            <p className="notice">{notice}</p>
          </div>
          <div className="right-stack">
            <div className="panel metric"><div><span className="eyebrow">STATUS INTEGRASI</span><h3>External free providers</h3><p>Studio membuka provider resmi di tab baru. Tidak ada API key atau pembayaran yang diaktifkan.</p></div><span className="metric-icon"><ShieldCheck size={24}/></span></div>
            <div className="panel checklist"><b>Alur produksi yang realistis</b>{["Buat visual produk dari teks","Upload visual ke generator video","Download klip pendek hasil AI","Rangkai klip menjadi video 30–60 detik","Validasi disclosure dan hak aset"].map((s,i)=><div className="check-row" key={s}><span className="dot current"/>{s}<small>{i<2?"READY TO OPEN":"NEXT"}</small></div>)}</div>
            <div className="cost-note"><Sparkles size={17}/><div><b>Rp0 · tanpa aktivasi tagihan</b><p>Provider berbayar dan endpoint berbayar tidak dipanggil. Kuota gratis pihak ketiga tetap mengikuti ketentuan mereka.</p></div></div>
          </div>
        </section>

        <section id="image-studio" className="provider-section">
          <div className="section-head"><div><span className="eyebrow">TEXT TO IMAGE</span><h3>Free image studios</h3></div><span className="muted">Tanpa paket kredit harian</span></div>
          <div className="provider-grid">{imageProviders.map((p)=><article className="panel provider-card" key={p.name}>
            <div className="provider-top"><div className="icon-tile"><Image size={19}/></div>{p.recommended&&<span className="provider-badge">RECOMMENDED</span>}</div>
            <span className="eyebrow">{p.tag}</span><h4>{p.name}</h4><p>{p.detail}</p><a className="provider-link" href={p.href} target="_blank" rel="noreferrer">{p.action} <ExternalLink size={14}/></a>
          </article>)}</div>
        </section>

        <section id="video-studio" className="provider-section">
          <div className="section-head"><div><span className="eyebrow">IMAGE TO VIDEO</span><h3>Animate a real product image</h3></div><span className="muted">AI motion, bukan zoom FFmpeg</span></div>
          <div className="provider-grid">{videoProviders.map((p)=><article className="panel provider-card" key={p.name}>
            <div className="provider-top"><div className="icon-tile"><Video size={19}/></div>{p.recommended&&<span className="provider-badge">RECOMMENDED</span>}</div>
            <span className="eyebrow">{p.tag}</span><h4>{p.name}</h4><p>{p.detail}</p><a className="provider-link" href={p.href} target="_blank" rel="noreferrer">{p.action} <ExternalLink size={14}/></a>
          </article>)}</div>
          <div className="notice-panel"><b>Catatan durasi:</b> provider AI di atas membuat klip pendek 3–8 detik, bukan satu video 30–60 detik. Video panjang harus dirangkai dari beberapa klip AI dan materi produk. Ini gerakan objek/adegan hasil model, berbeda dari efek zoom pada gambar diam.</div>
        </section>

        <section id="guardrails" className="provider-section">
          <div className="section-head"><div><span className="eyebrow">TRANSPARENCY</span><h3>What is genuinely free?</h3></div></div>
          <div className="panel guardrail-panel">
            <p><b>AI Horde:</b> komputasi sukarela, tanpa kredit pembelian. Tidak ada jaminan waktu tunggu atau kapasitas tetap; permintaan anonim berada di prioritas paling rendah.</p>
            <p><b>LoreMotion:</b> klaim unlimited LTX-Video untuk akun gratis, dengan iklan per render dan antrean bersama. Bukan API publik untuk dihubungkan otomatis ke NUSA.</p>
            <p><b>Movoa:</b> free lane MiniMax H3 tanpa batas harian, tetapi klip 480p/4 detik; syaratnya melarang otomasi/bot.</p>
            <p><b>Yang tidak saya masukkan:</b> Hugging Face ZeroGPU (kuota GPU harian), FramePack lokal (perlu NVIDIA RTX), dan ZSky untuk aset produk sensitif (lisensi unggahnya luas, output gratis dipublikasikan secara default, serta melarang penggunaan otomatis).</p>
            <p className="notice">Provider eksternal dapat mengubah layanan, antrean, syarat, atau kebijakan sewaktu-waktu. Jangan unggah foto pelanggan, dokumen pribadi, atau aset rahasia.</p>
          </div>
        </section>

        <section id="library" className="library-note"><FolderOpen size={18}/><div><b>Content Library belum tersambung ke database.</b><p>Hasil yang diunduh dari provider disimpan ke perangkat Anda. Penyimpanan cloud Neon belum diaktifkan.</p></div></section>
        <footer>© 2026 NUSA CREATIVE AI <span>Free-first workflow · no paid API enabled.</span></footer>
      </section>
    </main>
  );
}
