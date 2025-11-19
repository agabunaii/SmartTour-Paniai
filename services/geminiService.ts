import { GoogleGenAI } from "@google/genai";
import { Destination } from "../types";

const apiKey = process.env.API_KEY || ''; 

// Safe initialization logic handled in the component to avoid crash if key is missing
export const createClient = () => {
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateTourGuideResponse = async (
  history: {role: string, text: string}[], 
  userMessage: string,
  destinations: Destination[]
): Promise<string> => {
  const client = createClient();
  if (!client) return "Mohon maaf, API Key Gemini belum dikonfigurasi.";

  const destinationContext = destinations.map(d => 
    `- ${d.name} (${d.category}): ${d.description}. Fasilitas: ${d.facilities.join(', ')}.`
  ).join('\n');

  const systemInstruction = `
    Anda adalah "SmartGuide Paniai", asisten virtual cerdas untuk aplikasi pariwisata SmartTour Paniai.
    Tugas anda adalah membantu wisatawan mengetahui tentang Kabupaten Paniai, Papua Tengah.
    
    Gunakan data berikut sebagai referensi utama:
    ${destinationContext}
    
    Pengetahuan tambahan:
    - Ibu kota Paniai adalah Enarotali.
    - Terkenal dengan Danau Paniai (salah satu danau terindah).
    - Suku asli adalah Suku Mee.
    - Kebudayaan: Noken, Tarian Perang, Bakar Batu.
    
    Jawablah dengan ramah, informatif, dan mengajak orang berkunjung. Jika ditanya tentang tempat yang tidak ada di data, berikan informasi umum tentang Paniai atau sarankan tempat yang mirip dari data.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Maaf, saya tidak dapat memproses permintaan saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat menghubungi layanan AI. Silakan coba lagi nanti.";
  }
};