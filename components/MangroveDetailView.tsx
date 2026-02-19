
import React, { useEffect } from 'react';

interface MangroveDetailViewProps {
  onBack: () => void;
}

const MangroveDetailView: React.FC<MangroveDetailViewProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const species = [
    {
      name: 'Bakau (Rhizophora)',
      scientific: 'Rhizophora apiculata',
      tag: 'Penahan Gelombang Utama',
      details: 'Memiliki akar tunjang yang kuat untuk menahan hantaman ombak besar. Di Bleberan, ini adalah spesies utama penahan abrasi.',
      image: 'https://live.staticflickr.com/3244/3043163309_7ab1776a34_b.jpg',
    },
    {
      name: 'Api-api (Avicennia)',
      scientific: 'Avicennia marina',
      tag: 'Pionir Pesisir',
      details: 'Tumbuh di zona paling luar. Akar napasnya yang menyembul ke atas sangat efektif memerangkap sedimen lumpur.',
      image: 'https://blog-backup.lindungihutan.com/wp-content/uploads/2022/06/Pohon-Api-api-yang-Mampu-Hidup-di-Daerah-Pantai-dan-Pesisir-Design-Blog-LindungiHutan-768x576.jpg',
    },
    {
      name: 'Bogem (Sonneratia)',
      scientific: 'Sonneratia alba',
      tag: 'Penyeimbang Ekosistem',
      details: 'Memiliki buah yang dapat dikonsumsi dan menjadi habitat favorit bagi berbagai jenis burung migran di pesisir Banaran.',
      image: 'https://th.bing.com/th/id/OIP.5QtGIQZWgD6W5HxljYVYDAHaFj?w=233&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3https://live.staticflickr.com/5819/30722535045_4985a81d75_b.jpg',
    }
  ];

  const abrasionCauses = [
    { title: 'Faktor Alam', desc: 'Hantaman gelombang laut selatan yang kuat dan kenaikan permukaan air laut akibat perubahan iklim.' },
    { title: 'Aktivitas Manusia', desc: 'Penebangan hutan pantai secara liar dan penambangan pasir yang tidak terkendali di sekitar muara.' },
    { title: 'Kurangnya Sabuk Hijau', desc: 'Hilangnya vegetasi pelindung menyebabkan tanah pesisir mudah terbawa arus saat terjadi badai.' }
  ];

  const participationSteps = [
    { title: 'Kampanye Digital', desc: 'Bagikan foto atau video kunjunganmu di media sosial dengan hashtag #LestariBanaran untuk meningkatkan kesadaran publik.', icon: '📱' },
    { title: 'Donasi Bibit', desc: 'Dukung keberlanjutan pembibitan di Wanatirta melalui program adopsi bibit mangrove bersama Pokdarwis.', icon: '🌱' },
    { title: 'Aksi Bersih', desc: 'Jangan tinggalkan apapun kecuali jejak kaki. Pastikan area akar mangrove bebas dari jeratan sampah plastik.', icon: '🧤' }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="group flex items-center space-x-3 text-emerald-900 font-black uppercase text-[10px] tracking-widest hover:text-orange-600 transition-all"
          >
            <div className="w-8 h-8 rounded-full border-2 border-emerald-900 flex items-center justify-center group-hover:border-orange-600 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </div>
            <span>Kembali Ke Beranda</span>
          </button>
          <div className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-white-600 rounded-lg flex items-center justify-center text-white font-black text-xs">
                   <img 
              src="logo/bleberan2.png" 
              alt="Logo Dusun Bleberan"
              className="w-full h-full object-contain"
            />
                </div>
             <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-emerald-900">Edukasi Konservasi</span>
          </div>
        </div>
      </nav>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center overflow-hidden mb-24 bg-emerald-950">
           <img 
             src="https://pesonapapua.com/wp-content/uploads/2025/03/pohon-mangrove-di-biak.jpeg" 
             className="absolute inset-0 w-full h-full object-cover opacity-30" 
             alt="Hutan Mangrove Banaran"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent"></div>
           <div className="container mx-auto px-6 relative z-10 text-center">
              <div className="max-w-4xl mx-auto">
                 <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight tracking-tighter mb-12 animate-in fade-in duration-1000">
                   Mengenal <span className="text-emerald-400 italic">Abrasi & Mangrove</span>
                 </h1>
                 <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 shadow-2xl inline-block max-w-2xl">
                    <p className="text-xl md:text-2xl text-emerald-50 leading-relaxed font-serif italic">
                      “Mangrove bukan hanya tanaman, tapi benteng alami yang melindungi masa depan pesisir kita.”
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* Section 1: Apa itu Abrasi? */}
        <section className="container mx-auto px-6 mb-40">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <span className="text-orange-600 font-black text-xs uppercase tracking-[0.4em] mb-4 block">Ancaman Nyata</span>
                 <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-8 leading-tight">Apa Itu <span className="text-orange-800">Abrasi Pantai?</span></h2>
                 <p className="text-slate-600 text-lg leading-relaxed mb-10">
                    Abrasi adalah proses pengikisan pantai oleh tenaga gelombang laut dan arus laut yang bersifat merusak. Pengikisan ini menyebabkan garis pantai terus mundur dan dapat menenggelamkan area pemukiman di pesisir.
                 </p>
                 <div className="space-y-6">
                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm mb-4">Penyebab Utama:</h4>
                    {abrasionCauses.map((cause, i) => (
                       <div key={i} className="flex gap-4 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100">
                          <div className="w-6 h-6 bg-orange-200 rounded-full shrink-0 flex items-center justify-center text-[10px] font-black text-orange-900">{i+1}</div>
                          <div>
                             <h5 className="font-bold text-slate-900">{cause.title}</h5>
                             <p className="text-sm text-slate-500">{cause.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="relative">
                 <div className="rounded-[4rem] overflow-hidden shadow-2xl h-[500px]">
                    <img src="https://img.harianjogja.com/posts/2020/11/09/1054821/abrasi-trisik-ancam-tempat-konservasi.jpg" className="w-full h-full object-cover" alt="Ilustrasi Abrasi" />
                 </div>
              </div>
           </div>
        </section>

        {/* Section 2: Apa itu Mangrove? */}
        <section className="bg-emerald-50 py-32 mb-40 overflow-hidden">
           <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-20 items-center">
                 <div className="lg:w-1/2 order-2 lg:order-1">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-4 translate-y-8">
                          <img src="https://visitingjogja.jogjaprov.go.id/en/wp-content/uploads/2020/11/hutan-mangrove-pantai-congot-2.jpg" className="rounded-3xl shadow-xl" alt="Mangrove 1" />
                          <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-xl">
                             <p className="font-black text-4xl mb-2">4x</p>
                             <p className="text-xs uppercase font-bold tracking-widest opacity-80">Lebih banyak serap karbon dibanding hutan darat.</p>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <div className="bg-orange-500 p-8 rounded-3xl text-white shadow-xl">
                             <p className="font-black text-4xl mb-2">90%</p>
                             <p className="text-xs uppercase font-bold tracking-widest opacity-80">Energi gelombang diredam oleh akar mangrove.</p>
                          </div>
                          <img src="https://thumbs.dreamstime.com/b/wooden-stairs-sea-mangrove-tree-growing-old-wooden-stairs-water-small-mangrove-tree-growing-229694393.jpg" className="rounded-3xl shadow-xl" alt="Mangrove 2" />
                       </div>
                    </div>
                 </div>
                 <div className="lg:w-1/2 order-1 lg:order-2">
                    <span className="text-emerald-700 font-black text-xs uppercase tracking-[0.4em] mb-4 block">Solusi Alami</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-emerald-950 mb-8 leading-tight">Apa Itu <span className="text-emerald-600">Mangrove?</span></h2>
                    <p className="text-emerald-900/70 text-lg leading-relaxed mb-8">
                       Mangrove adalah sekumpulan pohon dan semak yang tumbuh di zona pasang surut air laut. Di Indonesia, ia sering disebut sebagai hutan bakau. 
                    </p>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-emerald-100">
                       <h4 className="font-bold text-emerald-900 mb-4">Mengapa Efektif Mencegah Abrasi?</h4>
                       <ul className="space-y-4 text-slate-600 text-sm">
                          <li className="flex gap-3">
                             <span className="text-emerald-500 font-bold">✓</span>
                             <span><strong>Struktur Akar Rapat:</strong> Memecah energi gelombang laut secara mekanis.</span>
                          </li>
                          <li className="flex gap-3">
                             <span className="text-emerald-500 font-bold">✓</span>
                             <span><strong>Memerangkap Sedimen:</strong> Lumpur yang tertahan di akar membentuk daratan baru (akresi).</span>
                          </li>
                          <li className="flex gap-3">
                             <span className="text-emerald-500 font-bold">✓</span>
                             <span><strong>Fleksibilitas:</strong> Batang mangrove yang lentur tidak mudah patah dihantam ombak badai.</span>
                          </li>
                       </ul>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Section 3: Jenis Mangrove di Bleberan */}
        <section className="container mx-auto px-6 mb-40">
           <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-6">Jenis Mangrove di <span className="text-emerald-700">Bleberan</span></h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Kenali spesies utama yang menjadi pilar pelindung Dusun Banaran.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {species.map((s, i) => (
                <div key={i} className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 group transition-all hover:-translate-y-2">
                   <div className="h-64 overflow-hidden">
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <div className="p-8">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-3 inline-block">{s.tag}</span>
                      <h4 className="text-2xl font-bold text-slate-900">{s.name}</h4>
                      <p className="text-xs text-emerald-800 italic font-bold mb-4">{s.scientific}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{s.details}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Section 4: Manfaat & Cara Menjaga */}
        <section className="container mx-auto px-6 mb-40">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-emerald-900 rounded-[4rem] p-12 text-white shadow-3xl flex flex-col justify-center">
                 <h3 className="text-3xl font-serif mb-8 text-emerald-300">Manfaat Bagi Lingkungan & Masyarakat</h3>
                 <div className="space-y-6">
                    <div className="flex gap-6 items-start">
                       <div className="text-4xl">🐟</div>
                       <div>
                          <h5 className="font-bold mb-1">Rumah Biota Laut</h5>
                          <p className="text-emerald-100/60 text-sm italic">Menjadi tempat pemijahan alami bagi ikan, udang, dan kepiting komersial.</p>
                       </div>
                    </div>
                    <div className="flex gap-6 items-start">
                       <div className="text-4xl">🌫️</div>
                       <div>
                          <h5 className="font-bold mb-1">Penyaring Alami</h5>
                          <p className="text-emerald-100/60 text-sm italic">Menyaring polutan dan sampah plastik agar tidak langsung mencemari laut lepas.</p>
                       </div>
                    </div>
                    <div className="flex gap-6 items-start">
                       <div className="text-4xl">💰</div>
                       <div>
                          <h5 className="font-bold mb-1">Ekonomi Hijau</h5>
                          <p className="text-emerald-100/60 text-sm italic">Membuka lapangan kerja melalui pariwisata berkelanjutan bagi warga Dusun Banaran.</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="bg-white border-4 border-emerald-900 rounded-[4rem] p-12 shadow-3xl flex flex-col justify-center">
                 <h3 className="text-3xl font-serif mb-8 text-emerald-950">Cara Melestarikan Mangrove</h3>
                 <ul className="space-y-8">
                    <li className="flex gap-6 items-center">
                       <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🚫</div>
                       <p className="text-slate-700 font-bold">Jangan Membuang Sampah Plastik ke Area Hutan Mangrove.</p>
                    </li>
                    <li className="flex gap-6 items-center">
                       <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">📸</div>
                       <p className="text-slate-700 font-bold">Hanya Berwisata Mengikuti Jalur Trekking yang Tersedia.</p>
                    </li>
                    <li className="flex gap-6 items-center">
                       <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🌱</div>
                       <p className="text-slate-700 font-bold">Dukung Program Pembibitan dan Penanaman Kembali (Reboisasi).</p>
                    </li>
                 </ul>
              </div>
           </div>
        </section>

        {/* Section 5: Aksi Nyata */}
        <section className="container mx-auto px-6 mb-40">
           <div className="bg-orange-600 rounded-[5rem] p-12 lg:p-24 text-white relative overflow-hidden shadow-3xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '30px 30px'}}></div>
              </div>
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
              
              <div className="relative z-10">
                 <div className="text-center mb-16">
                    <h3 className="text-4xl md:text-7xl font-serif mb-6 leading-tight">Aksi Nyata <br/><span className="italic">Dimulai Dari Anda</span></h3>
                    <p className="text-orange-50 text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-medium">
                       Jadilah bagian dari relawan penjaga pesisir. Berbagai langkah kecil yang Anda lakukan hari ini akan menjadi benteng kokoh bagi masa depan Banaran.
                    </p>
                 </div>

                 {/* Participation Cards */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
                    {participationSteps.map((step, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] hover:bg-white/20 transition-all group">
                         <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{step.icon}</div>
                         <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                         <p className="text-sm text-orange-50/80 leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Closing Message / Pesan Lingkungan */}
        <section className="bg-slate-50 py-32 text-center border-t border-slate-100">
           <div className="container mx-auto px-6">
              <h4 className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mb-8">Pesan Lingkungan</h4>
              <div className="max-w-4xl mx-auto mb-12">
                 <p className="text-3xl md:text-5xl font-serif text-slate-800 leading-tight italic">
                    “Mangrove bukan hanya tanaman, <br className="hidden md:block" /> tapi benteng alami yang melindungi masa depan pesisir kita.”
                 </p>
              </div>
              <div className="w-24 h-1 bg-emerald-600 mx-auto mb-12"></div>
              <button 
                onClick={onBack}
                className="bg-emerald-900 text-white px-20 py-6 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-orange-600 transition-all shadow-2xl active:scale-95"
              >
                Kembali ke Beranda
              </button>
           </div>
        </section>
      </main>

      {/* Mini Footer */}
      <footer className="py-12 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
        • Konservasi & Edukasi Mangrove Wanatirta <br></br> 22523258 <br></br> &copy; 2026 KKN UII Unit 70 Bleberan
      </footer>
    </div>
  );
};

export default MangroveDetailView;
