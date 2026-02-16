
// import React, { useEffect, useState } from 'react';
// import { db, MigratoryBird } from '../services/db';

// const BirdMigration: React.FC = () => {
//   const [birds, setBirds] = useState<MigratoryBird[]>([]);
//   const [selectedBird, setSelectedBird] = useState<MigratoryBird | null>(null);

//   useEffect(() => {
//     const fetchBirds = async () => {
//       const birdData = await db.getBirds();
//       setBirds(birdData);
//     };
//     fetchBirds();
//   }, []);

//   // Icon SVG untuk Tips Konservasi
//   const conservationTips = [
//     {
//       title: 'Jaga Jarak Aman',
//       icon: (
//         <svg className="w-8 h-8" fill="blue" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//         </svg>
//       ),
//       desc: 'Gunakan binokular atau lensa tele. Jangan mendekat lebih dari 30 meter agar burung tidak merasa terancam.'
//     },
//     {
//       title: 'Bebaskan Plastik',
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//         </svg>
//       ),
//       desc: 'Sampah mikroplastik di muara sering tertelan oleh burung migran yang sedang mencari makan di lumpur.'
//     },
//     {
//       title: 'Jangan Beri Makan',
//       icon: (
//         <svg className="w-8 h-8" fill="red" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728A9 9 0 015.636 5.636" />
//         </svg>
//       ),
//       desc: 'Biarkan burung mencari pakan alami di muara. Makanan manusia dapat mengganggu sistem pencernaan mereka.'
//     },
//     {
//       title: 'Senyap & Tenang',
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
//         </svg>
//       ),
//       desc: 'Hindari suara keras atau gerakan tiba-tiba yang dapat membuat seluruh koloni terbang serentak karena stres.'
//     }
//   ];

//   return (
//     <section id="burung" className="py-24 bg-sky-50 scroll-mt-24 overflow-hidden" aria-labelledby="bird-title">
//       <div className="container mx-auto px-6">
//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
//           <div className="lg:w-2/3">
//             <span className="bg-sky-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block shadow-lg shadow-sky-200">
//               Kawasan Ekosistem Esensial (KEE)
//             </span>
//             <h2 id="bird-title" className="text-4xl md:text-7xl font-serif text-slate-900 leading-none mb-8">
//               Saksi Bisu <br/>
//               <span className="text-sky-700 italic">Lintas Benua</span>
//             </h2>
//             <p className="text-slate-700 text-xl leading-relaxed max-w-2xl font-medium">
//               Dusun Banaran dan Muara Trisik adalah jalur singgah (stopover) krusial bagi ribuan burung dari belahan bumi utara sebelum melanjutkan perjalanan ke Australia.
//             </p>
//           </div>
//           <div className="hidden lg:block">
//             <div className="w-32 h-32 border-2 border-sky-200 rounded-full flex items-center justify-center animate-spin-slow">
//                <svg className="w-20 h-20 text-sky-400 opacity-30" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.47c-.31.17-.69.17-1 0l-7.97-4.47c-.32-.17-.53-.5-.53-.88v-9c0-.38.21-.71.53-.88l7.97-4.47c.31-.17.69-.17 1 0l7.97 4.47c.32.17.53.5.53.88v9z"/>
//                </svg>
//             </div>
//           </div>
//         </div>

//         {/* Gallery Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
//           {birds.map((bird, idx) => (
//             <div 
//               key={idx} 
//               onClick={() => setSelectedBird(bird)}
//               className="group bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-sky-900/5 border border-sky-100 hover:border-sky-400 transition-all duration-700 hover:-translate-y-4 cursor-pointer"
//             >
//               <div className="h-64 overflow-hidden relative">
//                 <img src={bird.image} alt={bird.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//                 {bird.status && (
//                   <div className="absolute bottom-4 left-4">
//                     <span className="bg-white/90 backdrop-blur-md text-sky-900 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">
//                       {bird.status}
//                     </span>
//                   </div>
//                 )}
//               </div>
//               <div className="p-8">
//                 <h4 className="text-xl font-bold text-slate-900 mb-1">{bird.name}</h4>
//                 <p className="text-sky-600 text-[10px] italic font-black uppercase tracking-widest mb-4">{bird.scientific}</p>
//                 <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 font-medium mb-6">{bird.desc}</p>
//                 <button className="text-sky-700 text-[10px] font-black uppercase tracking-widest border-b-2 border-sky-200 group-hover:border-sky-700 transition-all pb-1">
//                   Lihat Detail Deskripsi &rarr;
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Conservation Tips Section */}
//         <div className="bg-sky-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-3xl">
//           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
          
