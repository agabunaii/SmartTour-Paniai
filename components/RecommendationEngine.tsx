import React, { useState } from 'react';
import { Category, Destination, UserPreference } from '../types';
import { ALL_FACILITIES, CBF_KEYWORDS } from '../services/data';
import { calculateRecommendations } from '../services/cbfEngine';
import DestinationsList from './DestinationsList';
import { Filter, Sparkles } from 'lucide-react';

interface Props {
  allDestinations: Destination[];
}

const RecommendationEngine: React.FC<Props> = ({ allDestinations }) => {
  const [prefs, setPrefs] = useState<UserPreference>({
    preferredCategories: [],
    preferredFacilities: [],
    keywords: []
  });

  const [results, setResults] = useState<Destination[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleCategoryToggle = (cat: Category) => {
    setPrefs(prev => ({
      ...prev,
      preferredCategories: prev.preferredCategories.includes(cat)
        ? prev.preferredCategories.filter(c => c !== cat)
        : [...prev.preferredCategories, cat]
    }));
  };

  const handleFacilityToggle = (fac: string) => {
    setPrefs(prev => ({
      ...prev,
      preferredFacilities: prev.preferredFacilities.includes(fac)
        ? prev.preferredFacilities.filter(f => f !== fac)
        : [...prev.preferredFacilities, fac]
    }));
  };

  const handleKeywordToggle = (kw: string) => {
    setPrefs(prev => ({
      ...prev,
      keywords: prev.keywords.includes(kw)
        ? prev.keywords.filter(k => k !== kw)
        : [...prev.keywords, kw]
    }));
  };

  const getRecommendations = () => {
    const recs = calculateRecommendations(allDestinations, prefs);
    setResults(recs.slice(0, 5)); // Top 5
    setHasSearched(true);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
        <div className="bg-emerald-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Filter className="w-6 h-6" />
            Preferensi Wisata Anda
          </h2>
          <p className="text-emerald-100 mt-1">Pilih apa yang Anda sukai, dan sistem cerdas kami (CBF) akan merekomendasikan tempat terbaik di Paniai.</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Kategori Wisata</h3>
            <div className="flex gap-3">
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    prefs.preferredCategories.includes(cat)
                      ? 'bg-emerald-600 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-emerald-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Keywords (Content Features) */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Apa yang Anda cari?</h3>
            <div className="flex flex-wrap gap-2">
              {CBF_KEYWORDS.map((kw) => (
                <button
                  key={kw}
                  onClick={() => handleKeywordToggle(kw)}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                    prefs.keywords.includes(kw)
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold'
                      : 'border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}
                >
                  #{kw}
                </button>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Fasilitas Dibutuhkan</h3>
            <div className="flex flex-wrap gap-2">
              {ALL_FACILITIES.map((fac) => (
                <button
                  key={fac}
                  onClick={() => handleFacilityToggle(fac)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    prefs.preferredFacilities.includes(fac)
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-100'
                  }`}
                >
                  {fac}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={getRecommendations}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-emerald-200/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Dapatkan Rekomendasi
          </button>
        </div>
      </div>

      {hasSearched && (
        <div className="animate-fade-in">
           <DestinationsList 
             destinations={results} 
             title="Hasil Rekomendasi Untuk Anda" 
             subtitle="Diurutkan berdasarkan tingkat kecocokan (Similarity Score)" 
           />
        </div>
      )}
    </div>
  );
};

export default RecommendationEngine;