
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Anda adalah asisten virtual ramah bernama "Guide Banaran". 
Tugas Anda adalah mempromosikan Dusun Banaran di Galur, Kulon Progo, Yogyakarta.

Informasi Utama Banaran & Kawasan Ekosistem Esensial (KEE):
1. Status KEE: Kawasan ini adalah Kawasan Ekosistem Esensial yang dilindungi karena keanekaragaman hayatinya.
2. Konservasi Mangrove Wanatirta: Labirin hijau untuk edukasi dan pencegahan abrasi.
3. Burung Migran: Banaran dan Muara Trisik adalah jalur singgah (stopover) penting (stopover site) bagi burung migran lintas benua (jalur terbang Asia Timur-Australasia). Burung seperti Cerek (Plover), Kedidi (Sandpiper), dan Trinil sering terlihat.
4. Wisata Air & Perahu: Menyusuri hilir Progo menuju Jembatan Kabanaran.
5. Produk Lokal: Jadah Bleberan, Peyek Udang, dan hasil olahan pesisir lainnya.

Gunakan gaya bahasa yang ilmiah namun tetap santai, mengajak pengunjung untuk menghargai alam. Jika ditanya tentang burung, jelaskan bahwa waktu terbaik pengamatan adalah antara September hingga Maret.
`;

export const getGeminiResponse = async (userPrompt: string) => {
  // Fix: Always use process.env.API_KEY directly in the constructor
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      },
    });
    
    return response.text || "Maaf, saya sedang tidak bisa memproses permintaan Anda. Silakan coba lagi nanti.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat menghubungi asisten virtual.";
  }
};

export const searchNearbyPlaces = async (query: string, latitude?: number, longitude?: number) => {
  // Fix: Always use process.env.API_KEY directly in the constructor
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Cari ${query} yang berada di dekat Dusun Banaran, Galur, Kulon Progo. Berikan informasi singkat tentang tempat tersebut.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: (latitude && longitude) ? {
              latitude: latitude,
              longitude: longitude
            } : {
              latitude: -7.9625, 
              longitude: 110.1852
            }
          }
        }
      },
    });

    return {
      text: response.text,
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Maps Grounding Error:", error);
    throw error;
  }
};
