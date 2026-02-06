
import React, { useEffect, useState } from 'react';
import { db, MigratoryBird } from '../services/db';

const BirdMigration: React.FC = () => {
  const [birds, setBirds] = useState<MigratoryBird[]>([]);

  useEffect(() => {
    // Fix: db.getBirds is asynchronous and returns a Promise<MigratoryBird[]>.
    const fetchBirds = async () => {
      const birdData = await db.getBirds();
      setBirds(birdData);
    };
    fetchBirds();
  }, []);

  const conservationTips = [
    {
      title: 'Jaga Jarak Aman',
      icon: '🔭',
      desc: 'Gunakan binokular atau lensa tele. Jangan mendekat lebih dari 30 meter agar burung tidak merasa terancam.'
    },
    {
      title: 'Bebaskan Plastik',
      icon: '♻️',
      desc: 'Sampah mikroplastik di muara sering tertelan oleh burung migran yang sedang mencari makan di lumpur.'
    },
    {
      title: 'Jangan Beri Makan',
      icon: '🚫',
      desc: 'Biarkan burung mencari pakan alami di muara. Makanan manusia dapat mengganggu sistem pencernaan mereka.'
    },
    {
      title: 'Senyap & Tenang',
      icon: '🤫',
      desc: 'Hindari suara keras atau gerakan tiba-tiba yang dapat membuat seluruh koloni terbang serentak karena stres.'
    }
  ];

  return (
    <section id="burung" className="py-24 bg-sky-50 scroll-mt-24 overflow-hidden" aria-labelledby="bird-title">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
          <div className="lg:w-2/3 mx-auto text-center">
              <span className="bg-sky-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block shadow-lg shadow-sky-200">
                Kawasan Ekosistem Esensial (KEE)
              </span>

              <h2 id="bird-title" className="text-4xl md:text-7xl font-serif text-slate-900 leading-none mb-8">
                Saksi Bisu <br/>
                <span className="text-sky-700 italic">Lintas Benua</span>
              </h2>

              <p className="text-slate-700 text-xl leading-relaxed max-w-2xl font-medium mx-auto">
                Dusun Banaran dan Muara Trisik adalah jalur singgah (stopover) krusial bagi ribuan burung dari belahan bumi utara sebelum melanjutkan perjalanan ke Australia dan Selandia Baru.
              </p>
          </div>

          <div className="hidden lg:block">
            <div className="w-32 h-32 border-2 border-sky-200 rounded-full flex items-center justify-center animate-spin-slow">
               <svg className="w-20 h-20 text-sky-400 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.47c-.31.17-.69.17-1 0l-7.97-4.47c-.32-.17-.53-.5-.53-.88v-9c0-.38.21-.71.53-.88l7.97-4.47c.31-.17.69-.17 1 0l7.97 4.47c.32.17.53.5.53.88v9z"/>
               </svg>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {birds.map((bird, idx) => (
            <div key={idx} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-sky-900/5 border border-sky-100 hover:border-sky-400 transition-all duration-700 hover:-translate-y-4">
              <div className="h-64 overflow-hidden relative">
                <img src={bird.image} alt={bird.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {bird.status && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-sky-900 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">
                      {bird.status}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-8">
                <h4 className="text-xl font-bold text-slate-900 mb-1">{bird.name}</h4>
                <p className="text-sky-600 text-[10px] italic font-black uppercase tracking-widest mb-4">{bird.scientific}</p>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 font-medium">{bird.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Conservation Tips Section */}
        <div className="bg-sky-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-3xl">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h3 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">Cara Melindungi <br/>Sahabat Langit Kita</h3>
              <p className="text-sky-200/80 text-lg">Kehadiran burung-burung ini adalah bukti bahwa Banaran masih menjadi rumah yang aman. Mari kita jaga bersama dengan langkah nyata.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {conservationTips.map((tip, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:bg-white group-hover:text-sky-900 transition-all duration-500 shadow-xl">
                    {tip.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{tip.title}</h4>
                  <p className="text-sky-100/60 text-sm leading-relaxed font-medium">{tip.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center font-black animate-pulse shadow-lg shadow-sky-500/50">i</div>
                  <p className="text-sky-200 text-sm font-bold uppercase tracking-wider">Lapor jika melihat aktivitas perburuan liar!</p>
               </div>
               <button className="bg-sky-400 hover:bg-white text-sky-950 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl">
                 Kontak Pokdarwis Konservasi
               </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BirdMigration;
