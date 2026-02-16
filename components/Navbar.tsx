
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onAdminAccess: () => void;
  logoUrl?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminAccess, logoUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    const timer = setTimeout(() => setClickCount(0), 1000);
    if (newCount >= 3) {
      clearTimeout(timer);
      onAdminAccess();
      setClickCount(0);
    }
  };

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
        <div className="flex items-center space-x-4">
          <button 
            aria-label="Admin Pintu Rahasia"
            onClick={handleLogoClick}
            className="w-14 h-14 bg-emerald-700 rounded-2xl flex items-center justify-center text-white overflow-hidden shadow-xl hover:rotate-[15deg] transition-all duration-500 active:scale-90"
          >
            {logoUrl ? (
              <img src={logoUrl} className="w-full h-full object-contain p-2 bg-white" alt="Logo" />
            ) : (
              <span className="font-black text-2xl">B</span>
            )}
          </button>
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="flex flex-col items-start focus-visible:outline rounded-xl"
          >
            <span className={`text-2xl font-black tracking-tighter leading-none transition-colors duration-500 ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              Pesona Banaran
            </span>
            <span className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-500 ${isScrolled ? 'text-emerald-600' : 'text-orange-400'}`}>
              Dusun Bleberan
            </span>
          </button>
        </div>
        
        <div className="hidden lg:flex space-x-12 items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all relative group rounded-md p-1 ${
                isScrolled ? 'text-slate-600 hover:text-emerald-700' : 'text-white/80 hover:text-white'
              }`}
            >
              {item.name}
              <span className={`absolute -bottom-2 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full ${isScrolled ? 'bg-emerald-700' : 'bg-orange-500'}`}></span>
            </a>
          ))}
          
          <a 
            href="#lokasi"
            className={`ml-6 px-10 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all transform hover:scale-105 active:scale-95 shadow-2xl ${
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
