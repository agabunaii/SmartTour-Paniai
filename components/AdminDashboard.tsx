import React, { useState } from 'react';
import { Category, Destination } from '../types';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

interface Props {
  destinations: Destination[];
  setDestinations: React.Dispatch<React.SetStateAction<Destination[]>>;
}

const AdminDashboard: React.FC<Props> = ({ destinations, setDestinations }) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Destination>>({});

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setDestinations(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleEditClick = (dest: Destination) => {
    setIsEditing(dest.id);
    setFormData(dest);
  };

  const handleAddNew = () => {
    const newId = (Math.random() * 10000).toFixed(0);
    const newDest: Destination = {
      id: newId,
      name: 'Destinasi Baru',
      category: Category.ALAM,
      description: 'Deskripsi destinasi baru...',
      location: { lat: -3.93, lng: 136.36 },
      rating: 0,
      facilities: [],
      imageUrl: 'https://picsum.photos/800/600',
      features: []
    };
    setDestinations(prev => [newDest, ...prev]);
    setIsEditing(newId);
    setFormData(newDest);
  };

  const handleSave = () => {
    if (isEditing && formData.name) {
      setDestinations(prev => prev.map(d => d.id === isEditing ? { ...d, ...formData } as Destination : d));
      setIsEditing(null);
      setFormData({});
    }
  };

  const handleCancel = () => {
    // If it was a new item (rating 0 and default name), remove it on cancel
    if (isEditing && formData.rating === 0 && formData.name === 'Destinasi Baru') {
      setDestinations(prev => prev.filter(d => d.id !== isEditing));
    }
    setIsEditing(null);
    setFormData({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <p className="text-gray-500 text-sm">Kelola data pariwisata (Create, Read, Update, Delete)</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={18} /> Tambah Data
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4">Nama</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Fasilitas</th>
              <th className="p-4">Rating</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {destinations.map((dest) => (
              <tr key={dest.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  {isEditing === dest.id ? (
                    <input 
                      type="text" 
                      className="border rounded p-1 w-full"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  ) : (
                    <div className="font-medium text-gray-800">{dest.name}</div>
                  )}
                </td>
                <td className="p-4">
                  {isEditing === dest.id ? (
                    <select 
                      className="border rounded p-1"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                    >
                      <option value={Category.ALAM}>{Category.ALAM}</option>
                      <option value={Category.BUDAYA}>{Category.BUDAYA}</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dest.category === Category.ALAM ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {dest.category}
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {dest.facilities.length} Fasilitas
                </td>
                <td className="p-4 font-medium">
                   {isEditing === dest.id ? (
                    <input 
                      type="number" 
                      className="border rounded p-1 w-16"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    />
                  ) : dest.rating}
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  {isEditing === dest.id ? (
                    <>
                      <button onClick={handleSave} className="text-emerald-600 hover:bg-emerald-50 p-1 rounded"><Save size={18} /></button>
                      <button onClick={handleCancel} className="text-gray-500 hover:bg-gray-100 p-1 rounded"><X size={18} /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(dest)} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(dest.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18} /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;