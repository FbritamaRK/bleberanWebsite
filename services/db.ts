
// import { createClient } from '@supabase/supabase-js';
// import { AttractionDetail, UMKM } from '../types';
// import { initialContent } from '../content';

// /**
//  * ============================================================
//  * 🛠️ KONFIGURASI DATABASE SUPABASE (GO LIVE)
//  * ============================================================
//  * 1. Buat akun di supabase.com
//  * 2. Buat Project Baru (Banaran)
//  * 3. Buka Project Settings -> API
//  * 4. Salin 'Project URL' dan 'anon public' key ke bawah ini:
//  * ============================================================
//  */
// const SUPABASE_URL = 'https://iedvynwjbxqnmuoaghza.supabase.co'; 
// const SUPABASE_ANON_KEY = 'sb_publishable_R60kdpUqUMui8qzZLmj8Fw_7k5kPsZH';

// const isConfigured = SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('YOUR_PROJECT_ID');

// export const supabase = isConfigured 
//   ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
//   : null;

// export interface MigratoryBird {
//   id: string;
//   name: string;
//   scientific: string;
//   desc: string;
//   image: string;
//   status?: string;
// }

// export interface ContactConfig {
//   phone: string;
//   email: string;
//   address: string;
//   whatsappNumber: string;
// }

// const initialBirds: MigratoryBird[] = [
//   {
//     id: 'b1',
//     name: 'Cerek Jawa',
//     scientific: 'Charadrius javanicus',
//     status: 'Endemik & Dilindungi',
//     desc: 'Burung mungil penghuni tetap pesisir. Keberadaannya di Banaran menjadi indikator kesehatan ekosistem pantai pasir kita.',
//     image: 'https://images.unsplash.com/photo-1612140402324-1188540c9c74?auto=format&fit=crop&q=80&w=600'
//   }
// ];

// // Helper untuk LocalStorage
// const getLocal = (key: string) => {
//   const saved = localStorage.getItem(`banaran_${key}`);
//   return saved ? JSON.parse(saved) : null;
// };

// const setLocal = (key: string, data: any) => {
//   localStorage.setItem(`banaran_${key}`, JSON.stringify(data));
// };

// export const db = {
//   isCloudEnabled: () => !!supabase,

//   // Fungsi khusus untuk migrasi data dari lokal ke cloud
//   syncLocalToCloud: async () => {
//     if (!supabase) return { success: false, message: 'Kunci Supabase belum dikonfigurasi.' };

//     try {
//       const attractions = getLocal('attractions') || [];
//       const umkm = getLocal('umkm') || [];
//       const birds = getLocal('birds') || [];
//       const contact = getLocal('contact');

//       if (attractions.length > 0) await supabase.from('attractions').upsert(attractions);
//       if (umkm.length > 0) await supabase.from('umkm').upsert(umkm);
//       if (birds.length > 0) await supabase.from('birds').upsert(birds);
//       if (contact) await supabase.from('settings').upsert({ id: 1, ...contact });

//       return { success: true, message: 'Semua data lokal berhasil diunggah ke Cloud!' };
//     } catch (error: any) {
//       console.error('Sync Error:', error);
//       return { success: false, message: error.message };
//     }
//   },

//   getContact: async (): Promise<ContactConfig> => {
//     if (supabase) {
//       try {
//         const { data, error } = await supabase.from('settings').select('*').single();
//         if (!error && data) return data;
//       } catch (e) {}
//     }
//     return getLocal('contact') || initialContent.contact;
//   },
  
//   saveContact: async (contact: ContactConfig) => {
//     setLocal('contact', contact);
//     if (supabase) await supabase.from('settings').upsert({ id: 1, ...contact });
//   },

//   getAttractions: async (): Promise<AttractionDetail[]> => {
//     if (supabase) {
//       try {
//         const { data, error } = await supabase.from('attractions').select('*');
//         if (!error && data && data.length > 0) return data;
//       } catch (e) {}
//     }
//     return getLocal('attractions') || initialContent.attractions;
//   },

//   saveAttraction: async (attraction: AttractionDetail) => {
//     const list = await db.getAttractions();
//     const newList = list.some(a => a.id === attraction.id)
//       ? list.map(a => a.id === attraction.id ? attraction : a)
//       : [...list, attraction];
//     setLocal('attractions', newList);
//     if (supabase) await supabase.from('attractions').upsert(attraction);
//   },

//   deleteAttraction: async (id: string) => {
//     const list = await db.getAttractions();
//     setLocal('attractions', list.filter(a => a.id !== id));
//     if (supabase) await supabase.from('attractions').delete().eq('id', id);
//   },

