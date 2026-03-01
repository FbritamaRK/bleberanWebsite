
import { createClient } from '@supabase/supabase-js';
import { AttractionDetail, UMKM, CommunityActivity } from '../types';
import { initialContent } from '../content';

const SUPABASE_URL = 'https://iedvynwjbxqnmuoaghza.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_R60kdpUqUMui8qzZLmj8Fw_7k5kPsZH';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LOGO_ID = 'SITE_CONFIG_LOGO'; // ID khusus untuk menyimpan logo di tabel attractions

export interface MigratoryBird {
  id: string;
  name: string;
  scientific: string;
  description: string; 
  image: string;       
  status?: string;
}

export interface ContactConfig {
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  logoUrl?: string; 
}

const initialBirds: MigratoryBird[] = [
  {
    id: 'b1',
    name: 'Cerek Jawa',
    scientific: 'Charadrius javanicus',
    status: 'Endemik & Dilindungi',
    description: 'Burung mungil penghuni tetap pesisir. Keberadaannya di Banaran menjadi indikator kesehatan ekosistem pantai pasir kita.',
    image: 'https://images.unsplash.com/photo-1612140402324-1188540c9c74?auto=format&fit=crop&q=80&w=600'
  }
];

const getLocal = (key: string) => {
  const saved = localStorage.getItem(`banaran_${key}`);
  return saved ? JSON.parse(saved) : null;
};

const setLocal = (key: string, data: any) => {
  localStorage.setItem(`banaran_${key}`, JSON.stringify(data));
};

