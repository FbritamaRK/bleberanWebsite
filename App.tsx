
// import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import Attractions from './components/Attractions';
// import UMKMSection from './components/UMKM';
// import LocationSection from './components/LocationSection';
// import DestinationDetailView from './components/DestinationDetailView';
// import MangroveEducation from './components/MangroveEducation';
// import MangroveDetailView from './components/MangroveDetailView';
// import BirdMigration from './components/BirdMigration';
// import AdminDashboard from './components/AdminDashboard';
// import Login from './components/Login';
// import { db } from './services/db';
// import { AttractionDetail } from './types';

// export default function App() {
//   const [view, setView] = useState<'home' | 'detail' | 'admin' | 'login' | 'mangrove-detail'>('home');
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [attractions, setAttractions] = useState<AttractionDetail[]>([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true);
//       const data = await db.getAttractions();
//       setAttractions(data);
//       setIsLoading(false);
//     };
    
//     loadData();
    
//     const auth = sessionStorage.getItem('admin_auth') === 'true';
//     setIsAuthenticated(auth);

//     const params = new URLSearchParams(window.location.search);
//     if (params.get('admin') === 'true') {
//       setView(auth ? 'admin' : 'login');
//     }
//   }, []);

//   const handleNavigateDetail = (id: string) => {
//     setSelectedId(id);
//     setView('detail');
//   };

//   const handleBackHome = async () => {
//     setView('home');
//     setSelectedId(null);
//     const data = await db.getAttractions();
//     setAttractions(data);
//     window.scrollTo(0, 0);
//   };

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//     setView('admin');
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem('admin_auth');
//     setIsAuthenticated(false);
//     setView('home');
//   };

//   if (view === 'login') {
//     return <Login onLogin={handleLoginSuccess} onBack={handleBackHome} />;
//   }

//   if (view === 'admin') {
//     if (!isAuthenticated) return <Login onLogin={handleLoginSuccess} onBack={handleBackHome} />;
//     return <AdminDashboard onBack={handleBackHome} onLogout={handleLogout} />;
//   }

//   if (view === 'detail' && selectedId) {
//     const selectedData = attractions.find(a => a.id === selectedId);
//     if (selectedData) {
//       return <DestinationDetailView data={selectedData} onBack={handleBackHome} />;
//     }
//   }

//   if (view === 'mangrove-detail') {
//     return <MangroveDetailView onBack={handleBackHome} />;
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
//       <Navbar />
//       <Hero />
      
//       {/* Stats Section */}
//       <aside aria-label="Statistik Dusun" className="bg-white py-20 overflow-hidden scroll-mt-24 border-b border-slate-100">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
//             {[
//               { label: 'Area Konservasi', val: '12', sub: 'Hektar Mangrove', color: 'bg-emerald-500 shadow-emerald-200' },
//               { label: 'Armada Kapal', val: '10', sub: 'Wisata Air', color: 'bg-sky-500 shadow-sky-200' },
//               { label: 'Pengusaha Lokal', val: '10+', sub: 'UMKM Terdaftar', color: 'bg-orange-500 shadow-orange-200' },
//               { label: 'Spesies Burung', val: '100+', sub: 'Kawasan KEE', color: 'bg-indigo-500 shadow-indigo-200' }
//             ].map((s, i) => (
//               <div key={i} className="flex flex-col items-center text-center">
//                 <div className={`w-20 h-20 ${s.color} rounded-[2rem] flex items-center justify-center text-white font-black text-3xl shadow-xl mb-6 hover:rotate-6 transition-transform`}>
//                   {s.val}
//                 </div>
//                 <div>
//                   <div className="text-slate-900 font-black text-sm leading-none mb-1 uppercase tracking-tight">{s.label}</div>
//                   <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{s.sub}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </aside>

//       {isLoading ? (
//         <div className="py-24 text-center">
//           <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Memuat Data Banaran...</p>
//         </div>
//       ) : (
//         <Attractions attractionsList={attractions} onNavigateDetail={handleNavigateDetail} />
//       )}
      
//       <UMKMSection />
//       <BirdMigration />
//       <MangroveEducation onExploreDetail={() => setView('mangrove-detail')} />
//       <LocationSection />

//       <footer id="kontak" className="bg-slate-900 text-white py-24 relative overflow-hidden scroll-mt-24">
//   <div className="container mx-auto px-6 relative z-10">
//     <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20 pb-20 border-b border-white/10">
//       <div className="lg:col-span-2">
//         <div 
//           className="flex items-center space-x-4 mb-8 cursor-pointer"
//           onDoubleClick={() => setView(isAuthenticated ? 'admin' : 'login')}
//         >
//           <div className="w-14 h-14 bg-emerald-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-[15deg] transition-all duration-500 overflow-hidden">
//             <img 
//               src="logo/bleberan.png" 
//               alt="Logo Dusun Bleberan"
//               className="w-full h-full object-contain"
//             />
//           </div>

//           <div>
//             <h5 className="text-3xl font-serif font-bold tracking-tight">Dusun Bleberan</h5>
//             <p className="text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase">
//               Kawasan Ekosistem Esensial
//             </p>
//           </div>
//         </div>

//         <p className="text-slate-400 max-w-md mb-10 text-lg leading-relaxed font-medium">
//           Menjaga kekayaan hayati Kulon Progo melalui pelestarian mangrove dan perlindungan habitat burung migran.
//         </p>
//       </div>
    
//       <nav aria-label="Tautan Penting">
//         <h5 className="font-black text-xs tracking-[0.3em] uppercase text-emerald-400 mb-8">Eksplorasi</h5>
//         <ul className="space-y-4 text-slate-300 text-sm font-bold">
//           <li><a href="#home" className="hover:text-white transition-colors">Beranda Utama</a></li>
//           <li><a href="#wisata" className="hover:text-white transition-colors">Destinasi Alam</a></li>
//           <li><a href="#burung" className="hover:text-white transition-colors">Burung Migran</a></li>
//           <li><a href="#umkm" className="hover:text-white transition-colors">Belanja Lokal</a></li>
//           <li><a href="#lokasi" className="hover:text-white transition-colors">Peta Wisata</a></li>
//           <li>
//             {/* <button 
//               onClick={() => setView(isAuthenticated ? 'admin' : 'login')} 
//               className="text-slate-700 hover:text-white transition-colors"
//             >
//               Admin Dashboard
//             </button> */}
//             <nav aria-label="Akses Internal">
//               <h5 className="font-black text-xs tracking-[0.3em] uppercase text-orange-400 mb-2">Internal</h5>
//               <ul className="space-y-4">
//                 <li>
//                   <button 
//                     onClick={() => setView(isAuthenticated ? 'admin' : 'login')} 
//                     className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white px-6 py-3 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-white/5"
//                   >
//                     <span>🔐</span> Admin Portal
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </li>
//         </ul>
//       </nav>
//     </div>

//     {/* COPYRIGHT */}
//     <div className="text-center text-slate-500 text-sm font-medium">
//      • Konservasi & Edukasi Mangrove Wanatirta <br></br> 22523258 <br></br> &copy; 2026 KKN UII Unit 70 Bleberan
//     </div>
//   </div>
// </footer>

//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Attractions from './components/Attractions';
import UMKMSection from './components/UMKM';
import LocationSection from './components/LocationSection';
import DestinationDetailView from './components/DestinationDetailView';
import MangroveEducation from './components/MangroveEducation';
import MangroveDetailView from './components/MangroveDetailView';
import BirdMigration from './components/BirdMigration';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import { db } from './services/db';
import { AttractionDetail } from './types';

export default function App() {
  const [view, setView] = useState<'home' | 'detail' | 'admin' | 'login' | 'mangrove-detail'>('home');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [attractions, setAttractions] = useState<AttractionDetail[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    // Jangan set isLoading true setiap kali agar tidak ada flicker saat real-time update
    const data = await db.getAttractions();
    setAttractions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    // Muat data awal
    setIsLoading(true);
    loadData();
    
    // AKTIFKAN SINKRONISASI REAL-TIME
    // Setiap kali ada perubahan di Supabase (dari perangkat mana pun), 
    // fungsi loadData akan dijalankan secara otomatis.
    const unsubscribe = db.subscribe(() => {
      console.log('Sinkronisasi Real-time dipicu...');
      loadData();
    });

    const auth = sessionStorage.getItem('admin_auth') === 'true';
    setIsAuthenticated(auth);

    return () => unsubscribe();
  }, []);

  const handleNavigateDetail = (id: string) => {
    setSelectedId(id);
    setView('detail');
  };

  const handleBackHome = async () => {
    setView('home');
    setSelectedId(null);
    await loadData();
    window.scrollTo(0, 0);
  };

  const handleAdminAccess = () => {
    const auth = sessionStorage.getItem('admin_auth') === 'true';
    setView(auth ? 'admin' : 'login');
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('admin');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setView('home');
  };

  if (view === 'login') {
    return <Login onLogin={handleLoginSuccess} onBack={handleBackHome} />;
  }

  if (view === 'admin') {
    if (!isAuthenticated) return <Login onLogin={handleLoginSuccess} onBack={handleBackHome} />;
    return <AdminDashboard onBack={handleBackHome} onLogout={handleLogout} />;
  }

  if (view === 'detail' && selectedId) {
    const selectedData = attractions.find(a => a.id === selectedId);
    if (selectedData) {
      return <DestinationDetailView data={selectedData} onBack={handleBackHome} />;
    }
  }

  if (view === 'mangrove-detail') {
    return <MangroveDetailView onBack={handleBackHome} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar onAdminAccess={handleAdminAccess} />
      <Hero />
      
      <aside aria-label="Statistik Dusun" className="bg-white py-20 overflow-hidden scroll-mt-24 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: 'Area Konservasi', val: '12', sub: 'Hektar Mangrove', color: 'bg-emerald-500 shadow-emerald-200' },
              { label: 'Armada Kapal', val: '15', sub: 'Wisata Air', color: 'bg-sky-500 shadow-sky-200' },
              { label: 'Pengusaha Lokal', val: '50+', sub: 'UMKM Terdaftar', color: 'bg-orange-500 shadow-orange-200' },
              { label: 'Spesies Burung', val: '100+', sub: 'Kawasan KEE', color: 'bg-indigo-500 shadow-indigo-200' }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 ${s.color} rounded-[2rem] flex items-center justify-center text-white font-black text-3xl shadow-xl mb-6 hover:rotate-6 transition-transform`}>
                  {s.val}
                </div>
                <div>
                  <div className="text-slate-900 font-black text-sm leading-none mb-1 uppercase tracking-tight">{s.label}</div>
                  <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {isLoading ? (
        <div className="py-24 text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Menghubungkan ke Banaran...</p>
        </div>
      ) : (
        <Attractions attractionsList={attractions} onNavigateDetail={handleNavigateDetail} />
      )}
      
      <UMKMSection />
      <BirdMigration />
      <MangroveEducation onExploreDetail={() => setView('mangrove-detail')} />
      <LocationSection />

      <footer id="kontak" className="bg-slate-900 text-white py-24 relative overflow-hidden scroll-mt-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20 pb-20 border-b border-white/10">
            <div className="lg:col-span-2">
              <div 
                className="flex items-center space-x-4 mb-8 cursor-pointer group"
                onDoubleClick={handleAdminAccess}
              >
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-black text-3xl group-hover:scale-110 transition-transform">B</div>
                <div>
                  <h5 className="text-3xl font-serif font-bold tracking-tight">Pesona Banaran</h5>
                  <p className="text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase">Kawasan Ekosistem Esensial</p>
                </div>
              </div>
              <p className="text-slate-400 max-w-md mb-10 text-lg leading-relaxed font-medium">
                Menjaga kekayaan hayati Kulon Progo melalui pelestarian mangrove dan perlindungan habitat burung migran.
              </p>
            </div>
            
            <nav aria-label="Tautan Penting">
              <h5 className="font-black text-xs tracking-[0.3em] uppercase text-emerald-400 mb-8">Eksplorasi</h5>
              <ul className="space-y-4 text-slate-300 text-sm font-bold">
                <li><a href="#home" className="hover:text-white transition-colors">Beranda Utama</a></li>
                <li><a href="#wisata" className="hover:text-white transition-colors">Destinasi Alam</a></li>
                <li><a href="#burung" className="hover:text-white transition-colors">Burung Migran</a></li>
                <li><a href="#umkm" className="hover:text-white transition-colors">Belanja Lokal</a></li>
                <li><a href="#lokasi" className="hover:text-white transition-colors">Peta Wisata</a></li>
              </ul>
            </nav>

            <nav aria-label="Akses Internal">
              <h5 className="font-black text-xs tracking-[0.3em] uppercase text-orange-400 mb-8">Internal</h5>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={handleAdminAccess}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white px-6 py-3 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-white/5"
                  >
                    <span>🔐</span> Admin Portal
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
            <p>&copy; 2024 Tim KKN-PPM UGM/UNY Dusun Banaran</p>
            <div className="flex gap-8">
              <span className="hover:text-emerald-500 transition-colors">Yogyakarta</span>
              <span className="hover:text-emerald-500 transition-colors">Kulon Progo</span>
              <span className="hover:text-emerald-500 transition-colors">Galur</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
