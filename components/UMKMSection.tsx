
import React from 'react';
import { UMKM } from '../types';

interface UMKMSectionProps {
  umkmList: UMKM[];
  onNavigateDetail: (id: string) => void;
}

const UMKMSection: React.FC<UMKMSectionProps> = ({ umkmList, onNavigateDetail }) => {
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
              <div 
                className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer"
                onClick={() => onNavigateDetail(item.id)}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-2xl font-bold text-white">{item.name}</h4>
                    <span className="bg-red-500 backdrop-blur-md px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/10">Produk Lokal</span>
                  </div>
                  <p className="text-emerald-50 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-white/30 pt-6">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-emerald-300 uppercase tracking-widest mb-1">Rentang Harga</span>
                      <span className="text-orange-300 font-black tracking-tighter text-lg">{item.priceRange}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateDetail(item.id);
                      }}
                      className="bg-white text-emerald-950 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-xl active:scale-95"
                    >
                      Lihat Detail
                    </button>
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
