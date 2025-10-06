import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../services/adminApi';

interface University {
  _id: string;
  name: string;
  nameFr: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  region: 'الشمال' | 'الوسط' | 'الجنوب';
  regionFr: 'Nord' | 'Centre' | 'Sud';
}

const UniversitiesAdmin: React.FC = () => {
  const { t } = useTranslation();
  const [universities, setUniversities] = useState<University[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real data from backend
  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.getUniversities();
      setUniversities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch universities');
      console.error('Error fetching universities:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUniversities = universities.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         university.nameFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (university.address && university.address.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRegion = filterRegion === 'all' || university.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  const handleAdd = () => {
    setEditingUniversity(null);
    setIsModalOpen(true);
  };

  const handleEdit = (university: University) => {
    setEditingUniversity(university);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      try {
        await adminApi.deleteUniversity(id);
        setUniversities(universities.filter(u => u._id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete university');
        console.error('Error deleting university:', err);
      }
    }
  };

  const handleSave = async (universityData: Partial<University>) => {
    try {
      if (editingUniversity) {
        // Update existing university
        const updatedUniversity = await adminApi.updateUniversity(editingUniversity._id, universityData);
        setUniversities(universities.map(u => 
          u._id === editingUniversity._id ? updatedUniversity : u
        ));
      } else {
        // Add new university
        if (!universityData.name || !universityData.nameFr || !universityData.region || !universityData.regionFr) {
          setError('Name, French name, region, and French region are required');
          return;
        }
        const newUniversity = await adminApi.createUniversity({
          name: universityData.name,
          nameFr: universityData.nameFr,
          website: universityData.website,
          email: universityData.email,
          phone: universityData.phone,
          address: universityData.address,
          region: universityData.region,
          regionFr: universityData.regionFr
        });
        setUniversities([newUniversity, ...universities]);
      }
      setIsModalOpen(false);
      setEditingUniversity(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save university');
      console.error('Error saving university:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading universities...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Universities Management ({universities.length} universities)
        </h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New University
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search universities..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Region
            </label>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Regions</option>
              <option value="الشمال">North</option>
              <option value="الوسط">Center</option>
              <option value="الجنوب">South</option>
            </select>
          </div>
        </div>
      </div>

      {/* Universities Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUniversities.map((university) => (
                <tr key={university._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{university.name}</div>
                      <div className="text-sm text-gray-500">{university.nameFr}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {university.address || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      university.region === 'الشمال' ? 'bg-blue-100 text-blue-800' :
                      university.region === 'الوسط' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {university.region}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {university.email && <div>{university.email}</div>}
                      {university.phone && <div>{university.phone}</div>}
                      {university.website && <div className="text-blue-600">{university.website}</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(university)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(university._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* University Modal */}
      {isModalOpen && (
        <UniversityModal
          university={editingUniversity}
          onSave={handleSave}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUniversity(null);
            setError(null);
          }}
        />
      )}
    </div>
  );
};

// University Modal Component
interface UniversityModalProps {
  university: University | null;
  onSave: (data: Partial<University>) => void;
  onClose: () => void;
}

const UniversityModal: React.FC<UniversityModalProps> = ({ university, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: university?.name || '',
    nameFr: university?.nameFr || '',
    website: university?.website || '',
    email: university?.email || '',
    phone: university?.phone || '',
    address: university?.address || '',
    region: university?.region || 'الشمال' as const,
    regionFr: university?.regionFr || 'Nord' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {university ? 'Edit University' : 'Add New University'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name (Arabic)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name (French)
                </label>
                <input
                  type="text"
                  value={formData.nameFr}
                  onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Region (Arabic)
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    region: e.target.value as 'الشمال' | 'الوسط' | 'الجنوب',
                    regionFr: e.target.value === 'الشمال' ? 'Nord' : 
                              e.target.value === 'الوسط' ? 'Centre' : 'Sud'
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="الشمال">الشمال</option>
                  <option value="الوسط">الوسط</option>
                  <option value="الجنوب">الجنوب</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Region (French)
                </label>
                <input
                  type="text"
                  value={formData.regionFr}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {university ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UniversitiesAdmin; 