import React from 'react';
import { Destination } from '../types';
import { MapPin, Star, Info } from 'lucide-react';

interface Props {
  destinations: Destination[];
  title: string;
  subtitle?: string;
}

const DestinationsList: React.FC<Props> = ({ destinations, title, subtitle }) => {
  return (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      
      {destinations.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">Tidak ada destinasi yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={dest.imageUrl} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm">
                  {dest.category}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-gray-800 line-clamp-1">{dest.name}</h3>
                  <div className="flex items-center text-yellow-500 bg-yellow-50 px-1.5 py-0.5 rounded">
                    <Star size={14} fill="currentColor" />
                    <span className="ml-1 text-sm font-bold">{dest.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{dest.description}</p>
                
                <div className="mt-auto space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {dest.facilities.slice(0, 3).map((fac, idx) => (
                      <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {fac}
                      </span>
                    ))}
                    {dest.facilities.length > 3 && (
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{dest.facilities.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                     <div className="flex items-center">
                       <MapPin size={14} className="mr-1 text-emerald-600" />
                       <span>Paniai</span>
                     </div>
                     <button className="text-emerald-600 font-semibold flex items-center hover:text-emerald-700 transition-colors">
                       Detail <Info size={14} className="ml-1" />
                     </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationsList;