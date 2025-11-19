import { Category, Destination } from '../types';

// Coordinates approximated for Paniai, Papua
export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Danau Paniai',
    category: Category.ALAM,
    description: 'Salah satu danau terdalam di Indonesia dengan panorama pegunungan yang memukau. Cocok untuk fotografi dan menikmati ketenangan.',
    location: { lat: -3.9333, lng: 136.3667 },
    rating: 4.8,
    facilities: ['Dermaga', 'Perahu', 'Penginapan', 'Warung Makan'],
    imageUrl: 'https://picsum.photos/800/600?random=1',
    features: ['danau', 'air', 'pegunungan', 'sejuk', 'perahu', 'pemandangan']
  },
  {
    id: '2',
    name: 'Danau Tigi',
    category: Category.ALAM,
    description: 'Danau dengan ekosistem endemik dan lanskap pegunungan yang indah. Tempat yang tepat untuk melihat flora unik.',
    location: { lat: -4.0500, lng: 136.2667 },
    rating: 4.6,
    facilities: ['Toilet', 'Area Parkir'],
    imageUrl: 'https://picsum.photos/800/600?random=2',
    features: ['danau', 'ekosistem', 'pegunungan', 'tenang']
  },
  {
    id: '3',
    name: 'Festival Budaya Paniai',
    category: Category.BUDAYA,
    description: 'Acara tahunan yang menampilkan seni tradisional khas Papua, termasuk tarian perang dan musik tifa.',
    location: { lat: -3.9200, lng: 136.3500 }, // Near Enarotali
    rating: 4.9,
    facilities: ['Panggung', 'Toilet', 'Area Kuliner', 'Area Parkir'],
    imageUrl: 'https://picsum.photos/800/600?random=3',
    features: ['tarian', 'musik', 'seni', 'festival', 'adat', 'keramaian']
  },
  {
    id: '4',
    name: 'Bukit Bobaigo',
    category: Category.ALAM,
    description: 'Kawasan perbukitan dengan panorama alam yang menakjubkan, melihat hamparan danau dari ketinggian.',
    location: { lat: -3.9100, lng: 136.3800 },
    rating: 4.5,
    facilities: ['Spot Foto', 'Jalur Trekking'],
    imageUrl: 'https://picsum.photos/800/600?random=4',
    features: ['bukit', 'trekking', 'pemandangan', 'foto', 'tinggi']
  },
  {
    id: '5',
    name: 'Perkampungan Adat Enarotali',
    category: Category.BUDAYA,
    description: 'Melihat kehidupan masyarakat Suku Mee, rumah adat, dan kerajinan noken secara langsung.',
    location: { lat: -3.9250, lng: 136.3600 },
    rating: 4.7,
    facilities: ['Pusat Informasi', 'Toko Oleh-oleh'],
    imageUrl: 'https://picsum.photos/800/600?random=5',
    features: ['adat', 'suku', 'rumah', 'noken', 'sejarah', 'masyarakat']
  },
  {
    id: '6',
    name: 'Pulau Duamo',
    category: Category.ALAM,
    description: 'Pulau eksotis di tengah kawasan perairan Paniai, menawarkan ketenangan dan keindahan alam.',
    location: { lat: -3.9400, lng: 136.3700 },
    rating: 4.4,
    facilities: ['Dermaga'],
    imageUrl: 'https://picsum.photos/800/600?random=6',
    features: ['pulau', 'air', 'tenang', 'eksklusif']
  }
];

export const ALL_FACILITIES = Array.from(new Set(INITIAL_DESTINATIONS.flatMap(d => d.facilities)));
export const CBF_KEYWORDS = Array.from(new Set(INITIAL_DESTINATIONS.flatMap(d => d.features)));