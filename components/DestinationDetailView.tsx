
import React, { useEffect, useRef, useState } from 'react';
import { AttractionDetail } from '../types';
import { db } from '../services/db';

interface DestinationDetailViewProps {
  data: AttractionDetail;
  onBack: () => void;
}

const DestinationDetailView: React.FC<DestinationDetailViewProps> = ({ data, onBack }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [whatsappNumber, setWhatsappNumber] = useState('6281234567890');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fix: db.getContact is asynchronous and returns a Promise<ContactConfig>.
    const fetchContact = async () => {
      const contactData = await db.getContact();
      setWhatsappNumber(contactData.whatsappNumber);
    };
    fetchContact();
  }, []);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navigation Header */}
      <nav 
        aria-label="Breadcrumb"
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 py-4 shadow-sm"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-emerald-900 font-black hover:text-orange-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-2 rounded-lg px-2 py-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Kembali ke Beranda</span>
          </button>
          <div className="hidden md:block">
             <span className="text-xs font-black tracking-[0.3em] uppercase text-slate-700">Eksplorasi / <span className="text-emerald-700">{data.title}</span></span>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-32">
        {/* Hero Image Section */}
        <div className="container mx-auto px-6 mb-16">
          <div className="relative h-[60vh] rounded-[3rem] overflow-hidden shadow-2xl group">
            <img src={data.imageUrl} alt={`Pemandangan utama ${data.title}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="bg-orange-800 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block shadow-lg">
                    {data.category}
                  </span>
                  <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tighter shadow-sm">{data.title}</h1>
                  <p className="text-xl md:text-2xl text-white font-light italic mt-4">{data.tagline}</p>
                </div>
                <div className="flex gap-3">
                  <div className="bg-emerald-800/90 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white shadow-xl">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-orange-200">Waktu Terbaik</p>
                    <p className="font-bold">{data.bestTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Gallery Section */}
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Main Content Area */}
            <div className="lg:w-2/3">
              <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif text-emerald-900 mb-8 flex items-center">
                  <span className="w-12 h-[3px] bg-orange-700 mr-4" aria-hidden="true"></span>
                  Narasi Destinasi
                </h2>
                <div className="text-slate-800 leading-relaxed space-y-8 text-xl font-normal">
                  <p>{data.fullDescription}</p>
                </div>
              </section>

              {/* Highlight Gallery Carousel */}
              <section className="mb-20" aria-labelledby="gallery-title">
                <div className="flex items-center justify-between mb-8">
                  <h2 id="gallery-title" className="text-3xl font-serif text-emerald-900">Galeri Visual</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => scrollGallery('left')}
                      aria-label="Geser galeri ke kiri"
                      className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-emerald-700 hover:text-white transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => scrollGallery('right')}
                      aria-label="Geser galeri ke kanan"
                      className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-emerald-700 hover:text-white transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div 
                  ref={scrollContainerRef}
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {data.galleryImages.map((img, i) => (
                    <div key={i} className="min-w-[80%] md:min-w-[60%] lg:min-w-[45%] h-[400px] snap-center">
                      <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden group shadow-lg">
                        <img 
                          src={img} 
                          alt={`Highlight spot ${i+1} di ${data.title}`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Features & Tips Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 group hover:border-emerald-400 transition-all">
                    <h3 className="text-2xl font-serif text-emerald-900 mb-6 flex items-center">
                      <div className="w-10 h-10 bg-emerald-700 text-white rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:rotate-6 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Fasilitas Unggul
                    </h3>
                    <ul className="space-y-4">
                      {data.features.map((f, i) => (
                        <li key={i} className="flex items-center text-slate-800 font-bold">
                          <span className="w-2.5 h-2.5 bg-orange-700 rounded-full mr-4" aria-hidden="true"></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                 </section>
                 <section className="bg-orange-50 p-10 rounded-[2.5rem] border border-orange-200 group hover:border-orange-400 transition-all">
                    <h3 className="text-2xl font-serif text-orange-950 mb-6 flex items-center">
                      <div className="w-10 h-10 bg-orange-800 text-white rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:-rotate-6 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      Saran Pengunjung
                    </h3>
                    <ul className="space-y-4">
                      {data.tips.map((t, i) => (
                        <li key={i} className="flex items-start text-orange-950 font-bold text-sm leading-relaxed">
                          <span className="mr-3 text-orange-800 font-black" aria-hidden="true">•</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                 </section>
              </div>
            </div>

            {/* Sidebar / Transactional Info */}
            <aside className="lg:w-1/3">
              <div className="sticky top-32 bg-white rounded-[3rem] shadow-2xl shadow-emerald-900/10 border border-slate-200 p-10 overflow-hidden relative">
                <div className="mb-10">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-700 block mb-3">Estimasi Biaya</span>
                  <div className="text-4xl font-black text-emerald-950 tracking-tighter">{data.price}</div>
                </div>
                
                <div className="space-y-8 mb-12">
                   <div className="flex items-start space-x-5">
                      <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-900 shrink-0 border-2 border-emerald-100">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-700 mb-1">Momen Terbaik</p>
                        <p className="font-black text-slate-900 leading-tight text-lg">{data.bestTime}</p>
                      </div>
                   </div>
                   <div className="flex items-start space-x-5">
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-900 shrink-0 border-2 border-orange-200">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                         </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-700 mb-1">Hubungi Pokdarwis</p>
                        <p className="font-black text-slate-900 leading-tight text-lg">{whatsappNumber.startsWith('62') ? '+' + whatsappNumber : whatsappNumber}</p>
                      </div>
                   </div>
                </div>

                <a 
                  href={`https://wa.me/${whatsappNumber}?text=Halo,%20saya%20ingin%20bertanya%20mengenai%20destinasi%20${encodeURIComponent(data.title)}.`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Pesan tiket atau tanya informasi via WhatsApp"
                  className="w-full bg-emerald-950 text-white py-6 rounded-2xl font-black tracking-[0.2em] uppercase text-xs hover:bg-orange-800 transition-all shadow-xl shadow-emerald-900/30 active:scale-95 flex items-center justify-center group focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 focus-visible:outline-offset-4"
                >
                  Pesan via WhatsApp
                  <svg className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="bg-slate-100 py-20 border-t border-slate-200 text-center">
         <div className="container mx-auto px-6">
            <h4 className="text-emerald-950 font-serif text-3xl mb-4 italic tracking-tight">"Keasrian Dusun Bleberan Menanti Anda"</h4>
            <button 
              onClick={onBack} 
              className="text-orange-900 font-black uppercase tracking-widest text-sm hover:tracking-[0.2em] transition-all border-b-2 border-orange-900/20 pb-1"
            >
              Jelajahi Destinasi Lainnya
            </button>
         </div>
      </footer>
    </div>
  );
};

export default DestinationDetailView;
