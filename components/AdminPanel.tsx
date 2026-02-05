
import React, { useState } from 'react';
import { SiteConfig } from '../content';

interface AdminPanelProps {
  config: SiteConfig;
  onSave: (newConfig: SiteConfig) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ config, onSave, onClose }) => {
  const [localConfig, setLocalConfig] = useState<SiteConfig>(config);
  const [showExport, setShowExport] = useState(false);

  const handleContactChange = (field: keyof SiteConfig['contact'], value: string) => {
    setLocalConfig({
      ...localConfig,
      contact: { ...localConfig.contact, [field]: value }
    });
  };

  const handleUMKMChange = (index: number, field: keyof any, value: string) => {
    const newUMKM = [...localConfig.umkm];
    newUMKM[index] = { ...newUMKM[index], [field]: value };
    setLocalConfig({ ...localConfig, umkm: newUMKM });
  };

  const copyToClipboard = () => {
    const dataStr = JSON.stringify(localConfig, null, 2);
    navigator.clipboard.writeText(`export const initialContent: SiteConfig = ${dataStr};`);
    alert("Konfigurasi berhasil disalin! Tempelkan ke file content.ts untuk pembaruan permanen.");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col">
        <header className="bg-emerald-800 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold">Panel Pengelola Dusun</h2>
            <p className="text-xs text-emerald-200 uppercase tracking-widest font-black">Mode Modifikasi Konten</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          {/* Section: Kontak Utama */}
          <section>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter mb-6 border-b pb-2">Informasi Kontak & Sekretariat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">WhatsApp (Format: 628xxx)</label>
                <input 
                  type="text" 
                  value={localConfig.contact.whatsappNumber} 
                  onChange={(e) => handleContactChange('whatsappNumber', e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Dusun</label>
                <input 
                  type="text" 
                  value={localConfig.contact.email} 
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </section>

          {/* Section: UMKM */}
          <section>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter mb-6 border-b pb-2">Manajemen Produk UMKM</h3>
            <div className="space-y-8">
              {localConfig.umkm.map((item, idx) => (
                <div key={item.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <p className="font-bold text-emerald-800 mb-4">Produk #{idx + 1}: {item.name}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      placeholder="Nama Produk" 
                      value={item.name} 
                      onChange={(e) => handleUMKMChange(idx, 'name', e.target.value)}
                      className="bg-white border-none rounded-lg px-4 py-2 text-sm"
                    />
                    <input 
                      placeholder="Rentang Harga" 
                      value={item.priceRange} 
                      onChange={(e) => handleUMKMChange(idx, 'priceRange', e.target.value)}
                      className="bg-white border-none rounded-lg px-4 py-2 text-sm"
                    />
                    <textarea 
                      placeholder="Deskripsi Singkat" 
                      value={item.description} 
                      onChange={(e) => handleUMKMChange(idx, 'description', e.target.value)}
                      className="bg-white border-none rounded-lg px-4 py-2 text-sm md:col-span-2 h-20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="p-6 bg-slate-50 border-t flex flex-col sm:flex-row gap-4 justify-between items-center">
          <p className="text-[10px] text-slate-500 font-bold max-w-sm">
            Catatan: Tombol "Simpan Pratonton" hanya mengubah tampilan di browser ini. Untuk mengubah permanen, gunakan tombol "Ekspor Data".
          </p>
          <div className="flex gap-3">
            <button 
              onClick={copyToClipboard}
              className="px-6 py-3 bg-orange-700 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-800 transition-all"
            >
              Ekspor Data Permanen
            </button>
            <button 
              onClick={() => onSave(localConfig)}
              className="px-6 py-3 bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-800 transition-all"
            >
              Simpan Pratonton
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminPanel;
