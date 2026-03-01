
import React, { useState } from 'react';
import { CommunityActivity } from '../types';

interface ActivityDetailViewProps {
  data: CommunityActivity;
  onBack: () => void;
}

const ActivityDetailView: React.FC<ActivityDetailViewProps> = ({ data, onBack }) => {
  const [activeImage, setActiveImage] = useState(data.imageUrl);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-[70vh] overflow-hidden">
        <img 
          src={activeImage} 
          className="w-full h-full object-cover"
          alt={data.title}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white"></div>
        
        <div className="absolute top-10 left-10 z-20">
          <button 
            onClick={onBack}
            className="bg-white/20 backdrop-blur-xl border border-white/30 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all"
          >
            ← Kembali
          </button>
        </div>

        <div className="absolute bottom-20 left-0 w-full z-10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <p className="text-emerald-400 font-black text-xs uppercase tracking-[0.4em] mb-4">Kegiatan Masyarakat</p>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight mb-6">
                {data.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl">🤝</div>
                <p className="text-slate-700 font-bold text-lg">{data.date || 'Kegiatan Rutin Dusun Bleberan'}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7">
            <div className="prose prose-slate max-w-none">
              <h3 className="text-3xl font-serif font-bold text-slate-900 mb-8">Tentang Kegiatan</h3>
              <p className="text-slate-600 text-xl leading-relaxed font-medium mb-10">
                {data.description}
              </p>
            </div>

            {/* Visual Gallery */}
            <div className="mt-20">
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-10 flex items-center gap-4">
                Galeri Visual <span className="h-[1px] flex-1 bg-slate-100"></span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[data.imageUrl, ...(data.galleryImages || [])].map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${activeImage === img ? 'ring-4 ring-emerald-500 ring-offset-4 scale-95' : 'hover:scale-105 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-slate-50 rounded-[3rem] p-12 sticky top-10">
              <h4 className="text-xl font-bold text-slate-900 mb-8">Informasi Dusun</h4>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl shrink-0">📍</div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Lokasi</p>
                    <p className="text-slate-900 font-bold">Dusun Bleberan, Banaran</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl shrink-0">👥</div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Partisipan</p>
                    <p className="text-slate-900 font-bold">Warga Lokal & Pengunjung</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl shrink-0">✨</div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tujuan</p>
                    <p className="text-slate-900 font-bold">Pelestarian Budaya & Lingkungan</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-slate-200">
                <p className="text-slate-500 text-sm italic leading-relaxed">
                  "Kebersamaan adalah kekuatan utama kami dalam menjaga kelestarian alam dan tradisi di Dusun Bleberan."
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-slate-900 py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-8">Ingin Tahu Lebih Banyak?</h2>
          <button 
            onClick={onBack}
            className="bg-emerald-600 text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-950"
          >
            Kembali ke Beranda
          </button>
        </div>
      </section>
    </div>
  );
};

export default ActivityDetailView;
