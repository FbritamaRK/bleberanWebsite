
import React from 'react';
import { AttractionDetail } from '../types';

interface AttractionsProps {
  onNavigateDetail: (id: string) => void;
  attractionsList?: AttractionDetail[];
}

const Attractions: React.FC<AttractionsProps> = ({ onNavigateDetail, attractionsList }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Ekowisata': return 'bg-emerald-600 shadow-emerald-200';
      case 'Petualangan': return 'bg-sky-600 shadow-sky-200';
      case 'Rekreasi': return 'bg-orange-600 shadow-orange-200';
      default: return 'bg-slate-600';
    }
  };

  return (
    <section id="wisata" className="py-24 bg-slate-50 scroll-mt-24" aria-labelledby="wisata-title">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 mx-auto text-center">
          <h2 id="wisata-title" className="text-orange-900 font-bold tracking-widest uppercase text-sm mb-3">Eksplorasi Destinasi</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
            Pengalaman Tak Terlupakan di <span className="text-emerald-700">Dusun Banaran</span>
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {(attractionsList || []).map((attr) => (
            <article key={attr.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={attr.imageUrl} 
                  alt={attr.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className={`${getCategoryColor(attr.category)} text-white px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg`}>
                    {attr.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-4">
                  <h4 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">{attr.title}</h4>
                  <p className="text-orange-800 text-[10px] font-black tracking-widest uppercase">{attr.tagline}</p>
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-6 text-sm line-clamp-3 font-medium">
                  {attr.description}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Informasi Biaya</span>
                    <span className="text-emerald-950 font-black text-sm">{attr.price}</span>
                  </div>
                  <button 
                    onClick={() => onNavigateDetail(attr.id)}
                    className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-emerald-700 transition-all shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Attractions;
