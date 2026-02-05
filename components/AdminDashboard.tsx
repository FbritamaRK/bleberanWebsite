
import React, { useState, useEffect } from 'react';
import { db, MigratoryBird, ContactConfig } from '../services/db';
import { AttractionDetail, UMKM } from '../types';

interface AdminDashboardProps {
  onBack: () => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'attractions' | 'umkm' | 'birds' | 'settings' | 'help'>('attractions');
  const [attractions, setAttractions] = useState<AttractionDetail[]>([]);
  const [umkmList, setUmkmList] = useState<UMKM[]>([]);
  const [birds, setBirds] = useState<MigratoryBird[]>([]);
  const [contact, setContact] = useState<ContactConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCloud, setIsCloud] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    setIsCloud(db.isCloudEnabled());
    refreshData();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    const [attrData, umkmData, birdData, contactData] = await Promise.all([
      db.getAttractions(),
      db.getUMKM(),
      db.getBirds(),
      db.getContact()
    ]);
    
    setAttractions(attrData);
    setUmkmList(umkmData);
    setBirds(birdData);
    setContact(contactData);
    setIsLoading(false);
  };

  const handleSync = async () => {
    if (!confirm('Anda akan mengunggah semua data lokal ke server Cloud. Data di server mungkin akan tertimpa. Lanjutkan?')) return;
    setIsSyncing(true);
    const result = await db.syncLocalToCloud();
    setIsSyncing(false);
    alert(result.message);
    if (result.success) refreshData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus data ini selamanya?')) return;
    setIsLoading(true);
    if (activeTab === 'attractions') await db.deleteAttraction(id);
    if (activeTab === 'umkm') await db.deleteUMKM(id);
    if (activeTab === 'birds') await db.deleteBird(id);
    await refreshData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (activeTab === 'attractions') await db.saveAttraction(editingItem);
    if (activeTab === 'umkm') await db.saveUMKM(editingItem);
    if (activeTab === 'birds') await db.saveBird(editingItem);
    setEditingItem(null);
    await refreshData();
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    setIsLoading(true);
    await db.saveContact(contact);
    alert('Kontak berhasil diperbarui!');
    await refreshData();
  };

  const handleAddGalleryImage = () => {
    const currentGallery = editingItem.galleryImages || [];
    setEditingItem({
      ...editingItem,
      galleryImages: [...currentGallery, '']
    });
  };

  const handleUpdateGalleryImage = (index: number, value: string) => {
    const newGallery = [...(editingItem.galleryImages || [])];
    newGallery[index] = value;
    setEditingItem({
      ...editingItem,
      galleryImages: newGallery
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGallery = (editingItem.galleryImages || []).filter((_: any, i: number) => i !== index);
    setEditingItem({
      ...editingItem,
      galleryImages: newGallery
    });
  };

  const startCreate = () => {
    const id = Date.now().toString();
    if (activeTab === 'attractions') setEditingItem({ id, title: '', tagline: '', description: '', fullDescription: '', imageUrl: '', features: [], tips: [], category: 'Ekowisata', bestTime: '', galleryImages: [] });
    if (activeTab === 'umkm') setEditingItem({ id, name: '', description: '', imageUrl: '', priceRange: '', whatsapp: '' });
    if (activeTab === 'birds') setEditingItem({ id, name: '', scientific: '', status: '', desc: '', image: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-white/5 flex flex-col p-8">
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-black">B</div>
            <div>
              <h1 className="font-bold leading-none">Admin Banaran</h1>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Sistem Pengelola</p>
            </div>
          </div>

          <div className={`px-4 py-3 rounded-xl border flex items-center gap-3 transition-all ${isCloud ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${isCloud ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
            <div>
              <p className={`text-[10px] font-black uppercase tracking-tighter ${isCloud ? 'text-emerald-500' : 'text-amber-500'}`}>
                {isCloud ? 'Database Cloud Online' : 'Mode Demo (Lokal)'}
              </p>
              <p className="text-[8px] text-slate-500 leading-none mt-0.5">
                {isCloud ? 'Data Terintegrasi Awan' : 'Simpan di Browser Laptop'}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'attractions', label: 'Wisata', icon: '📍' },
            { id: 'umkm', label: 'UMKM', icon: '🛍️' },
            { id: 'birds', label: 'Biodiversitas', icon: '🐦' },
            { id: 'settings', label: 'Pengaturan', icon: '⚙️' },
            { id: 'help', label: 'Panduan', icon: '📖' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <button onClick={onBack} className="w-full flex items-center gap-4 px-6 py-3 text-slate-400 hover:text-white transition-all text-sm font-bold text-left">
            <span>🏠</span> Website Utama
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-6 py-3 text-rose-400 hover:text-rose-300 transition-all text-sm font-bold text-left">
            <span>🚪</span> Keluar Sesi
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto max-h-screen bg-slate-950">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold">
              {activeTab === 'attractions' ? 'Kelola Wisata' : 
               activeTab === 'umkm' ? 'Kelola Toko UMKM' : 
               activeTab === 'birds' ? 'Informasi Burung' : 
               activeTab === 'help' ? 'Pusat Bantuan' :
               'Pengaturan Umum'}
            </h2>
            <p className="text-slate-500 mt-2">
              {isCloud ? 'Setiap perubahan akan langsung sinkron ke internet.' : 'Perubahan tersimpan sementara di browser ini.'}
            </p>
          </div>
          <div className="flex gap-4">
             {isCloud && (
               <button 
                 onClick={handleSync}
                 disabled={isSyncing}
                 className="bg-white/5 hover:bg-white/10 text-emerald-500 border border-emerald-500/20 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all disabled:opacity-50"
               >
                 {isSyncing ? '⌛ Mensinkron...' : '🔄 Sinkron Lokal ke Cloud'}
               </button>
             )}
             {['attractions', 'umkm', 'birds'].includes(activeTab) && (
               <button 
                 onClick={startCreate}
                 className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl"
               >
                 + Tambah Data
               </button>
             )}
          </div>
        </header>

        {isLoading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Sinkronisasi Data...</p>
          </div>
        ) : activeTab === 'help' ? (
          <div className="space-y-8 max-w-4xl">
            <div className="bg-emerald-900/30 border border-emerald-500/20 p-10 rounded-[2.5rem]">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span>🚀</span> Cara Mengaktifkan Cloud (Go Live)
              </h4>
              <ol className="space-y-6 text-slate-300">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <p className="font-bold text-white">Buat Akun Supabase</p>
                    <p className="text-sm">Buka <a href="https://supabase.com" target="_blank" className="text-emerald-400 underline">supabase.com</a> dan buat proyek baru dengan nama "Banaran".</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <p className="font-bold text-white">Salin Kunci API</p>
                    <p className="text-sm">Di dashboard Supabase, masuk ke <strong>Settings &gt; API</strong>. Salin <u>Project URL</u> dan <u>anon public key</u>.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <p className="font-bold text-white">Update File Kode</p>
                    <p className="text-sm">Buka file <code>services/db.ts</code> di editor kode Anda, dan tempelkan URL serta Key tersebut di variabel yang disediakan.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">4</div>
                  <div>
                    <p className="font-bold text-white">Tekan Tombol Sinkron</p>
                    <p className="text-sm">Kembali ke dashboard ini. Badge sidebar akan berubah jadi hijau. Klik tombol <strong>"Sinkron Lokal ke Cloud"</strong> di pojok kanan atas untuk memindahkan data lama Anda.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        ) : activeTab === 'settings' && contact ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            <div className="bg-slate-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><span>📞</span> Kontak Dusun</h4>
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">WhatsApp Utama (Format: 628xxx)</label>
                  <input 
                    type="text" 
                    value={contact.whatsappNumber}
                    onChange={e => setContact({...contact, whatsappNumber: e.target.value})}
                    className="w-full bg-slate-800 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-emerald-500"
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest">Simpan Perubahan</button>
              </form>
            </div>

            <div className="bg-slate-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-center items-center text-center">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl mb-6 ${isCloud ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>
                {isCloud ? '☁️' : '🏠'}
              </div>
              <h4 className="text-xl font-bold mb-2">{isCloud ? 'Terhubung ke Cloud' : 'Masih Mode Lokal'}</h4>
              <p className="text-sm text-slate-500 max-w-xs mb-8">
                {isCloud 
                  ? 'Data Anda sudah aman di server Supabase. Semua orang bisa melihat pembaruan Anda secara real-time.' 
                  : 'Data Anda saat ini hanya tersimpan di browser laptop ini. Ikuti panduan di tab bantuan untuk Go Live.'}
              </p>
              {!isCloud && (
                <button onClick={() => setActiveTab('help')} className="text-emerald-500 font-bold text-xs uppercase tracking-widest hover:underline">Lihat Panduan Go Live &rarr;</button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {(activeTab === 'attractions' ? attractions : activeTab === 'umkm' ? umkmList : birds).map((item: any) => (
              <div key={item.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem] flex items-center gap-8 group hover:bg-slate-900 transition-all">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 shrink-0">
                  <img src={item.imageUrl || item.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.title || item.name}</h3>
                  <p className="text-slate-500 text-sm line-clamp-1">{item.description || item.desc}</p>
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

      {/* CRUD Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-2xl font-bold">Edit Informasi</h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 p-2">❌</button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 overflow-y-auto flex-1 space-y-6">
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-500 uppercase">Nama / Judul</label>
                <input 
                  className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" 
                  value={editingItem.title || editingItem.name} 
                  onChange={e => setEditingItem({...editingItem, [activeTab === 'attractions' ? 'title' : 'name']: e.target.value})} 
                  required
                />
                
                <label className="block text-xs font-bold text-slate-500 uppercase">Deskripsi Singkat</label>
                <textarea 
                  className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 h-32" 
                  value={editingItem.description || editingItem.desc} 
                  onChange={e => setEditingItem({...editingItem, [activeTab === 'attractions' ? 'description' : 'desc']: e.target.value})} 
                  required
                />

                <label className="block text-xs font-bold text-slate-500 uppercase">Link Gambar Utama (URL)</label>
                <input 
                  className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" 
                  value={editingItem.imageUrl || editingItem.image} 
                  placeholder="https://images.unsplash.com/..."
                  onChange={e => setEditingItem({...editingItem, [activeTab === 'birds' ? 'image' : 'imageUrl']: e.target.value})} 
                  required
                />

                {/* GALERI VISUAL - Hanya Muncul jika Tab Wisata Aktif */}
                {activeTab === 'attractions' && (
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-sm font-black uppercase tracking-widest text-emerald-500">Galeri Visual Destinasi</h4>
                      <button 
                        type="button" 
                        onClick={handleAddGalleryImage}
                        className="text-[10px] font-black uppercase tracking-widest bg-emerald-600/10 text-emerald-500 px-4 py-2 rounded-xl border border-emerald-500/20 hover:bg-emerald-600 hover:text-white transition-all"
                      >
                        + Tambah Gambar Galeri
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {(editingItem.galleryImages || []).map((imgUrl: string, idx: number) => (
                        <div key={idx} className="flex gap-3">
                          <input 
                            className="flex-1 bg-slate-800 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm" 
                            value={imgUrl} 
                            placeholder={`URL Gambar Galeri #${idx + 1}`}
                            onChange={e => handleUpdateGalleryImage(idx, e.target.value)}
                          />
                          <button 
                            type="button" 
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="w-14 h-14 bg-rose-900/20 text-rose-500 border border-rose-500/20 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                      {(editingItem.galleryImages || []).length === 0 && (
                        <p className="text-center text-slate-600 text-[10px] font-bold uppercase tracking-widest py-4 border-2 border-dashed border-white/5 rounded-2xl">Galeri masih kosong</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'umkm' && (
                  <>
                    <label className="block text-xs font-bold text-slate-500 uppercase">No. WhatsApp (628xxx)</label>
                    <input 
                      className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" 
                      value={editingItem.whatsapp} 
                      onChange={e => setEditingItem({...editingItem, whatsapp: e.target.value})} 
                      required
                    />
                  </>
                )}
              </div>

              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-2xl font-black uppercase tracking-widest text-[10px]">Simpan Perubahan</button>
                <button type="button" onClick={() => setEditingItem(null)} className="px-8 bg-slate-800 text-white p-4 rounded-2xl font-bold uppercase tracking-widest text-[10px]">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