//   getUMKM: async (): Promise<UMKM[]> => {
//     if (supabase) {
//       try {
//         const { data, error } = await supabase.from('umkm').select('*');
//         if (!error && data && data.length > 0) return data;
//       } catch (e) {}
//     }
//     return getLocal('umkm') || initialContent.umkm;
//   },

//   saveUMKM: async (item: UMKM) => {
//     const list = await db.getUMKM();
//     const newList = list.some(u => u.id === item.id)
//       ? list.map(u => u.id === item.id ? item : u)
//       : [...list, item];
//     setLocal('umkm', newList);
//     if (supabase) await supabase.from('umkm').upsert(item);
//   },

//   deleteUMKM: async (id: string) => {
//     const list = await db.getUMKM();
//     setLocal('umkm', list.filter(u => u.id !== id));
//     if (supabase) await supabase.from('umkm').delete().eq('id', id);
//   },

//   getBirds: async (): Promise<MigratoryBird[]> => {
//     if (supabase) {
//       try {
//         const { data, error } = await supabase.from('birds').select('*');
//         if (!error && data && data.length > 0) return data;
//       } catch (e) {}
//     }
//     return getLocal('birds') || initialBirds;
//   },

//   saveBird: async (bird: MigratoryBird) => {
//     const list = await db.getBirds();
//     const newList = list.some(b => b.id === bird.id)
//       ? list.map(b => b.id === bird.id ? bird : b)
//       : [...list, bird];
//     setLocal('birds', newList);
//     if (supabase) await supabase.from('birds').upsert(bird);
//   },

//   deleteBird: async (id: string) => {
//     const list = await db.getBirds();
//     setLocal('birds', list.filter(b => b.id !== id));
//     if (supabase) await supabase.from('birds').delete().eq('id', id);
//   }
// };





// // import { createClient } from '@supabase/supabase-js';
// // import { AttractionDetail, UMKM } from '../types';
// // import { initialContent } from '../content';

// // // Mengambil variabel lingkungan yang sudah didefinisikan di vite.config.ts & Vercel
// // const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
// // const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';

// // // Deteksi apakah koneksi Supabase valid
// // const isCloudActive = SUPABASE_URL.includes('supabase.co') && SUPABASE_ANON_KEY.length > 20;

// // export const supabase = isCloudActive 
// //   ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
// //   : null;

// // export interface MigratoryBird {
// //   id: string;
// //   name: string;
// //   scientific: string;
// //   desc: string;
// //   image: string;
// //   status: string; 
// // }

// // export interface ContactConfig {
// //   phone: string;
// //   email: string;
// //   address: string;
// //   whatsappNumber: string;
// // }

// // const initialBirds: MigratoryBird[] = [
// //   {
// //     id: 'b1',
// //     name: 'Cerek Jawa',
// //     scientific: 'Charadrius javanicus',
// //     status: 'Endemik | Dilindungi',
// //     desc: 'Burung mungil penghuni tetap pesisir. Keberadaannya di Banaran menjadi indikator kesehatan ekosistem pantai pasir kita.',
// //     image: 'https://images.unsplash.com/photo-1612140402324-1188540c9c74?auto=format&fit=crop&q=80&w=600'
// //   }
// // ];

// // const getLocal = (key: string) => {
// //   const saved = localStorage.getItem(`banaran_${key}`);
// //   return saved ? JSON.parse(saved) : null;
// // };

// // const setLocal = (key: string, data: any) => {
// //   localStorage.setItem(`banaran_${key}`, JSON.stringify(data));
// // };

// // export const db = {
// //   isCloudEnabled: () => !!supabase,

// //   syncLocalToCloud: async () => {
// //     if (!supabase) return { success: false, message: 'Cloud belum terhubung. Periksa konfigurasi Vercel.' };
// //     try {
// //       const attractions = getLocal('attractions') || [];
// //       const umkm = getLocal('umkm') || [];
// //       const birds = getLocal('birds') || [];
// //       const contact = getLocal('contact');

// //       if (attractions.length > 0) await supabase.from('attractions').upsert(attractions);
// //       if (umkm.length > 0) await supabase.from('umkm').upsert(umkm);
// //       if (birds.length > 0) await supabase.from('birds').upsert(birds);
// //       if (contact) await supabase.from('settings').upsert({ id: 1, ...contact });

