import { useState } from "react";
import {
  Aperture, ArrowUpRight, Bot, Clapperboard, ExternalLink, FolderOpen,
  Image, PackageSearch, Settings2, ShieldCheck, Sparkles, Video
} from "lucide-react";

type Mode = "hemat" | "hybrid" | "premium";

const imageProviders = [
  {
    name: "GenFree",
    tag: "Tanpa akun · tanpa kredit",
    detail: "Terms menyatakan layanan gratis tanpa kredit atau pembayaran. Tetap ada verifikasi manusia dan fair-use/anti-abuse; bukan jaminan throughput tanpa batas.",
    href: "https://genfree.app/",
    action: "Buka GenFree",
    recommended: true,
  },
  {
    name: "FreeImgGen",
    tag: "Tanpa akun · tanpa kredit",
    detail: "Mengklaim tanpa batas harian dan tanpa kredit. Fair-use/rate-limit dapat berlaku saat ramai; hasil dihapus otomatis setelah 24 jam.",
    href: "https://freeimggen.com/",
    action: "Buka FreeImgGen",
  },
];

const videoProviders: { name: string; tag: string; detail: string; href: string; action: string; recommended?: boolean }[] = [];

export default function App() {
  const [mode, setMode] = useState<Mode>("hemat");
  const [productUrl, setProductUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [duration, setDuration] = useState("45");
  const [platform, setPlatform] = useState("TikTok + Shopee Video");
  const [notice, setNotice] = useState("Belum ada provider image-to-video yang lolos verifikasi syarat gratis tanpa kuota dan tanpa pembayaran.");

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
          <div><span className="eyebrow light">NUSA CREATIVE AI</span><h2>From product photo<br/>to moving content.</h2><p>Text-to-image punya beberapa opsi tanpa kredit tetap. Untuk image-to-video, kami tidak akan mencantumkan layanan yang ternyata berbayar atau berbatasan kuota.</p><button className="primary" onClick={() => document.getElementById("image-studio")?.scrollIntoView({behavior:"smooth"})}>Open image studio <ArrowUpRight size={16}/></button></div>
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
          <div className="section-head"><div><span className="eyebrow">TEXT TO IMAGE</span><h3>Image studios · free access</h3></div><span className="muted">Fair-use tetap berlaku</span></div>
          <div className="provider-grid">{imageProviders.map((p)=><article className="panel provider-card" key={p.name}>
            <div className="provider-top"><div className="icon-tile"><Image size={19}/></div>{p.recommended&&<span className="provider-badge">RECOMMENDED</span>}</div>
            <span className="eyebrow">{p.tag}</span><h4>{p.name}</h4><p>{p.detail}</p><a className="provider-link" href={p.href} target="_blank" rel="noreferrer">{p.action} <ExternalLink size={14}/></a>
          </article>)}</div>
        </section>

        <section id="video-studio" className="provider-section">
          <div className="section-head"><div><span className="eyebrow">IMAGE TO VIDEO</span><h3>Animate a real product image</h3></div><span className="muted">AI motion, bukan zoom FFmpeg</span></div>
          {videoProviders.length ? <div className="provider-grid">{videoProviders.map((p)=><article className="panel provider-card" key={p.name}>
            <div className="provider-top"><div className="icon-tile"><Video size={19}/></div>{p.recommended&&<span className="provider-badge">RECOMMENDED</span>}</div>
            <span className="eyebrow">{p.tag}</span><h4>{p.name}</h4><p>{p.detail}</p><a className="provider-link" href={p.href} target="_blank" rel="noreferrer">{p.action} <ExternalLink size={14}/></a>
          </article>)}</div> : <div className="panel guardrail-panel"><h4>Belum ada provider yang memenuhi syarat ketat</h4><p>Saya belum menemukan layanan image-to-video cloud yang dapat diverifikasi benar-benar gratis, tanpa kredit/kuota, tanpa trial, dan tanpa pembayaran untuk penggunaan berulang. Karena itu saya tidak menampilkan tombol provider yang berpotensi menyesatkan.</p><p>Model open-source seperti Wan 2.2 dapat menghasilkan gerakan gambar sungguhan tanpa biaya per render jika dijalankan sendiri, tetapi membutuhkan GPU NVIDIA yang memadai. PC saat ini (Intel HD 4600, RAM 8 GB) tidak memenuhi kebutuhan praktisnya.</p><p>Opsi berikutnya adalah membangun jalur komputasi komunitas/volunteer jika ada jaringan yang secara terbuka mendukung video. Sampai ada layanan yang terbukti, statusnya tetap belum tersedia—bukan pura-pura aktif.</p></div>}
        </section>

        <section id="guardrails" className="provider-section">
          <div className="section-head"><div><span className="eyebrow">TRANSPARENCY</span><h3>What is genuinely free?</h3></div></div>
          <div className="panel guardrail-panel">
            <p><b>Text-to-image:</b> GenFree dan FreeImgGen mengiklankan akses tanpa kredit tetap. Keduanya tetap punya fair-use/anti-abuse dan bukan SLA tanpa batas.</p>
            <p><b>Image-to-video:</b> belum ada layanan yang lolos kriteria ketat setelah klaim provider dibandingkan dengan syarat dan kondisi akses.</p>
            <p><b>Yang tidak dipakai:</b> LoreMotion dan Movoa (akses gratisnya tidak sesuai), Hugging Face ZeroGPU (kuota GPU harian), Loomance/Wan 2.2 lokal (butuh NVIDIA RTX dan RAM lebih besar), serta layanan yang hanya memberi trial/kredit.</p>
            <p className="notice">Provider eksternal dapat mengubah layanan, antrean, syarat, atau kebijakan sewaktu-waktu. Jangan unggah foto pelanggan, dokumen pribadi, atau aset rahasia.</p>
          </div>
        </section>

        <section id="library" className="library-note"><FolderOpen size={18}/><div><b>Content Library belum tersambung ke database.</b><p>Hasil yang diunduh dari provider disimpan ke perangkat Anda. Penyimpanan cloud Neon belum diaktifkan.</p></div></section>
        <footer>© 2026 NUSA CREATIVE AI <span>Free-first workflow · no paid API enabled.</span></footer>
      </section>
    </main>
  );
}
