
import React from 'react';

interface MangroveEducationProps {
  onExploreDetail?: () => void;
}

const MangroveEducation: React.FC<MangroveEducationProps> = ({ onExploreDetail }) => {
  const facts = [
    {
      title: 'Pahlawan Karbon',
      icon: '🌿',
      color: 'bg-emerald-100 text-emerald-700',
      fact: 'Taukah Kamu?',
      desc: 'Hutan mangrove mampu menyerap karbon 4x lebih banyak daripada hutan hujan tropis biasa. Banaran adalah paru-paru dunia!',
    },
    {
      title: 'Benteng Alam',
      icon: '🛡️',
      color: 'bg-sky-100 text-sky-700',
      fact: 'Pelindung Desa',
      desc: 'Akar mangrove yang rapat meredam hantaman gelombang tsunami dan mencegah abrasi daratan desa kita secara alami.',
    },
    {
      title: 'Apartemen Ikan',
      icon: '🐟',
      color: 'bg-amber-100 text-amber-700',
      fact: 'Rumah Biota',
      desc: 'Akar mangrove adalah tempat sembunyi favorit bagi bayi ikan, kepiting, dan udang sebelum mereka cukup besar untuk ke laut lepas.',
    }
  ];

  return (
    <section id="edukasi" className="py-24 bg-white scroll-mt-24" aria-labelledby="edukasi-title">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block shadow-lg shadow-emerald-200">
            Digital Literacy & Conservation
          </span>
          <h2 id="edukasi-title" className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight mb-6">
            Mengapa <span className="text-emerald-600 italic">Mangrove</span> Sangat Penting?
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Di Dusun Banaran, kita tidak hanya berwisata, tapi juga menjaga warisan alam untuk masa depan anak cucu kita.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {facts.map((item, idx) => (
            <div key={idx} className="group p-10 rounded-[3rem] border-2 border-slate-50 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 bg-slate-50/50">
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <p className="text-emerald-600 font-black text-xs uppercase tracking-widest mb-2">{item.fact}</p>
              <h4 className="text-2xl font-bold mb-4 text-slate-900">{item.title}</h4>
              <p className="text-slate-600 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-emerald-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-emerald-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          <div className="relative z-10 mb-8 md:mb-0">
            <h4 className="text-3xl font-serif mb-2">Pustaka Hijau Banaran</h4>
            <p className="text-emerald-100 opacity-80">Pelajari jenis-jenis mangrove dan cara melestarikannya lebih mendalam.</p>
          </div>
          <button 
            onClick={onExploreDetail}
            className="relative z-10 bg-white text-emerald-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-xl"
          >
            Pelajari Detail Mangrove
          </button>
        </div>
      </div>
    </section>
  );
};

export default MangroveEducation;
