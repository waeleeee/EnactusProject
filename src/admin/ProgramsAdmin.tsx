import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi';

interface Program {
  _id: string;
  university: {
    name: string;
    nameFr: string;
  };
  degree: string;
  duration?: string;
  special_note?: string;
  field: string;
  score?: string;
  code?: string;
  specialization?: string;
}

interface ProgramFormData {
  university: string;
  degree: string;
  field: string;
  specialization: string;
  duration: string;
  score: string;
  code: string;
  special_note: string;
}

const ProgramsAdmin: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real data from backend
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [programsData, universitiesData] = await Promise.all([
        adminApi.getPrograms(),
        adminApi.getUniversities()
      ]);
      setPrograms(programsData);
      setUniversities(universitiesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPrograms = programs.filter(program => {
    const universityName = program.university?.name || '';
    const matchesSearch = universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (program.specialization && program.specialization.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesField = filterField === 'all' || program.field === filterField;
    return matchesSearch && matchesField;
  });

  const handleAdd = () => {
    setEditingProgram(null);
    setIsModalOpen(true);
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await adminApi.deleteProgram(id);
        setPrograms(programs.filter(p => p._id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete program');
        console.error('Error deleting program:', err);
      }
    }
  };

  const handleSave = async (programData: ProgramFormData) => {
    try {
      if (editingProgram) {
        // Update existing program
        const updatedProgram = await adminApi.updateProgram(editingProgram._id, {
          university: programData.university,
          degree: programData.degree,
          duration: programData.duration,
          special_note: programData.special_note,
          field: programData.field,
          score: programData.score,
          code: programData.code,
          specialization: programData.specialization
        });
        setPrograms(programs.map(p => 
          p._id === editingProgram._id ? updatedProgram : p
        ));
      } else {
        // Add new program
        if (!programData.university || !programData.degree || !programData.field) {
          setError('University, degree, and field are required');
          return;
        }
        const newProgram = await adminApi.createProgram({
          university: programData.university,
          degree: programData.degree,
          duration: programData.duration,
          special_note: programData.special_note,
          field: programData.field,
          score: programData.score,
          code: programData.code,
          specialization: programData.specialization
        });
        setPrograms([newProgram, ...programs]);
      }
      setIsModalOpen(false);
      setEditingProgram(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save program');
      console.error('Error saving program:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading programs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Programs Management ({programs.length} programs)
        </h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Program
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
              placeholder="Search programs..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Field
            </label>
            <select
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Fields</option>
              {Array.from(new Set(programs.map(p => p.field))).map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  University
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Degree
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Field
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrograms.map((program) => (
                <tr key={program._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {program.university?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.degree}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.field}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.specialization || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.duration || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.score || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(program)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(program._id)}
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

      {/* Modal */}
      {isModalOpen && (
        <ProgramModal
          program={editingProgram}
          universities={universities}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

interface ProgramModalProps {
  program: Program | null;
  universities: any[];
  onSave: (data: ProgramFormData) => void;
  onClose: () => void;
}

const ProgramModal: React.FC<ProgramModalProps> = ({ program, universities, onSave, onClose }) => {
  const [formData, setFormData] = useState<ProgramFormData>({
    university: program?.university?.name || '',
    degree: program?.degree || '',
    field: program?.field || '',
    specialization: program?.specialization || '',
    duration: program?.duration || '',
    score: program?.score || '',
    code: program?.code || '',
    special_note: program?.special_note || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {program ? 'Edit Program' : 'Add New Program'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">University</label>
              <select
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select University</option>
                {universities.map((uni) => (
                  <option key={uni._id} value={uni.name}>
                    {uni.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Field</label>
              <input
                type="text"
                name="field"
                value={formData.field}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Score</label>
              <input
                type="text"
                name="score"
                value={formData.score}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Special Note</label>
              <input
                type="text"
                name="special_note"
                value={formData.special_note}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {program ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProgramsAdmin; 