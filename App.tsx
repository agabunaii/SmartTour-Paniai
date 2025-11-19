import React, { useState } from 'react';
import { INITIAL_DESTINATIONS } from './services/data';
import { Destination, Tab } from './types';
import DestinationsList from './components/DestinationsList';
import MapComponent from './components/MapComponent';
import RecommendationEngine from './components/RecommendationEngine';
import AdminDashboard from './components/AdminDashboard';
import ChatAssistant from './components/ChatAssistant';
import { Map, Home, Sparkles, Settings, MessageSquareText, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavButton = ({ tab, icon: Icon, label }: { tab: Tab, icon: any, label: string }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        activeTab === tab
          ? 'bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-200'
          : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
              SP
            </div>
            <div>
               <h1 className="text-xl font-extrabold text-emerald-950 tracking-tight">SmartTour Paniai</h1>
               <p className="text-[10px] text-gray-500 uppercase tracking-wider">WebGIS & Recommendation System</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavButton tab="home" icon={Home} label="Beranda" />
            <NavButton tab="map" icon={Map} label="Peta WebGIS" />
            <NavButton tab="recommendation" icon={Sparkles} label="Rekomendasi" />
            <NavButton tab="ai-guide" icon={MessageSquareText} label="Smart Guide" />
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            <NavButton tab="admin" icon={Settings} label="Admin" />
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-2 shadow-lg">
            <NavButton tab="home" icon={Home} label="Beranda" />
            <NavButton tab="map" icon={Map} label="Peta WebGIS" />
            <NavButton tab="recommendation" icon={Sparkles} label="Rekomendasi" />
            <NavButton tab="ai-guide" icon={MessageSquareText} label="Smart Guide" />
            <NavButton tab="admin" icon={Settings} label="Admin Panel" />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-80px)]">
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden h-[400px] shadow-2xl">
              <img 
                src="https://picsum.photos/1200/600?random=99" 
                alt="Danau Paniai" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Jelajahi Keindahan <br/><span className="text-emerald-400">Paniai, Papua Tengah</span></h2>
                <p className="text-gray-200 max-w-2xl text-lg mb-6">Temukan surga tersembunyi di Pegunungan Tengah Papua. Nikmati pesona Danau Paniai dan kekayaan budaya Suku Mee.</p>
                <div className="flex gap-4">
                  <button onClick={() => setActiveTab('map')} className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition shadow-lg hover:scale-105 transform">Lihat Peta</button>
                  <button onClick={() => setActiveTab('recommendation')} className="bg-white/20 backdrop-blur-md text-white border border-white/50 px-6 py-3 rounded-full font-bold hover:bg-white/30 transition">Cari Rekomendasi</button>
                </div>
              </div>
            </div>

            {/* Featured Section */}
            <DestinationsList 
              destinations={destinations.slice(0, 3)} 
              title="Destinasi Populer" 
              subtitle="Pilihan favorit wisatawan di Kabupaten Paniai" 
            />

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Map size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">WebGIS Interaktif</h3>
                <p className="text-gray-600 text-sm">Peta digital yang menampilkan lokasi wisata secara akurat menggunakan Leaflet.js.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Rekomendasi Cerdas</h3>
                <p className="text-gray-600 text-sm">Sistem Content-Based Filtering yang menyesuaikan saran wisata dengan preferensi Anda.</p>
              </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquareText size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Smart Guide AI</h3>
                <p className="text-gray-600 text-sm">Asisten virtual berbasis Gemini AI yang siap menjawab pertanyaan seputar Paniai.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-end">
               <div>
                 <h2 className="text-3xl font-bold text-emerald-900">Peta Digital Wisata</h2>
                 <p className="text-gray-600">Sebaran lokasi wisata alam dan budaya di Kabupaten Paniai</p>
               </div>
            </div>
            <MapComponent destinations={destinations} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {destinations.map(d => (
                    <button key={d.id} className="bg-white p-3 rounded shadow text-sm text-left hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition">
                        <span className="font-bold block text-gray-800">{d.name}</span>
                        <span className="text-xs text-gray-500">{d.category}</span>
                    </button>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendation' && (
          <div className="animate-fade-in max-w-5xl mx-auto">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-emerald-900 mb-3">Temukan Wisata Impianmu</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Sistem kami menggunakan metode Content-Based Filtering untuk mencocokkan karakteristik destinasi dengan minat Anda.</p>
             </div>
             <RecommendationEngine allDestinations={destinations} />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="animate-fade-in">
            <AdminDashboard destinations={destinations} setDestinations={setDestinations} />
          </div>
        )}

        {activeTab === 'ai-guide' && (
           <div className="animate-fade-in max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-emerald-900 mb-2">Smart Guide Paniai</h2>
                <p className="text-gray-600">Tanyakan apa saja tentang sejarah, rute, atau tips perjalanan di Paniai.</p>
             </div>
             <ChatAssistant destinations={destinations} />
           </div>
        )}
      </main>

      <footer className="bg-emerald-900 text-emerald-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold text-lg mb-2">SmartTour Paniai</p>
          <p className="text-sm opacity-80">Sistem Informasi Pariwisata Berbasis WebGIS & Content-Based Filtering</p>
          <p className="text-xs mt-4 text-emerald-400">&copy; 2025 Marselus Bunai - Universitas PGRI Yogyakarta</p>
        </div>
      </footer>
    </div>
  );
};

export default App;