export const db = {
  isCloudEnabled: () => !!supabase,

  subscribe: (callback: () => void) => {
    const channel = supabase.channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'attractions' }, () => callback())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'umkm' }, () => callback())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'birds' }, () => callback())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, () => callback())
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  },

  syncLocalToCloud: async () => {
    try {
      const attractions = getLocal('attractions') || [];
      const umkm = getLocal('umkm') || [];
      const birds = getLocal('birds') || [];
      const activities = getLocal('activities') || [];
      const contact = getLocal('contact');

      const cleanBirds = birds.map((b: any) => ({
        id: b.id,
        name: b.name,
        scientific: b.scientific,
        description: b.description || b.desc,
        image: b.image || b.imageUrl,
        status: b.status
      }));

      if (attractions.length > 0) await supabase.from('attractions').upsert(attractions);
      if (umkm.length > 0) await supabase.from('umkm').upsert(umkm);
      if (cleanBirds.length > 0) await supabase.from('birds').upsert(cleanBirds);
      
      if (activities.length > 0) {
        const activityPayloads = activities.map((a: CommunityActivity) => ({
          id: a.id,
          title: a.title,
          description: a.description,
          imageUrl: a.imageUrl,
          galleryImages: a.galleryImages,
          bestTime: a.date,
          category: 'ACTIVITY',
          tagline: 'Community Activity',
          fullDescription: a.description,
          features: [],
          tips: []
        }));
        await supabase.from('attractions').upsert(activityPayloads);
      }

      if (contact) {
        await db.saveContact(contact);
      }

      return { success: true, message: 'Sinkronisasi Berhasil!' };
    } catch (error: any) {
      return { success: false, message: 'Gagal Sinkron: ' + error.message };
    }
  },

  getContact: async (): Promise<ContactConfig> => {
    try {
      // 1. Ambil data teks dari Cloud Settings
      const { data: cloudSettings } = await supabase.from('settings').select('*').eq('id', 1).single();
      
      // 2. Ambil data logo dari "Virtual Record" di tabel Attractions
      const { data: logoRecord } = await supabase.from('attractions').select('imageUrl').eq('id', LOGO_ID).single();

      const baseContact = cloudSettings || getLocal('contact') || initialContent.contact;
      
      return {
        ...baseContact,
        logoUrl: logoRecord?.imageUrl || getLocal('contact')?.logoUrl
      };
    } catch (e) {
      return getLocal('contact') || initialContent.contact;
    }
  },
  
  saveContact: async (contact: ContactConfig) => {
    // Simpan Lokal sebagai fallback
    setLocal('contact', contact);

    const { logoUrl, ...textData } = contact;

    // 1. Simpan Teks ke Tabel Settings (Tanpa Kolom logoUrl)
    const { error: textError } = await supabase.from('settings').upsert({ id: 1, ...textData });
    
    // 2. Simpan Logo ke Tabel Attractions menggunakan ID khusus
    if (logoUrl) {
      const { error: logoError } = await supabase.from('attractions').upsert({
        id: LOGO_ID,
        title: 'SYSTEM_LOGO',
        imageUrl: logoUrl,
        category: 'SYSTEM',
        description: 'Site Logo Storage',
        tagline: 'Internal',
        fullDescription: 'Internal storage for site logo to bypass schema limitations'
      });
      if (logoError) console.error("Gagal simpan logo ke Cloud:", logoError.message);
    }

    if (textError) throw textError;
  },

  getAttractions: async (): Promise<AttractionDetail[]> => {
    // Saring agar LOGO_ID dan ACTIVITY tidak muncul di list wisata
    const { data, error } = await supabase
      .from('attractions')
      .select('*')
      .neq('id', LOGO_ID)
      .neq('category', 'ACTIVITY')
      .order('id', { ascending: true });

    if (!error && data && data.length > 0) return data;
    const local = getLocal('attractions') || initialContent.attractions;
    return local.filter((a: any) => a.id !== LOGO_ID && a.category !== 'ACTIVITY');
  },

  saveAttraction: async (attraction: AttractionDetail) => {
    const { error } = await supabase.from('attractions').upsert(attraction);
    if (error) throw error;
    setLocal('attractions', await db.getAttractions());
  },

  deleteAttraction: async (id: string) => {
    await supabase.from('attractions').delete().eq('id', id);
    setLocal('attractions', await db.getAttractions());
  },

  getUMKM: async (): Promise<UMKM[]> => {
    const { data, error } = await supabase.from('umkm').select('*').order('id', { ascending: true });
    if (!error && data && data.length > 0) return data;
    return getLocal('umkm') || initialContent.umkm;
  },

  saveUMKM: async (item: UMKM) => {
    const { error } = await supabase.from('umkm').upsert(item);
    if (error) throw error;
    setLocal('umkm', await db.getUMKM());
  },

  deleteUMKM: async (id: string) => {
    await supabase.from('umkm').delete().eq('id', id);
    setLocal('umkm', await db.getUMKM());
  },

  getBirds: async (): Promise<MigratoryBird[]> => {
    const { data, error } = await supabase.from('birds').select('*').order('id', { ascending: true });
    if (!error && data && data.length > 0) return data;
    return getLocal('birds') || initialBirds;
  },

  saveBird: async (bird: MigratoryBird) => {
    const payload = {
      id: bird.id,
      name: bird.name,
      scientific: bird.scientific,
      description: bird.description,
      image: bird.image,
      status: bird.status
    };
    const { error } = await supabase.from('birds').upsert(payload);
    if (error) throw error;
    setLocal('birds', await db.getBirds());
  },

  deleteBird: async (id: string) => {
    await supabase.from('birds').delete().eq('id', id);
    setLocal('birds', await db.getBirds());
  },

  getActivities: async (): Promise<CommunityActivity[]> => {
    const { data, error } = await supabase
      .from('attractions')
      .select('*')
      .eq('category', 'ACTIVITY')
      .order('id', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((d: any) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        imageUrl: d.imageUrl,
        galleryImages: d.galleryImages || [],
        date: d.bestTime
      }));
    }
    return getLocal('activities') || initialContent.activities;
  },

  saveActivity: async (activity: CommunityActivity) => {
    const payload = {
      id: activity.id,
      title: activity.title,
      description: activity.description,
      imageUrl: activity.imageUrl,
      galleryImages: activity.galleryImages,
      bestTime: activity.date,
      category: 'ACTIVITY',
      tagline: 'Community Activity',
      fullDescription: activity.description,
      features: [],
      tips: []
    };
    const { error } = await supabase.from('attractions').upsert(payload);
    if (error) throw error;
    setLocal('activities', await db.getActivities());
  },

  deleteActivity: async (id: string) => {
    await supabase.from('attractions').delete().eq('id', id);
    setLocal('activities', await db.getActivities());
  }
};
