
// import React, { useState, useEffect } from 'react';
// import { db, MigratoryBird, ContactConfig } from '../services/db';
// import { AttractionDetail, UMKM } from '../types';

// interface AdminDashboardProps {
//   onBack: () => void;
//   onLogout: () => void;
// }

// const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, onLogout }) => {
//   const [activeTab, setActiveTab] = useState<'attractions' | 'umkm' | 'birds' | 'settings' | 'help'>('attractions');
//   const [attractions, setAttractions] = useState<AttractionDetail[]>([]);
//   const [umkmList, setUmkmList] = useState<UMKM[]>([]);
//   const [birds, setBirds] = useState<MigratoryBird[]>([]);
//   const [contact, setContact] = useState<ContactConfig | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isCloud, setIsCloud] = useState(false);
//   const [isSyncing, setIsSyncing] = useState(false);
  
//   const [editingItem, setEditingItem] = useState<any>(null);

//   const birdStatuses = ['Migran', 'Endemik', 'Dilindungi', 'Rentan', 'Langka'];

//   useEffect(() => {
//     setIsCloud(db.isCloudEnabled());
//     refreshData();
//   }, []);

//   const refreshData = async () => {
//     setIsLoading(true);
//     const [attrData, umkmData, birdData, contactData] = await Promise.all([
//       db.getAttractions(),
//       db.getUMKM(),
//       db.getBirds(),
//       db.getContact()
//     ]);
    
