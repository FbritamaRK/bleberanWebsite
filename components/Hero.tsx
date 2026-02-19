import React from 'react';
import { ReactTyped } from "react-typed";

const Hero: React.FC = () => {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Pendopo+Bleberan+Banaran+Kulon+Progo";

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-emerald-950 scroll-mt-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://cdn.download.ams.birds.cornell.edu/api/v2/asset/651137152/640" 
          alt="Hutan Mangrove Banaran" 
          className="w-full h-full object-bg brightness-[0.5] scale-0 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-transparent to-emerald-950/90"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8 animate-bounce-slow">
            <span className="bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl">
              Kawasan Ekosistem Esensial
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 leading-[0.9] tracking-tighter">
            Gerbang <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-300 italic">Alam Selatan</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-emerald-50/80 mb-12 leading-relaxed max-w-2xl font-medium">   
            <ReactTyped strings={["Temukan harmoni antara pelestarian mangrove dan keajaiban muara sungai di permata tersembunyi Kulon Progo."]} typeSpeed={100} loop />
          </p>
         
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md mx-auto">
            <a href="#wisata" className="group relative px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:bg-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <span className="relative z-10 flex items-center justify-center">
                Mulai Eksplorasi
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </a>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center">
              Petunjuk Jalan
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default Hero;
