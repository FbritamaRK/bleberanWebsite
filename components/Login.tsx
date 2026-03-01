
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
  onBack: () => void;
  logoUrl?: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack, logoUrl }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bleberan2026') {
      sessionStorage.setItem('admin_auth', 'true');
      onLogin();
    } else {
      setError('Password yang Anda masukkan salah.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center overflow-hidden mb-6 shadow-xl shadow-emerald-900/20">
              {logoUrl ? (
                <img src={logoUrl} className="w-full h-full object-contain p-2 bg-white" alt="Logo" />
              ) : (
                <span className="font-black text-3xl text-white">B</span>
              )}
            </div>
            <h1 className="text-2xl font-serif font-bold text-white">Login Administrator</h1>
            <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-black mt-2">Dusun Bleberan</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password Akses</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full bg-slate-800 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-emerald-500 transition-all"
                placeholder="Masukkan password..."
              />
              {error && <p className="text-rose-500 text-[10px] font-bold mt-2 ml-1 uppercase tracking-wider">{error}</p>}
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-900/30"
            >
              Masuk Dashboard
            </button>
          </form>

          <button 
            onClick={onBack}
            className="w-full mt-6 text-slate-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
          >
            ← Kembali ke Beranda
          </button>
        </div>
        
        <p className="text-center mt-8 text-slate-600 text-[10px] font-medium leading-relaxed">
          Gunakan password yang telah ditentukan oleh tim IT KKN Dusun Bleberan untuk melakukan manajemen konten.
        </p>
      </div>
    </div>
  );
};

export default Login;