//     setAttractions(attrData);
//     setUmkmList(umkmData);
//     setBirds(birdData);
//     setContact(contactData);
//     setIsLoading(false);
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, isGallery: boolean = false, galleryIndex?: number) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 2 * 1024 * 1024) {
//       alert("Maaf, ukuran file terlalu besar. Gunakan foto di bawah 2MB agar website tetap ringan.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const base64String = event.target?.result as string;
//       if (isGallery && galleryIndex !== undefined) {
//         const newGallery = [...(editingItem.galleryImages || [])];
//         newGallery[galleryIndex] = base64String;
//         setEditingItem({ ...editingItem, galleryImages: newGallery });
//       } else {
//         setEditingItem({ ...editingItem, [fieldName]: base64String });
//       }
//     };
//     reader.onerror = () => {
//       alert("Gagal membaca file. Silakan coba lagi.");
//     };
//     reader.readAsDataURL(file);
//   };

//   const toggleBirdStatus = (status: string) => {
//     const currentStatuses = editingItem.status ? editingItem.status.split(' | ') : [];
//     let newStatuses;
//     if (currentStatuses.includes(status)) {
//       newStatuses = currentStatuses.filter((s: string) => s !== status);
//     } else {
//       newStatuses = [...currentStatuses, status];
//     }
//     setEditingItem({ ...editingItem, status: newStatuses.join(' | ') });
//   };

//   const handleSync = async () => {
//     if (!confirm('Anda akan mengunggah semua data lokal ke server Cloud. Data di server mungkin akan tertimpa. Lanjutkan?')) return;
//     setIsSyncing(true);
//     const result = await db.syncLocalToCloud();
//     setIsSyncing(false);
//     alert(result.message);
//     if (result.success) refreshData();
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Hapus data ini selamanya?')) return;
//     setIsLoading(true);
//     if (activeTab === 'attractions') await db.deleteAttraction(id);
//     if (activeTab === 'umkm') await db.deleteUMKM(id);
//     if (activeTab === 'birds') await db.deleteBird(id);
//     await refreshData();
//   };

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     if (activeTab === 'attractions') await db.saveAttraction(editingItem);
//     if (activeTab === 'umkm') await db.saveUMKM(editingItem);
//     if (activeTab === 'birds') await db.saveBird(editingItem);
//     setEditingItem(null);
//     await refreshData();
//   };

//   const handleSaveSettings = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!contact) return;
//     setIsLoading(true);
//     await db.saveContact(contact);
//     alert('Kontak berhasil diperbarui!');
//     await refreshData();
//   };

//   const handleAddGalleryImage = () => {
//     const currentGallery = editingItem.galleryImages || [];
//     setEditingItem({
//       ...editingItem,
//       galleryImages: [...currentGallery, '']
//     });
//   };

//   const handleUpdateGalleryImage = (index: number, value: string) => {
//     const newGallery = [...(editingItem.galleryImages || [])];
//     newGallery[index] = value;
//     setEditingItem({
//       ...editingItem,
//       galleryImages: newGallery
//     });
//   };

//   const handleRemoveGalleryImage = (index: number) => {
//     const newGallery = (editingItem.galleryImages || []).filter((_: any, i: number) => i !== index);
//     setEditingItem({
//       ...editingItem,
//       galleryImages: newGallery
//     });
//   };

//   const startCreate = () => {
//     const id = Date.now().toString();
//     if (activeTab === 'attractions') setEditingItem({ id, title: '', tagline: '', description: '', fullDescription: '', imageUrl: '', features: [], tips: [], category: 'Ekowisata', bestTime: '', galleryImages: [], price: '' });
//     if (activeTab === 'umkm') setEditingItem({ id, name: '', description: '', imageUrl: '', priceRange: '', whatsapp: '' });
//     if (activeTab === 'birds') setEditingItem({ id, name: '', scientific: '', status: '', desc: '', image: '' });
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100 flex">
//       <aside className="w-72 bg-slate-900 border-r border-white/5 flex flex-col p-8">
//         <div className="flex flex-col gap-6 mb-12">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-black">B</div>
//             <div>
//               <h1 className="font-bold leading-none">Admin Banaran</h1>
//               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Sistem Pengelola</p>
//             </div>
//           </div>
//           <div className={`px-4 py-3 rounded-xl border flex items-center gap-3 transition-all ${isCloud ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
//             <div className={`w-2 h-2 rounded-full animate-pulse ${isCloud ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
//             <div>
//               <p className={`text-[10px] font-black uppercase tracking-tighter ${isCloud ? 'text-emerald-500' : 'text-amber-500'}`}>
//                 {isCloud ? 'Database Cloud Online' : 'Mode Demo (Lokal)'}
//               </p>
//             </div>
//           </div>
//         </div>

//         <nav className="flex-1 space-y-2">
//           {[
//             { id: 'attractions', label: 'Wisata', icon: '📍' },
//             { id: 'umkm', label: 'UMKM', icon: '🛍️' },
//             { id: 'birds', label: 'Biodiversitas', icon: '🐦' },
//             { id: 'settings', label: 'Pengaturan', icon: '⚙️' }
//           ].map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id as any)}
//               className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
//                 activeTab === tab.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
//               }`}
//             >
//               <span className="text-xl">{tab.icon}</span>
//               {tab.label}
//             </button>
//           ))}
//         </nav>

//         <div className="mt-auto pt-8 border-t border-white/5">
//           <button onClick={onBack} className="w-full flex items-center gap-4 px-6 py-3 text-slate-400 hover:text-white transition-all text-sm font-bold text-left">
//             <span>🏠</span> Beranda
//           </button>
//           <button onClick={onLogout} className="w-full flex items-center gap-4 px-6 py-3 text-rose-400 hover:text-rose-300 transition-all text-sm font-bold text-left">
//             <span>🚪</span> Keluar
//           </button>
//         </div>
//       </aside>

//       <main className="flex-1 p-12 overflow-y-auto max-h-screen bg-slate-950">
//         <header className="flex justify-between items-center mb-12">
//           <div>
//             <h2 className="text-4xl font-serif font-bold">
//               {activeTab === 'attractions' ? 'Kelola Wisata' : 
//                activeTab === 'umkm' ? 'Kelola UMKM' : 
//                activeTab === 'birds' ? 'Informasi Burung' : 
//                'Pengaturan Umum'}
//             </h2>
//           </div>
//           <div className="flex gap-4">
//              {['attractions', 'umkm', 'birds'].includes(activeTab) && (
//                <button onClick={startCreate} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl">
//                  + Tambah Data
//                </button>
//              )}
//           </div>
//         </header>

//         {isLoading ? (
//           <div className="py-20 text-center">
//             <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Memuat...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-4">
//             {(activeTab === 'attractions' ? attractions : activeTab === 'umkm' ? umkmList : birds).map((item: any) => (
//               <div key={item.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem] flex items-center gap-8 group hover:bg-slate-900 transition-all">
//                 <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 shrink-0">
//                   <img src={item.imageUrl || item.image} alt="" className="w-full h-full object-cover" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-xl font-bold">{item.title || item.name}</h3>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {item.scientific && <span className="text-emerald-500 text-xs italic font-medium mr-2">{item.scientific}</span>}
//                     {item.status && item.status.split(' | ').map((s: string, i: number) => (
//                       <span key={i} className="bg-sky-500/10 text-sky-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border border-sky-500/20">{s}</span>
//                     ))}
//                   </div>
//                   <p className="text-slate-500 text-sm line-clamp-1 mt-2">{item.description || item.desc}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button onClick={() => setEditingItem(item)} className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-emerald-600 transition-all flex items-center justify-center">✏️</button>
//                   <button onClick={() => handleDelete(item.id)} className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-rose-600 transition-all flex items-center justify-center">🗑️</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {editingItem && (
//         <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
//           <div className="bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
//             <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
//               <h3 className="text-2xl font-bold">Edit {activeTab === 'birds' ? 'Biodiversitas' : 'Konten'}</h3>
//               <button onClick={() => setEditingItem(null)} className="text-slate-400 p-2 hover:text-white transition-colors">❌</button>
//             </div>
            
//             <form onSubmit={handleSave} className="p-8 overflow-y-auto flex-1 space-y-8">
//               <div className="space-y-4">
//                 <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Media Utama</label>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="relative group h-48 rounded-[2rem] overflow-hidden bg-slate-800 border-2 border-dashed border-white/10 hover:border-emerald-500/50 transition-all flex flex-col items-center justify-center cursor-pointer">
//                     {(editingItem.imageUrl || editingItem.image) ? (
//                       <>
//                         <img src={editingItem.imageUrl || editingItem.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
//                         <span className="relative z-10 bg-emerald-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">Ganti Foto Lokal</span>
//                       </>
//                     ) : (
//                       <div className="text-center p-4">
//                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Klik Unggah Foto</span>
//                       </div>
//                     )}
//                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={(e) => handleFileUpload(e, activeTab === 'birds' ? 'image' : 'imageUrl')} />
//                   </div>
//                   <div className="flex flex-col justify-center">
//                     <input className="w-full bg-slate-800 border border-white/5 text-white p-4 rounded-2xl outline-none focus:border-emerald-500 text-xs" value={editingItem.imageUrl || editingItem.image} placeholder="Atau tempel Link URL..." onChange={e => setEditingItem({...editingItem, [activeTab === 'birds' ? 'image' : 'imageUrl']: e.target.value})} />
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6 border-t border-white/5 pt-8">
//                 <div className="space-y-2">
//                   <label className="block text-xs font-bold text-slate-500 uppercase">Nama / Judul</label>
//                   <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" value={editingItem.title || editingItem.name} onChange={e => setEditingItem({...editingItem, [activeTab === 'attractions' ? 'title' : 'name']: e.target.value})} required />
//                 </div>

//                 {activeTab === 'birds' && (
//                   <div className="space-y-6">
//                     <div className="space-y-2">
//                       <label className="block text-xs font-bold text-slate-500 uppercase">Nama Latin (Ilmiah)</label>
//                       <input 
//                         className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 italic" 
//                         value={editingItem.scientific || ''} 
//                         placeholder="Contoh: Charadrius javanicus"
//                         onChange={e => setEditingItem({...editingItem, scientific: e.target.value})} 
//                       />
//                     </div>
//                     <div className="space-y-3">
//                       <label className="block text-xs font-bold text-slate-500 uppercase">Status Konservasi (Dapat pilih lebih dari satu)</label>
//                       <div className="flex flex-wrap gap-2">
//                         {birdStatuses.map(status => {
//                           const isActive = editingItem.status && editingItem.status.split(' | ').includes(status);
//                           return (
//                             <button
//                               key={status}
//                               type="button"
//                               onClick={() => toggleBirdStatus(status)}
//                               className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
//                                 isActive 
//                                   ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/20' 
//                                   : 'bg-slate-800 border-white/10 text-slate-400 hover:border-emerald-500/50'
//                               }`}
//                             >
//                               {status}
//                             </button>
//                           );
//                         })}
//                       </div>
//                       <p className="text-[10px] text-slate-500 italic">Klik pada label di atas untuk menambahkan status konservasi burung.</p>
//                     </div>
//                   </div>
//                 )}
                
//                 <div className="space-y-2">
//                   <label className="block text-xs font-bold text-slate-500 uppercase">Deskripsi</label>
//                   <textarea className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 h-32" value={editingItem.description || editingItem.desc} onChange={e => setEditingItem({...editingItem, [activeTab === 'attractions' ? 'description' : 'desc']: e.target.value})} required />
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-12 pb-4">
//                 <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-all">Simpan Perubahan</button>
//                 <button type="button" onClick={() => setEditingItem(null)} className="px-10 bg-slate-800 text-white p-5 rounded-2xl font-bold uppercase tracking-widest text-xs">Batal</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import { db, MigratoryBird, ContactConfig } from '../services/db';
// import { AttractionDetail, UMKM } from '../types';

// interface AdminDashboardProps {
//   onBack: () => void;
//   onLogout: () => void;
// }

// const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, onLogout }) => {
//   const [activeTab, setActiveTab] = useState<'attractions' | 'umkm' | 'birds' | 'settings'>('attractions');
//   const [attractions, setAttractions] = useState<AttractionDetail[]>([]);
//   const [umkmList, setUmkmList] = useState<UMKM[]>([]);
//   const [birds, setBirds] = useState<MigratoryBird[]>([]);
//   const [contact, setContact] = useState<ContactConfig | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isCloud, setIsCloud] = useState(false);
//   const [isSyncing, setIsSyncing] = useState(false);
  
//   const [editingItem, setEditingItem] = useState<any>(null);

//   const birdStatuses = ['Migran', 'Endemik', 'Dilindungi', 'Rentan', 'Langka'];

//   useEffect(() => {
//     setIsCloud(db.isCloudEnabled());
//     refreshData();
//     const unsubscribe = db.subscribe(() => refreshData());
//     return () => unsubscribe();
//   }, []);

//   const refreshData = async () => {
//     setIsLoading(true);
//     try {
//       const [attrData, umkmData, birdData, contactData] = await Promise.all([
//         db.getAttractions(),
//         db.getUMKM(),
//         db.getBirds(),
//         db.getContact()
//       ]);
//       setAttractions(attrData);
//       setUmkmList(umkmData);
//       setBirds(birdData);
//       setContact(contactData);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGlobalSync = async () => {
//     if (!confirm('Sync semua data lokal ke Cloud?')) return;
//     setIsSyncing(true);
//     const result = await db.syncLocalToCloud();
//     setIsSyncing(false);
//     alert(result.message);
//     if (result.success) refreshData();
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (file.size > 1 * 1024 * 1024) {
//       alert("Foto maksimal 1MB.");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setEditingItem({ ...editingItem, imageUrl: event.target?.result as string });
//     };
//     reader.readAsDataURL(file);
//   };

//   const toggleBirdStatus = (status: string) => {
//     const currentStatuses = editingItem.status ? editingItem.status.split(' | ') : [];
//     let newStatuses;
//     if (currentStatuses.includes(status)) {
//       newStatuses = currentStatuses.filter((s: string) => s !== status);
//     } else {
//       newStatuses = [...currentStatuses, status];
//     }
//     setEditingItem({ ...editingItem, status: newStatuses.join(' | ') });
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Hapus data?')) return;
//     setIsLoading(true);
//     if (activeTab === 'attractions') await db.deleteAttraction(id);
//     if (activeTab === 'umkm') await db.deleteUMKM(id);
//     if (activeTab === 'birds') await db.deleteBird(id);
//     await refreshData();
//   };

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       if (activeTab === 'attractions') await db.saveAttraction(editingItem);
//       if (activeTab === 'umkm') await db.saveUMKM(editingItem);
//       if (activeTab === 'birds') await db.saveBird(editingItem);
//       setEditingItem(null);
//       await refreshData();
//     } catch (error: any) {
//       alert('Gagal simpan: ' + error.message);
//       setIsLoading(false);
//     }
//   };

//   const startCreate = () => {
//     const id = Date.now().toString();
//     if (activeTab === 'attractions') setEditingItem({ id, title: '', tagline: '', description: '', fullDescription: '', imageUrl: '', features: [], tips: [], category: 'Ekowisata', bestTime: '', galleryImages: [], price: '' });
//     if (activeTab === 'umkm') setEditingItem({ id, name: '', description: '', imageUrl: '', priceRange: '', whatsapp: '' });
//     if (activeTab === 'birds') setEditingItem({ id, name: '', scientific: '', status: '', description: '', imageUrl: '' });
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
//       <aside className="w-80 bg-slate-900 border-r border-white/5 flex flex-col p-8">
//         <div className="flex items-center gap-4 mb-10">
//           <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-2xl">B</div>
//           <div><h1 className="font-bold">Admin Banaran</h1></div>
//         </div>

//         <button onClick={handleGlobalSync} disabled={isSyncing} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-10">
//           {isSyncing ? 'Processing...' : '⬆ Sinkronisasi Global'}
//         </button>

//         <nav className="flex-1 space-y-2">
//           {['attractions', 'umkm', 'birds', 'settings'].map(tab => (
//             <button key={tab} onClick={() => setActiveTab(tab as any)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === tab ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}>
//               {tab === 'attractions' ? '📍 Wisata' : tab === 'umkm' ? '🛍️ UMKM' : tab === 'birds' ? '🐦 Burung' : '⚙️ Setting'}
//             </button>
//           ))}
//         </nav>
//         <div className="mt-auto pt-8 border-t border-white/5 space-y-2">
//           <button onClick={onBack} className="w-full text-left px-6 py-3 text-slate-500 hover:text-white text-xs font-bold">🏠 Beranda</button>
//           <button onClick={onLogout} className="w-full text-left px-6 py-3 text-rose-500 hover:text-rose-400 text-xs font-bold">🚪 Keluar</button>
//         </div>
//       </aside>

//       <main className="flex-1 p-16 overflow-y-auto">
//         {activeTab !== 'settings' && (
//           <header className="flex justify-between items-end mb-12">
//             <h2 className="text-4xl font-serif font-bold">Kelola Konten</h2>
//             <button onClick={startCreate} className="bg-white text-slate-950 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest">Tambah Data</button>
//           </header>
//         )}

//         {isLoading ? (
//           <div className="text-center py-20 animate-pulse">Memuat data...</div>
//         ) : (
//           <div className="grid grid-cols-1 gap-4">
//             {(activeTab === 'attractions' ? attractions : activeTab === 'umkm' ? umkmList : birds).map((item: any) => (
//               <div key={item.id} className="bg-slate-900/40 border border-white/5 p-6 rounded-[2rem] flex items-center gap-6 group">
//                 <img src={item.imageUrl} className="w-20 h-20 rounded-2xl object-cover" />
//                 <div className="flex-1">
//                   <h3 className="text-lg font-bold">{item.title || item.name}</h3>
//                   <p className="text-slate-500 text-xs line-clamp-1">{item.description}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button onClick={() => setEditingItem(item)} className="p-3 bg-slate-800 rounded-xl">✏️</button>
//                   <button onClick={() => handleDelete(item.id)} className="p-3 bg-slate-800 rounded-xl hover:bg-rose-600">🗑️</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {editingItem && (
//         <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
//           <form onSubmit={handleSave} className="bg-slate-900 w-full max-w-2xl rounded-[3rem] p-10 max-h-[90vh] overflow-y-auto space-y-8 border border-white/10">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-2xl font-bold">Edit Data</h3>
//               <button type="button" onClick={() => setEditingItem(null)}>❌</button>
//             </div>

//             <div className="space-y-6">
//               <div className="relative h-48 rounded-[2rem] overflow-hidden bg-slate-800 border-2 border-dashed border-white/10 flex items-center justify-center">
//                 {editingItem.imageUrl && <img src={editingItem.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-50" />}
//                 <span className="relative z-10 text-[10px] font-black uppercase">Pilih Foto (Max 1MB)</span>
//                 <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} />
//               </div>

//               <input className="w-full bg-slate-800 p-5 rounded-2xl outline-none" value={editingItem.title || editingItem.name} placeholder="Nama / Judul" onChange={e => setEditingItem({...editingItem, [activeTab === 'attractions' ? 'title' : 'name']: e.target.value})} required />
              
//               {activeTab === 'birds' && (
//                 <div className="space-y-4">
//                   <input className="w-full bg-slate-800 p-5 rounded-2xl outline-none italic" value={editingItem.scientific || ''} placeholder="Nama Latin" onChange={e => setEditingItem({...editingItem, scientific: e.target.value})} />
//                   <div className="flex flex-wrap gap-2">
//                     {birdStatuses.map(s => (
//                       <button key={s} type="button" onClick={() => toggleBirdStatus(s)} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase border ${editingItem.status?.includes(s) ? 'bg-emerald-600 border-emerald-500' : 'bg-slate-800 border-white/10 text-slate-500'}`}>{s}</button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <textarea className="w-full bg-slate-800 p-5 rounded-2xl outline-none h-40" value={editingItem.description} placeholder="Deskripsi Lengkap" onChange={e => setEditingItem({...editingItem, description: e.target.value})} required />
//             </div>

//             <div className="flex gap-4">
//               <button type="submit" className="flex-1 bg-emerald-600 p-6 rounded-3xl font-black uppercase text-xs">Simpan Perubahan</button>
//               <button type="button" onClick={() => setEditingItem(null)} className="px-10 bg-slate-800 rounded-3xl font-black uppercase text-xs">Batal</button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;







import React, { useState, useEffect } from 'react';
import { db, MigratoryBird, ContactConfig } from '../services/db';
import { AttractionDetail, UMKM, CommunityActivity } from '../types';

interface AdminDashboardProps {
  onBack: () => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'attractions' | 'umkm' | 'birds' | 'activities' | 'settings'>('attractions');
  const [attractions, setAttractions] = useState<AttractionDetail[]>([]);
  const [umkmList, setUmkmList] = useState<UMKM[]>([]);
  const [birds, setBirds] = useState<MigratoryBird[]>([]);
  const [activities, setActivities] = useState<CommunityActivity[]>([]);
  const [contact, setContact] = useState<ContactConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  const birdStatuses = ['Migran', 'Endemik', 'Dilindungi', 'Rentan', 'Langka'];
  const attractionCategories = ['Ekowisata', 'Petualangan', 'Rekreasi'];

  useEffect(() => {
    refreshData();
    const unsubscribe = db.subscribe(() => refreshData());
    return () => unsubscribe();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [attrData, umkmData, birdData, contactData, activityData] = await Promise.all([
        db.getAttractions(),
        db.getUMKM(),
        db.getBirds(),
        db.getContact(),
        db.getActivities()
      ]);
      setAttractions(attrData);
      setUmkmList(umkmData);
      setBirds(birdData);
      setContact(contactData);
      setActivities(activityData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGlobalSync = async () => {
    if (!confirm('Sync semua data lokal ke Cloud?')) return;
    setIsSyncing(true);
    const result = await db.syncLocalToCloud();
    setIsSyncing(false);
    alert(result.message);
    if (result.success) refreshData();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'item' | 'settings' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Foto maksimal 1.5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (target === 'item') {
        const field = activeTab === 'birds' ? 'image' : 'imageUrl';
        setEditingItem({ ...editingItem, [field]: dataUrl });
      } else if (target === 'gallery') {
        const currentGallery = editingItem.galleryImages || [];
        setEditingItem({
          ...editingItem,
          galleryImages: [...currentGallery, dataUrl]
        });
      } else {
        setContact(prev => prev ? { ...prev, logoUrl: dataUrl } : null);
      }
    };
    reader.readAsDataURL(file);
  };

  const addGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    const currentGallery = editingItem.galleryImages || [];
    setEditingItem({
      ...editingItem,
      galleryImages: [...currentGallery, newGalleryUrl.trim()]
    });
    setNewGalleryUrl('');
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = [...(editingItem.galleryImages || [])];
    newGallery.splice(index, 1);
    setEditingItem({ ...editingItem, galleryImages: newGallery });
  };

  const toggleBirdStatus = (status: string) => {
    const currentStatuses = editingItem.status ? editingItem.status.split(' | ') : [];
    let newStatuses;
    if (currentStatuses.includes(status)) {
      newStatuses = currentStatuses.filter((s: string) => s !== status);
    } else {
      newStatuses = [...currentStatuses, status];
    }
    setEditingItem({ ...editingItem, status: newStatuses.join(' | ') });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus data?')) return;
    setIsLoading(true);
    if (activeTab === 'attractions') await db.deleteAttraction(id);
    if (activeTab === 'umkm') await db.deleteUMKM(id);
    if (activeTab === 'birds') await db.deleteBird(id);
    if (activeTab === 'activities') await db.deleteActivity(id);
    await refreshData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (activeTab === 'attractions') await db.saveAttraction(editingItem);
      if (activeTab === 'umkm') await db.saveUMKM(editingItem);
      if (activeTab === 'activities') await db.saveActivity(editingItem);
      if (activeTab === 'birds') {
        const birdData: MigratoryBird = {
          id: editingItem.id,
          name: editingItem.name,
          scientific: editingItem.scientific,
          description: editingItem.description || editingItem.desc,
          image: editingItem.image || editingItem.imageUrl,
          status: editingItem.status
        };
        await db.saveBird(birdData);
      }
      setEditingItem(null);
      await refreshData();
    } catch (error: any) {
      alert('Gagal simpan: ' + error.message);
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    setIsLoading(true);
    try {
      await db.saveContact(contact);
      alert('Pengaturan berhasil diperbarui!');
      refreshData();
    } catch (error: any) {
      alert('Gagal simpan pengaturan: ' + error.message);
      setIsLoading(false);
    }
  };

  const startCreate = () => {
    const id = Date.now().toString();
    if (activeTab === 'attractions') setEditingItem({ id, title: '', tagline: '', description: '', fullDescription: '', imageUrl: '', features: [], tips: [], category: 'Ekowisata', bestTime: '', galleryImages: [], price: 'Rp 0' });
    if (activeTab === 'umkm') setEditingItem({ id, name: '', description: '', imageUrl: '', priceRange: 'Rp 0', whatsapp: '' });
    if (activeTab === 'birds') setEditingItem({ id, name: '', scientific: '', status: '', description: '', image: '' });
    if (activeTab === 'activities') setEditingItem({ id, title: '', description: '', imageUrl: '', galleryImages: [], date: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <aside className="w-80 bg-slate-900 border-r border-white/5 flex flex-col p-8">
        <div className="flex items-center gap-4 mb-10">
          {contact?.logoUrl ? (
             <img src={contact.logoUrl} className="w-12 h-12 rounded-xl object-contain" alt="Logo" />
          ) : (
             <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-2xl">B</div>
          )}
          <div><h1 className="font-bold">Admin Banaran</h1></div>
        </div>

        <button onClick={handleGlobalSync} disabled={isSyncing} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-10 shadow-lg shadow-emerald-900/20 transition-all">
          {isSyncing ? 'Memproses...' : '⬆ Sinkronisasi Global'}
        </button>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'attractions', label: '📍 Wisata', icon: '📍' },
            { id: 'activities', label: '🤝 Kegiatan', icon: '🤝' },
            { id: 'umkm', label: '🛍️ UMKM', icon: '🛍️' },
            { id: 'birds', label: '🐦 Burung', icon: '🐦' },
            { id: 'settings', label: '⚙️ Setting', icon: '⚙️' }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as any)} 
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white/10 text-white border border-white/5' : 'text-slate-500 hover:text-white'}`}
            >
              <span className="text-lg">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto pt-8 border-t border-white/5 space-y-2">
          <button onClick={onBack} className="w-full text-left px-6 py-3 text-slate-500 hover:text-white text-xs font-bold transition-colors">🏠 Lihat Website</button>
          <button onClick={onLogout} className="w-full text-left px-6 py-3 text-rose-500 hover:text-rose-400 text-xs font-bold transition-colors">🚪 Keluar</button>
        </div>
      </aside>

      <main className="flex-1 p-16 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Manajemen Konten</p>
            <h2 className="text-4xl font-serif font-bold">
              {activeTab === 'attractions' ? 'Destinasi Wisata' : activeTab === 'activities' ? 'Kegiatan Masyarakat' : activeTab === 'umkm' ? 'Produk Lokal' : activeTab === 'birds' ? 'Database Burung' : 'Pengaturan Umum'}
            </h2>
          </div>
          {activeTab !== 'settings' && (
            <button onClick={startCreate} className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-2xl">
              + Tambah Baru
            </button>
          )}
        </header>

        {isLoading ? (
          <div className="text-center py-40 animate-pulse text-slate-500 font-bold uppercase tracking-widest text-xs">Sinkronisasi Data...</div>
        ) : activeTab === 'settings' ? (
          <div className="max-w-3xl">
            <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-white/5 p-12 rounded-[3rem] space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Logo Website</label>
                    <div className="relative aspect-square w-32 bg-slate-800 rounded-3xl overflow-hidden border-2 border-dashed border-white/10 flex items-center justify-center group cursor-pointer">
                       {contact?.logoUrl && <img src={contact.logoUrl} className="absolute inset-0 w-full h-full object-contain" alt="Logo Preview" />}
                       <span className="relative z-10 text-[9px] font-black opacity-0 group-hover:opacity-100 transition-opacity">GANTI LOGO</span>
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={(e) => handleFileUpload(e, 'settings')} />
                    </div>
                    <input 
                      className="w-full bg-slate-800 p-4 rounded-xl outline-none border border-white/5 text-[10px]" 
                      value={contact?.logoUrl || ''} 
                      placeholder="Atau tempel URL logo..." 
                      onChange={e => setContact(prev => prev ? {...prev, logoUrl: e.target.value} : null)}
                    />
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">WhatsApp (628xxx)</label>
                       <input className="w-full bg-slate-800 p-5 rounded-2xl outline-none border border-white/5" value={contact?.whatsappNumber || ''} onChange={e => setContact(prev => prev ? {...prev, whatsappNumber: e.target.value} : null)} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Dusun</label>
                       <input className="w-full bg-slate-800 p-5 rounded-2xl outline-none border border-white/5" value={contact?.email || ''} onChange={e => setContact(prev => prev ? {...prev, email: e.target.value} : null)} />
                    </div>
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Alamat Lengkap</label>
                 <textarea className="w-full bg-slate-800 p-5 rounded-2xl outline-none border border-white/5 h-24" value={contact?.address || ''} onChange={e => setContact(prev => prev ? {...prev, address: e.target.value} : null)} />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 p-6 rounded-3xl font-black uppercase text-xs tracking-widest transition-all">
                 Simpan Konfigurasi
              </button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {(activeTab === 'attractions' ? attractions : activeTab === 'activities' ? activities : activeTab === 'umkm' ? umkmList : birds).map((item: any) => (
              <div key={item.id} className="bg-slate-900/40 border border-white/5 p-6 rounded-[2.5rem] flex items-center gap-8 group hover:bg-slate-900 transition-all">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 shrink-0">
                  <img src={item.imageUrl || item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{item.title || item.name}</h3>
                  <div className="flex gap-4">
                    <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">{item.price || item.priceRange || item.scientific}</p>
                    {item.galleryImages && <p className="text-emerald-500 text-[10px] uppercase font-black tracking-widest ml-2">📸 {item.galleryImages.length} Foto</p>}
                    {item.category && <p className="text-sky-500 text-[10px] uppercase font-black tracking-widest ml-2">🏷️ {item.category}</p>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingItem(item)} className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-emerald-600 transition-all flex items-center justify-center">✏️</button>
                  <button onClick={() => handleDelete(item.id)} className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-rose-600 transition-all flex items-center justify-center">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {editingItem && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto">
          <form onSubmit={handleSave} className="bg-slate-900 w-full max-w-3xl rounded-[3rem] p-10 border border-white/10 space-y-8 my-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <h3 className="text-2xl font-bold">Modifikasi Data</h3>
              <button type="button" onClick={() => setEditingItem(null)} className="p-2 hover:text-rose-500 transition-colors text-2xl">&times;</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Media Utama</label>
                  <div className="relative h-44 rounded-3xl overflow-hidden bg-slate-800 border-2 border-dashed border-white/10 flex flex-col items-center justify-center group cursor-pointer">
                    {(editingItem.imageUrl || editingItem.image) && (
                      <img src={editingItem.imageUrl || editingItem.image} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Preview" />
                    )}
                    <span className="relative z-10 text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white mb-2">📁 Unggah File</span>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={(e) => handleFileUpload(e, 'item')} />
                  </div>
                  <input 
                    className="w-full bg-slate-800 p-4 rounded-xl outline-none border border-white/5 text-[10px] focus:ring-1 focus:ring-emerald-500" 
                    value={activeTab === 'birds' ? (editingItem.image || '') : (editingItem.imageUrl || '')} 
                    placeholder="Atau tempel URL gambar di sini..." 
                    onChange={e => setEditingItem({...editingItem, [activeTab === 'birds' ? 'image' : 'imageUrl']: e.target.value})} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Nama / Judul</label>
                  <input className="w-full bg-slate-800 p-5 rounded-2xl outline-none border border-white/5 focus:ring-2 focus:ring-emerald-500" value={editingItem.title || editingItem.name} placeholder="Contoh: Mangrove Wanatirta" onChange={e => setEditingItem({...editingItem, [activeTab === 'attractions' ? 'title' : 'name']: e.target.value})} required />
                </div>

                {activeTab === 'attractions' && (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Kategori Wisata</label>
                    <div className="flex gap-2">
                      {attractionCategories.map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setEditingItem({ ...editingItem, category: cat })}
                          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${editingItem.category === cat ? 'bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-900/40' : 'bg-slate-800 border-white/10 text-slate-500'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(activeTab === 'attractions' || activeTab === 'activities' || activeTab === 'umkm') && (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 ml-2">
                      {activeTab === 'activities' ? 'Tanggal / Waktu' : 'Harga / Biaya'}
                    </label>
                    <input 
                      className="w-full bg-emerald-900/20 text-emerald-400 p-5 rounded-2xl outline-none border border-emerald-500/20 focus:ring-2 focus:ring-emerald-500 font-bold" 
                      value={activeTab === 'attractions' ? editingItem.price : activeTab === 'activities' ? editingItem.date : editingItem.priceRange} 
                      placeholder={activeTab === 'activities' ? "Contoh: Setiap Minggu Pagi" : "Contoh: Rp 10.000 / orang"} 
                      onChange={e => setEditingItem({...editingItem, [activeTab === 'attractions' ? 'price' : activeTab === 'activities' ? 'date' : 'priceRange']: e.target.value})} 
                      required 
                    />
                  </div>
                )}

                {activeTab === 'umkm' && (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Nomor WhatsApp (628xxx)</label>
                    <input 
                      className="w-full bg-slate-800 p-5 rounded-2xl outline-none border border-white/5 focus:ring-2 focus:ring-emerald-500" 
                      value={editingItem.whatsapp || ''} 
                      placeholder="Contoh: 628123456789" 
                      onChange={e => setEditingItem({...editingItem, whatsapp: e.target.value})} 
                      required 
                    />
                  </div>
                )}

                {activeTab === 'birds' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Nama Ilmiah</label>
                      <input className="w-full bg-slate-800 p-5 rounded-2xl outline-none border border-white/5 italic" value={editingItem.scientific || ''} placeholder="Scientific Name..." onChange={e => setEditingItem({...editingItem, scientific: e.target.value})} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {birdStatuses.map(s => (
                        <button key={s} type="button" onClick={() => toggleBirdStatus(s)} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase border transition-all ${editingItem.status?.includes(s) ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-800 border-white/10 text-slate-500'}`}>{s}</button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-6">
                {(activeTab === 'attractions' || activeTab === 'activities') && (
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Galeri Visual (Carousel)</label>
                    <div className="flex gap-2">
                      <div className="relative w-12 h-12 bg-slate-800 rounded-xl border border-white/5 flex items-center justify-center group cursor-pointer overflow-hidden shrink-0">
                        <span className="text-lg group-hover:scale-110 transition-transform">📁</span>
                        <input 
                          type="file" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          accept="image/*" 
                          onChange={(e) => handleFileUpload(e, 'gallery')} 
                        />
                      </div>
                      <input 
                        className="flex-1 bg-slate-800 p-4 rounded-xl outline-none border border-white/5 text-xs" 
                        value={newGalleryUrl} 
                        placeholder="Paste URL foto galeri..." 
                        onChange={e => setNewGalleryUrl(e.target.value)} 
                      />
                      <button type="button" onClick={addGalleryImage} className="bg-white text-black px-4 rounded-xl font-bold hover:bg-emerald-500 hover:text-white transition-colors">+</button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto p-2 bg-slate-950 rounded-2xl border border-white/5">
                      {editingItem.galleryImages?.map((url: string, i: number) => (
                        <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                          <img src={url} className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeGalleryImage(i)} className="absolute inset-0 bg-rose-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs">Hapus</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Deskripsi Naratif</label>
                  <textarea 
                    className="w-full bg-slate-800 p-5 rounded-2xl outline-none h-40 border border-white/5 focus:ring-2 focus:ring-emerald-500 text-sm leading-relaxed" 
                    value={editingItem.description || editingItem.desc} 
                    placeholder="Tuliskan cerita menarik tentang item ini..." 
                    onChange={e => setEditingItem({...editingItem, description: e.target.value})} 
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-8 border-t border-white/5">
              <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500 p-6 rounded-3xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-emerald-950">Simpan Perubahan</button>
              <button type="button" onClick={() => setEditingItem(null)} className="px-10 bg-slate-800 rounded-3xl font-black uppercase text-xs tracking-widest">Batal</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;





