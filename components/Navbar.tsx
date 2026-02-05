
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Destinasi', href: '#wisata' },
    { name: 'Edukasi', href: '#edukasi' },
    { name: 'UMKM', href: '#umkm' },
    { name: 'Lokasi', href: '#lokasi' }
  ];

  return (
    <nav 
      aria-label="Navigasi Utama"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] py-4 border-b border-slate-100' 
        : 'bg-transparent py-10'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button 
          aria-label="Kembali ke atas"
          className="flex items-center space-x-4 cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-4 rounded-xl" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
         <div className="w-14 h-14 bg-emerald-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-[15deg] transition-all duration-500 overflow-hidden">
            <img 
              src="logo/bleberan.png" 
              alt="Logo Desa Banaran"
              className="w-full h-full object-contain"
            />
        </div>

          <div className="flex flex-col items-start">
            <span className={`text-2xl font-black tracking-tighter leading-none transition-colors duration-500 ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              Pesona Banaran
            </span>
            <span className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-500 ${isScrolled ? 'text-emerald-600' : 'text-orange-400'}`}>
              Dusun Bleberan
            </span>
          </div>
        </button>
        
        <div className="hidden lg:flex space-x-12 items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all relative group focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-4 rounded-md p-1 ${
                isScrolled ? 'text-slate-600 hover:text-emerald-700' : 'text-white/80 hover:text-white'
              }`}
            >
              {item.name}
              <span className={`absolute -bottom-2 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full ${isScrolled ? 'bg-emerald-700' : 'bg-orange-500'}`}></span>
            </a>
          ))}
          
          <a 
            href="#lokasi"
            className={`ml-6 px-10 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all transform hover:scale-105 active:scale-95 shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-4 ${
              isScrolled 
              ? 'bg-emerald-700 text-white shadow-emerald-900/20' 
              : 'bg-white text-emerald-950 shadow-white/10 hover:bg-orange-500 hover:text-white'
            }`}
          >
            Kunjungi Sekarang
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
