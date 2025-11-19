import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Destination } from '../types';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapComponentProps {
  destinations: Destination[];
}

const MapComponent: React.FC<MapComponentProps> = ({ destinations }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-[500px] w-full bg-gray-200 animate-pulse flex items-center justify-center text-gray-500">Memuat Peta...</div>;
  }

  // Center of Paniai
  const center: [number, number] = [-3.9333, 136.3667]; 

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg border-4 border-emerald-50 relative z-0">
      <MapContainer center={center} zoom={11} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinations.map((dest) => (
          <Marker key={dest.id} position={[dest.location.lat, dest.location.lng]}>
            <Popup>
              <div className="text-center">
                <img src={dest.imageUrl} alt={dest.name} className="w-full h-24 object-cover rounded mb-2" />
                <h3 className="font-bold text-emerald-800">{dest.name}</h3>
                <p className="text-xs text-gray-600">{dest.category}</p>
                <div className="text-yellow-500 text-xs">★ {dest.rating}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;