//           <div className="relative z-10">
//             <div className="text-center max-w-3xl mx-auto mb-20">
//               <h3 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">Cara Melindungi <br/>Sahabat Langit Kita</h3>
//               <p className="text-sky-200/80 text-lg">Kehadiran burung-burung ini adalah bukti bahwa Banaran masih menjadi rumah yang aman. Mari kita jaga bersama dengan langkah nyata.</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//               {conservationTips.map((tip, i) => (
//                 <div key={i} className="flex flex-col items-center text-center group">
//                   <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-sky-900 transition-all duration-500 shadow-xl">
//                     {tip.icon}
//                   </div>
//                   <h4 className="text-xl font-bold mb-3">{tip.title}</h4>
//                   <p className="text-sky-100/60 text-sm leading-relaxed font-medium">{tip.desc}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-20 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
//                <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center font-black animate-pulse shadow-lg shadow-sky-500/50">
//                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <p className="text-white-200 text-sm font-bold uppercase tracking-wider">Lapor jika melihat aktivitas perburuan liar!</p>
//                </div>
//                <button className="bg-sky-400 hover:bg-white text-sky-950 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl">
//                  Kontak Pokdarwis Konservasi
//                </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bird Detail Modal - Text Focus Layout */}
//       {selectedBird && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
//           <div 
//             className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
//             onClick={() => setSelectedBird(null)}
//           ></div>
          
//           <div className="bg-white w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh] border border-white/20">
//             {/* Modal Content - Focused on Description */}
//             <div className="w-full p-10 md:p-16 overflow-y-auto flex flex-col bg-white relative">
//               {/* Close Button Inside */}
//               <button 
//                 onClick={() => setSelectedBird(null)}
//                 className="absolute top-8 right-8 w-10 h-10 bg-slate-100 hover:bg-rose-100 hover:text-rose-600 rounded-full flex items-center justify-center transition-all text-slate-400 shadow-sm"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>

//               <div className="mb-10">
//                 <div className="flex items-center mb-6">
//                   <span className="bg-sky-100 text-sky-900 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
//                     {selectedBird.status || 'Biodiversitas Banaran'}
//                   </span>
//                 </div>
//                 <h3 className="text-4xl md:text-5xl font-serif text-slate-900 mb-3 leading-tight">{selectedBird.name}</h3>
//                 <p className="text-sky-600 text-lg italic font-bold tracking-wide">{selectedBird.scientific}</p>
//               </div>

//               <div className="flex-1">
//                 <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Deskripsi Lengkap Burung</h5>
//                 <p className="text-slate-700 text-xl leading-relaxed font-medium">
//                   {selectedBird.desc}
//                 </p>
//               </div>

//               <div className="mt-12 pt-10 border-t border-slate-100 flex items-center gap-5">
//                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
//                     <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
//                  </div>
//                  <div>
//                    <p className="text-[10px] font-black uppercase tracking-wider leading-relaxed text-slate-900">
//                      Kawasan Ekosistem Esensial Banaran
//                    </p>
//                    <p className="text-[9px] text-slate-400 font-medium">Data hasil dokumentasi pengamat burung yang dikumpulkan melalui website eBird oleh Tim KKN untuk upaya konservasi habitat pesisir berkelanjutan.</p>
//                  </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-spin-slow {
//           animation: spin-slow 12s linear infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default BirdMigration;




import React, { useState } from 'react';
import { MigratoryBird } from '../services/db';

interface BirdMigrationProps {
  birdList: MigratoryBird[];
}

const BirdMigration: React.FC<BirdMigrationProps> = ({ birdList }) => {
  const [selectedBird, setSelectedBird] = useState<MigratoryBird | null>(null);

  return (
    <section id="burung" className="py-24 bg-sky-50 scroll-mt-24" aria-labelledby="bird-title">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <span className="bg-sky-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Kawasan Ekosistem Esensial</span>
          <h2 id="bird-title" className="text-4xl md:text-7xl font-serif text-slate-900 leading-none">Saksi Bisu <span className="text-sky-700 italic">Lintas Benua</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {birdList.map((bird) => (
            <div key={bird.id} onClick={() => setSelectedBird(bird)} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-sky-100 hover:-translate-y-4 transition-all duration-500 cursor-pointer flex flex-col h-full">
              <div className="h-64 overflow-hidden relative">
                <img src={bird.imageUrl} alt={bird.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
                  {bird.status?.split(' | ').map((s, i) => (
                    <span key={i} className="bg-white/90 backdrop-blur-md text-sky-900 px-2 py-0.5 rounded-md text-[8px] font-black uppercase">{s}</span>
                  ))}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h4 className="text-xl font-bold mb-1">{bird.name}</h4>
                <p className="text-sky-600 text-[10px] italic font-black uppercase mb-4">{bird.scientific}</p>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">{bird.description}</p>
                <button className="text-sky-700 text-[10px] font-black uppercase border-b-2 border-sky-100 self-start">Detail Burung &rarr;</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBird && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl" onClick={() => setSelectedBird(null)}></div>
          <div className="bg-white w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl relative z-10 p-10">
            <button onClick={() => setSelectedBird(null)} className="absolute top-8 right-8">❌</button>
            <h3 className="text-4xl font-serif text-slate-900 mb-2">{selectedBird.name}</h3>
            <p className="text-sky-600 italic font-bold mb-6">{selectedBird.scientific}</p>
            <p className="text-slate-700 text-lg leading-relaxed">{selectedBird.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BirdMigration;