// //       return { success: true, message: 'Sinkronisasi Berhasil! Data sekarang ada di Cloud.' };
// //     } catch (error: any) {
// //       return { success: false, message: error.message };
// //     }
// //   },

// //   getContact: async (): Promise<ContactConfig> => {
// //     if (supabase) {
// //       const { data, error } = await supabase.from('settings').select('*').single();
// //       if (!error && data) return data;
// //     }
// //     return getLocal('contact') || initialContent.contact;
// //   },
  
// //   saveContact: async (contact: ContactConfig) => {
// //     setLocal('contact', contact);
// //     if (supabase) await supabase.from('settings').upsert({ id: 1, ...contact });
// //   },

// //   getAttractions: async (): Promise<AttractionDetail[]> => {
// //     if (supabase) {
// //       const { data, error } = await supabase.from('attractions').select('*').order('created_at', { ascending: true });
// //       if (!error && data && data.length > 0) return data;
// //       if (error) console.error("Supabase Fetch Error:", error.message);
// //     }
// //     // Jika cloud gagal atau kosong, gunakan local/initial
// //     return getLocal('attractions') || initialContent.attractions;
// //   },

// //   saveAttraction: async (attraction: AttractionDetail) => {
// //     // 1. Simpan Lokal (sebagai cadangan)
// //     const list = await db.getAttractions();
// //     const newList = list.some(a => a.id === attraction.id)
// //       ? list.map(a => a.id === attraction.id ? attraction : a)
// //       : [...list, attraction];
// //     setLocal('attractions', newList);

// //     // 2. Simpan ke Supabase (Utama)
// //     if (supabase) {
// //       const { error } = await supabase.from('attractions').upsert(attraction);
// //       if (error) throw new Error("Gagal simpan ke Cloud: " + error.message);
// //     }
// //   },

// //   deleteAttraction: async (id: string) => {
// //     const list = await db.getAttractions();
// //     setLocal('attractions', list.filter(a => a.id !== id));
// //     if (supabase) await supabase.from('attractions').delete().eq('id', id);
// //   },

// //   getUMKM: async (): Promise<UMKM[]> => {
// //     if (supabase) {
// //       const { data, error } = await supabase.from('umkm').select('*').order('created_at', { ascending: true });
// //       if (!error && data && data.length > 0) return data;
// //     }
// //     return getLocal('umkm') || initialContent.umkm;
// //   },

// //   saveUMKM: async (item: UMKM) => {
// //     const list = await db.getUMKM();
// //     const newList = list.some(u => u.id === item.id)
// //       ? list.map(u => u.id === item.id ? item : u)
// //       : [...list, item];
// //     setLocal('umkm', newList);
// //     if (supabase) await supabase.from('umkm').upsert(item);
// //   },

// //   deleteUMKM: async (id: string) => {
// //     const list = await db.getUMKM();
// //     setLocal('umkm', list.filter(u => u.id !== id));
// //     if (supabase) await supabase.from('umkm').delete().eq('id', id);
// //   },

// //   getBirds: async (): Promise<MigratoryBird[]> => {
// //     if (supabase) {
// //       const { data, error } = await supabase.from('birds').select('*').order('created_at', { ascending: true });
// //       if (!error && data && data.length > 0) return data;
// //     }
// //     return getLocal('birds') || initialBirds;
// //   },

// //   saveBird: async (bird: MigratoryBird) => {
// //     const list = await db.getBirds();
// //     const newList = list.some(b => b.id === bird.id)
// //       ? list.map(b => b.id === bird.id ? bird : b)
// //       : [...list, bird];
// //     setLocal('birds', newList);
// //     if (supabase) await supabase.from('birds').upsert(bird);
// //   },

// //   deleteBird: async (id: string) => {
// //     const list = await db.getBirds();
// //     setLocal('birds', list.filter(b => b.id !== id));
// //     if (supabase) await supabase.from('birds').delete().eq('id', id);
// //   }
// // };


import { createClient } from '@supabase/supabase-js';
import { AttractionDetail, UMKM } from '../types';
import { initialContent } from '../content';

/**
 * ============================================================
 * 🛠️ KONFIGURASI DATABASE SUPABASE (GO LIVE)
 * ============================================================
 */
const SUPABASE_URL = 'https://iedvynwjbxqnmuoaghza.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_R60kdpUqUMui8qzZLmj8Fw_7k5kPsZH';

const isConfigured = SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('YOUR_PROJECT_ID');

export const supabase = isConfigured 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

export interface MigratoryBird {
  id: string;
  name: string;
  scientific: string;
  desc: string;
  image: string;
  status?: string;
}

