
// import React, { useEffect, useState } from 'react';
// import { UMKM } from '../types';
// import { db } from '../services/db';

// const UMKMSection: React.FC = () => {
//   const [list, setList] = useState<UMKM[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const data = await db.getUMKM();
//       setList(data);
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   return (
//     <section id="umkm" className="py-24 bg-white scroll-mt-24" aria-labelledby="umkm-title">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-20">
//           <h2 id="umkm-title" className="text-orange-900 font-black tracking-[0.3em] uppercase text-xs mb-4">Cita Rasa Lokal</h2>
//           <h3 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">Buah Tangan dari <span className="text-emerald-600">Tangan Kreatif</span></h3>
//         </div>
        
//         {loading ? (
//           <div className="text-center py-20">
//              <p className="text-slate-400 text-xs font-black uppercase animate-pulse">Menghubungkan ke Toko...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
//             {list.map((item) => (
//               <article key={item.id} className="group relative">
//                 <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl">
//                   <img 
//                     src={item.imageUrl} 
//                     alt={item.name} 
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent"></div>
                  
//                   <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                     <h4 className="text-2xl font-bold mb-2 text-white">{item.name}</h4>
//                     <p className="text-emerald-50 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
//                       {item.description}
//                     </p>
//                     <div className="flex items-center justify-between border-t border-white/30 pt-6">
//                       <span className="text-orange-300 font-black tracking-tighter text-lg">{item.priceRange}</span>
//                       <a 
//                         href={`https://wa.me/${item.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20produk%20UMKM%20${encodeURIComponent(item.name)}.`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-white text-emerald-950 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 hover:text-white transition-all shadow-md"
//                       >
//                         Hubungi Penjual
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default UMKMSection;



import React from 'react';
import { UMKM } from '../types';

interface UMKMSectionProps {
  umkmList: UMKM[];
}

const UMKMSection: React.FC<UMKMSectionProps> = ({ umkmList }) => {
  return (
    <section id="umkm" className="py-24 bg-white scroll-mt-24" aria-labelledby="umkm-title">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 id="umkm-title" className="text-orange-900 font-black tracking-[0.3em] uppercase text-xs mb-4">Cita Rasa Lokal</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">Buah Tangan dari <span className="text-emerald-600">Tangan Kreatif</span></h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {umkmList.map((item) => (
            <article key={item.id} className="group relative">
              <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h4 className="text-2xl font-bold mb-2 text-white">{item.name}</h4>
                  <p className="text-emerald-50 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-white/30 pt-6">
                    <span className="text-orange-300 font-black tracking-tighter text-lg">{item.priceRange}</span>
                    <a 
                      href={`https://wa.me/${item.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20produk%20UMKM%20${encodeURIComponent(item.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-emerald-950 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 hover:text-white transition-all shadow-md"
                    >
                      Hubungi Penjual
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UMKMSection;
