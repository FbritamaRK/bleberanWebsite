
import React, { useState } from 'react';
import { searchNearbyPlaces } from '../services/gemini';

const LocationSection: React.FC = () => {
  const [searchResult, setSearchResult] = useState<{ text: string; chunks: any[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [activeQuery, setActiveQuery] = useState('');

  const mapUrl = "https://maps.google.com/maps?q=Pendopo+Bleberan+Kalurahan+Banaran+Galur+Kulon+Progo&t=&z=15&ie=UTF8&iwloc=&output=embed";

  const handleSearch = async (category: string) => {
    setIsSearching(true);
    setActiveQuery(category);
    setSearchResult(null);

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const result = await searchNearbyPlaces(category, position.coords.latitude, position.coords.longitude);
          setSearchResult({ text: result.text || '', chunks: result.groundingChunks });
          setIsSearching(false);
        },
        async () => {
          const result = await searchNearbyPlaces(category);
          setSearchResult({ text: result.text || '', chunks: result.groundingChunks });
          setIsSearching(false);
        }
      );
    } catch (error) {
      console.error("Search Error:", error);
      setIsSearching(false);
    }
  };

  const categories = [
    { name: 'Kuliner', color: 'hover:bg-orange-500 hover:text-white border-orange-200' },
    { name: 'ATM', color: 'hover:bg-sky-500 hover:text-white border-sky-200' },
    { name: 'SPBU', color: 'hover:bg-emerald-500 hover:text-white border-emerald-200' },
    { name: 'Penginapan', color: 'hover:bg-indigo-500 hover:text-white border-indigo-200' }
  ];

  return (
    <section id="lokasi" className="py-24 bg-slate-100 scroll-mt-24" aria-labelledby="lokasi-title">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border-2 border-slate-200 p-8 md:p-16 mb-12">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <h2 id="lokasi-title" className="text-orange-900 font-black tracking-widest uppercase text-xs mb-4">Navigasi Perjalanan</h2>
              <h3 className="text-4xl md:text-6xl font-serif text-slate-900 mb-8 leading-tight">Temukan Jalan Ke <span className="text-emerald-800">Bleberan</span></h3>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-emerald-700 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-100">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-black text-emerald-950 uppercase text-xs tracking-widest mb-1">Alamat Dusun</h4>
                    <p className="text-slate-700 text-sm font-bold">Bleberan,Banaran, Galur, Kulon Progo, DIY 55661</p>
                  </div>
                </div>
              </div>
              
            <a 
               href="https://www.google.com/maps/search/?api=1&query=Pendopo+Bleberan+Kalurahan+Banaran+Galur+Kulon+Progo"
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center bg-emerald-900 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-orange-600 transition-all shadow-xl shadow-emerald-900/20"
            >
            Buka Google Maps
            </a>

            </div>
            
            <div className="lg:w-1/2 w-full h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-50 relative">
              <iframe 
                src={mapUrl}
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Peta lokasi Dusun Bleberan"
              ></iframe>
            </div>
          </div>
        </div>

        {searchResult && (
          <div className="bg-emerald-900 rounded-[3rem] p-12 text-white mb-12 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
             <p className="text-emerald-100 mb-8 italic text-lg leading-relaxed font-medium">"{searchResult.text}"</p>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResult.chunks.map((chunk: any, idx: number) => chunk.maps && (
                  <a key={idx} href={chunk.maps.uri} target="_blank" className="bg-white p-6 rounded-2xl flex justify-between items-center group hover:scale-105 transition-all shadow-lg">
                    <span className="text-slate-900 font-bold group-hover:text-emerald-700">{chunk.maps.title}</span>
                    <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                ))}
             </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-6">
           {categories.map(cat => (
             <button 
               key={cat.name}
               onClick={() => handleSearch(cat.name)}
               disabled={isSearching}
               className={`bg-white border-2 ${cat.color} px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all disabled:opacity-50 shadow-sm hover:shadow-xl hover:-translate-y-1`}
             >
               {isSearching && activeQuery === cat.name ? 'Mencari...' : `Cari ${cat.name}`}
             </button>
           ))}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