export interface ContactConfig {
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
}

const initialBirds: MigratoryBird[] = [
  {
    id: 'b1',
    name: 'Cerek Jawa',
    scientific: 'Charadrius javanicus',
    status: 'Endemik & Dilindungi',
    desc: 'Burung mungil penghuni tetap pesisir. Keberadaannya di Banaran menjadi indikator kesehatan ekosistem pantai pasir kita.',
    image: 'https://images.unsplash.com/photo-1612140402324-1188540c9c74?auto=format&fit=crop&q=80&w=600'
  }
];

// Helper untuk LocalStorage
const getLocal = (key: string) => {
  const saved = localStorage.getItem(`banaran_${key}`);
  return saved ? JSON.parse(saved) : null;
};

const setLocal = (key: string, data: any) => {
  localStorage.setItem(`banaran_${key}`, JSON.stringify(data));
};

export const db = {
  isCloudEnabled: () => !!supabase,

  // Fungsi khusus untuk migrasi data dari lokal ke cloud agar sinkron di semua device
  syncLocalToCloud: async () => {
    if (!supabase) return { success: false, message: 'Kunci Supabase belum dikonfigurasi.' };

    try {
      const attractions = getLocal('attractions') || [];
      const umkm = getLocal('umkm') || [];
      const birds = getLocal('birds') || [];
      const contact = getLocal('contact');

      if (attractions.length > 0) await supabase.from('attractions').upsert(attractions);
      if (umkm.length > 0) await supabase.from('umkm').upsert(umkm);
      if (birds.length > 0) await supabase.from('birds').upsert(birds);
      if (contact) await supabase.from('settings').upsert({ id: 1, ...contact });

      return { success: true, message: 'BERHASIL! Data sekarang telah diperbarui di semua perangkat pengunjung.' };
    } catch (error: any) {
      console.error('Sync Error:', error);
      return { success: false, message: 'Gagal Sinkron: ' + error.message };
    }
  },

  getContact: async (): Promise<ContactConfig> => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('settings').select('*').single();
        if (!error && data) return data;
      } catch (e) {}
    }
    return getLocal('contact') || initialContent.contact;
  },
  
  saveContact: async (contact: ContactConfig) => {
    setLocal('contact', contact);
    if (supabase) await supabase.from('settings').upsert({ id: 1, ...contact });
  },

  getAttractions: async (): Promise<AttractionDetail[]> => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('attractions').select('*').order('created_at', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }
    return getLocal('attractions') || initialContent.attractions;
  },

  saveAttraction: async (attraction: AttractionDetail) => {
    const list = await db.getAttractions();
    const newList = list.some(a => a.id === attraction.id)
      ? list.map(a => a.id === attraction.id ? attraction : a)
      : [...list, attraction];
    setLocal('attractions', newList);
    if (supabase) await supabase.from('attractions').upsert(attraction);
  },

  deleteAttraction: async (id: string) => {
    const list = await db.getAttractions();
    setLocal('attractions', list.filter(a => a.id !== id));
    if (supabase) await supabase.from('attractions').delete().eq('id', id);
  },

  getUMKM: async (): Promise<UMKM[]> => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('umkm').select('*').order('created_at', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }
    return getLocal('umkm') || initialContent.umkm;
  },

  saveUMKM: async (item: UMKM) => {
    const list = await db.getUMKM();
    const newList = list.some(u => u.id === item.id)
      ? list.map(u => u.id === item.id ? item : u)
      : [...list, item];
    setLocal('umkm', newList);
    if (supabase) await supabase.from('umkm').upsert(item);
  },

  deleteUMKM: async (id: string) => {
    const list = await db.getUMKM();
    setLocal('umkm', list.filter(u => u.id !== id));
    if (supabase) await supabase.from('umkm').delete().eq('id', id);
  },

  getBirds: async (): Promise<MigratoryBird[]> => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('birds').select('*').order('created_at', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }
    return getLocal('birds') || initialBirds;
  },

  saveBird: async (bird: MigratoryBird) => {
    const list = await db.getBirds();
    const newList = list.some(b => b.id === bird.id)
      ? list.map(b => b.id === bird.id ? bird : b)
      : [...list, bird];
    setLocal('birds', newList);
    if (supabase) await supabase.from('birds').upsert(bird);
  },

  deleteBird: async (id: string) => {
    const list = await db.getBirds();
    setLocal('birds', list.filter(b => b.id !== id));
    if (supabase) await supabase.from('birds').delete().eq('id', id);
  }
};
