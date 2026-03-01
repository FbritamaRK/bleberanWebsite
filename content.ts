
import { AttractionDetail, UMKM, CommunityActivity } from './types';

export interface SiteConfig {
  contact: {
    phone: string;
    email: string;
    address: string;
    whatsappNumber: string;
  };
  attractions: AttractionDetail[];
  umkm: UMKM[];
  activities: CommunityActivity[];
}

export const initialContent: SiteConfig = {
  contact: {
    phone: "+62 812 3456 7890",
    email: "kkn.banaran@kulonprogo.go.id",
    address: "Bleberan, Banaran, Galur, Kulon Progo, DIY 55661",
    whatsappNumber: "6281234567890"
  },
  attractions: [
    {
      id: '1',
      title: 'Hutan Mangrove Wanatirta',
      tagline: 'Labirin Hijau Pesisir Selatan',
      description: 'Jelajahi jembatan bambu estetik di tengah rimbunnya hutan mangrove yang menenangkan.',
      fullDescription: 'Hutan Mangrove Wanatirta adalah mahakarya konservasi mandiri warga Dusun Bleberan. Dengan jembatan bambu sepanjang lebih dari 200 meter yang membelah hutan, Anda akan diajak masuk ke dalam ekosistem yang asri.',
      imageUrl: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1596333522244-2db242738371?auto=format&fit=crop&q=80&w=1200'
      ],
      features: ['Mangrove Trekking', 'Menara Pandang 5m', 'Edukasi Pembibitan', 'Spot Foto Instagramable'],
      bestTime: '07:30 - 09:30 WIB',
      category: 'Ekowisata',
      price: 'Rp 10.000 / orang',
      tips: ['Gunakan alas kaki anti-slip', 'Bawa kamera dengan lensa wide']
    },
    {
      id: '2',
      title: 'Susur Sungai Kabanaran',
      tagline: 'Simfoni Hilir Sungai Progo',
      description: 'Petualangan air menyusuri sungai menuju kemegahan Jembatan Kabanaran yang ikonik.',
      fullDescription: 'Nikmati perspektif berbeda dari keindahan Banaran melalui jalur sungai. Menggunakan perahu motor tradisional yang aman, Anda akan dibawa melintasi hilir Sungai Progo yang tenang menuju Jembatan Kabanaran.',
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-e94e1b3fe520?auto=format&fit=crop&q=80&w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=1200'
      ],
      features: ['Sewa Perahu Motor', 'Life Jacket (Safety)', 'Pemandu Lokal Berpengalaman'],
      bestTime: '16:30 - 17:45 (Golden Hour)',
      category: 'Petualangan',
      price: 'Rp 50.000 / perahu',
      tips: ['Simpan barang elektronik di tas kedap air', 'Pesan perahu 30 menit sebelum sunset']
    },
    {
      id: '3',
      title: 'Camping Ground Banaran',
      tagline: 'Malam Syahdu di Tepi Sungai',
      description: 'Rasakan kedamaian bermalam di bawah bintang-bintang dengan udara pesisir yang sejuk.',
      fullDescription: 'Lepaskan penat dari hiruk-pikuk kota dengan berkemah di tepi sungai Banaran. Area camping kami menawarkan tanah lapang yang rata dengan rumput hijau dan akses mudah ke fasilitas air bersih.',
      imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=1200'
      ],
      features: ['Area Api Unggun Mandiri', 'Fasilitas Toilet Bersih', 'Sewa Peralatan Tenda'],
      bestTime: 'Check-in: 16:00 WIB',
      category: 'Rekreasi',
      price: 'Rp 35.000 / spot tenda',
      tips: ['Bawa powerbank ekstra', 'Jaga kebersihan dengan membawa kantong sampah sendiri']
    }
  ],
  umkm: [
    {
      id: '1',
      name: 'Jadah Gurih Bleberan',
      description: 'Ketan pilihan dengan parutan kelapa muda, disajikan hangat.',
      imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c39bb8ed2b1?auto=format&fit=crop&q=80&w=600',
      priceRange: 'Rp 10.000 - 45.000',
      whatsapp: '6281234567890'
    },
    {
      id: '2',
      name: 'Peyek Udang & Wader',
      description: 'Camilan renyah hasil tangkapan segar nelayan lokal.',
      imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=600',
      priceRange: 'Rp 15.000 - 35.000',
      whatsapp: '6281234567890'
    }
  ],
  activities: [
    {
      id: 'act1',
      title: 'Festival Mangrove Banaran',
      description: 'Perayaan tahunan pelestarian lingkungan yang melibatkan seluruh warga dusun. Kegiatan meliputi penanaman bibit mangrove bersama, lomba perahu tradisional, dan pameran kerajinan pesisir. Acara ini bertujuan untuk meningkatkan kesadaran akan pentingnya ekosistem mangrove bagi perlindungan garis pantai.',
      imageUrl: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=1200',
      galleryImages: [
        'https://images.unsplash.com/photo-1596333522244-2db242738371?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=1200'
      ],
      date: 'Setiap Bulan Agustus'
    }
  ]
};
