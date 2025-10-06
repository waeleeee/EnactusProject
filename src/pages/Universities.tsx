import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon, AcademicCapIcon, StarIcon, GlobeAltIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { UniversityProgram, FavoriteProgram } from '../types';
import { useAppStore } from '../store';
import { programsApi } from '../services/api';

const Universities: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { language, favoritePrograms, addFavoriteProgram, removeFavoriteProgram } = useAppStore();
  const [universities, setUniversities] = useState<UniversityProgram[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<UniversityProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string>('');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [minScore, setMinScore] = useState<string>('');
  const [maxScore, setMaxScore] = useState<string>('');
  const [showOnlyWithScores, setShowOnlyWithScores] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Load universities data from backend API
  useEffect(() => {
    const loadUniversities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch programs from backend API
        const programsData = await programsApi.getAll();
        
        // Transform data to match our interface
        const transformedData: UniversityProgram[] = programsData.map((item: any, index: number) => {
          return {
            id: item.id?.toString() || `program-${index}`,
            university: item.university?.name || 'Unknown University',
            degree: item.degree || '',
            duration: item.duration || '',
            special_note: item.special_note || '',
            field: item.field || '',
            score: item.score || '',
            code: item.code || '',
            specialization: item.specialization || '',
            website: item.university?.website || '',
            email: item.university?.email || '',
            phone: item.university?.phone || '',
            address: item.university?.address || '',
            region: item.university?.region || '',
            regionFr: item.university?.regionFr || ''
          };
        });
        
        setUniversities(transformedData);
        setFilteredUniversities(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load universities data');
        console.error('Error loading universities:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUniversities();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = universities;

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.code.includes(searchTerm)
      );
    }

    // Field filter
    if (selectedField) {
      filtered = filtered.filter(program => program.field === selectedField);
    }

    // University filter
    if (selectedUniversity) {
      filtered = filtered.filter(program => program.university === selectedUniversity);
    }

    // Score filters
    if (minScore) {
      filtered = filtered.filter(program => {
        const score = parseFloat(program.score);
        return !isNaN(score) && score >= parseFloat(minScore);
      });
    }

    if (maxScore) {
      filtered = filtered.filter(program => {
        const score = parseFloat(program.score);
        return !isNaN(score) && score <= parseFloat(maxScore);
      });
    }

    // Show only programs with scores
    if (showOnlyWithScores) {
      filtered = filtered.filter(program => program.score && program.score.trim() !== '');
    }

    setFilteredUniversities(filtered);
    setCurrentPage(1);
  }, [universities, searchTerm, selectedField, selectedUniversity, minScore, maxScore, showOnlyWithScores]);

  // Get unique values for filters
  const uniqueFields = Array.from(new Set(universities.map(p => p.field))).sort();
  const uniqueUniversities = Array.from(new Set(universities.map(p => p.university))).sort();

  // Pagination
  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUniversities = filteredUniversities.slice(startIndex, endIndex);

  // Check if program is in favorites
  const isFavorite = (programId: string) => {
    return favoritePrograms.some((fav: FavoriteProgram) => fav.programId === programId);
  };

  // Toggle favorite
  const toggleFavorite = (program: UniversityProgram) => {
    if (isFavorite(program.id)) {
      removeFavoriteProgram(program.id);
    } else {
      addFavoriteProgram({
        id: program.id,
        programId: program.id,
        program,
        addedAt: new Date(),
        notes: ''
      });
    }
  };

  // Get score category color
  const getScoreCategory = (score: string) => {
    const numScore = parseFloat(score);
    if (isNaN(numScore)) return 'text-gray-500';
    if (numScore >= 150) return 'text-green-600 font-semibold';
    if (numScore >= 120) return 'text-blue-600 font-semibold';
    if (numScore >= 100) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  // Group programs by degree
  const groupedByDegree: Record<string, UniversityProgram[]> = {};
  filteredUniversities.forEach(program => {
    if (!groupedByDegree[program.degree]) {
      groupedByDegree[program.degree] = [];
    }
    groupedByDegree[program.degree].push(program);
  });

  // Degree details modal state (for future use)
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'الجامعات والمعاهد العليا' : 'Universités et Instituts Supérieurs'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {language === 'ar' 
              ? `اكتشف ${universities.length} برنامج دراسي في الجامعات التونسية`
              : `Découvrez ${universities.length} programmes d'études dans les universités tunisiennes`
            }
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'البحث' : 'Recherche'}
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'ar' ? 'البحث في البرامج...' : 'Rechercher des programmes...'}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Field Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'الشعبة' : 'Section'}
              </label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">{language === 'ar' ? 'جميع الشعب' : 'Toutes les sections'}</option>
                {uniqueFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>

            {/* University Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'الجامعة' : 'Université'}
              </label>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">{language === 'ar' ? 'جميع الجامعات' : 'Toutes les universités'}</option>
                {uniqueUniversities.map(university => (
                  <option key={university} value={university}>{university}</option>
                ))}
              </select>
            </div>

            {/* Min Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'الحد الأدنى' : 'Score min'}
              </label>
              <input
                type="number"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Max Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'الحد الأقصى' : 'Score max'}
              </label>
              <input
                type="number"
                value={maxScore}
                onChange={(e) => setMaxScore(e.target.value)}
                placeholder="200"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Additional Filters */}
          <div className="mt-4 flex items-center space-x-4 rtl:space-x-reverse">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showOnlyWithScores}
                onChange={(e) => setShowOnlyWithScores(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'إظهار البرامج ذات النقاط فقط' : 'Afficher seulement les programmes avec scores'}
              </span>
            </label>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' 
                ? `تم العثور على ${filteredUniversities.length} برنامج`
                : `${filteredUniversities.length} programme(s) trouvé(s)`
              }
            </p>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">
                {language === 'ar' ? 'مرتبة حسب الدرجة' : 'Triés par diplôme'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Programs by Degree */}
        <div className="space-y-12 mt-8">
          {Object.entries(groupedByDegree).map(([degree, programs]) => (
            <section key={degree} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2
                className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4 cursor-pointer hover:underline"
                onClick={() => setSelectedDegree(degree)}
              >
                {degree}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-200">{language === 'ar' ? 'الجامعة/المعهد' : 'Université/Institut'}</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-200">{language === 'ar' ? 'التخصص' : 'Spécialité'}</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-200">{language === 'ar' ? 'الرمز' : 'Code'}</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-200">{language === 'ar' ? 'الشعبة' : 'Section'}</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-200">{language === 'ar' ? 'النقطة الدنيا' : 'Score min'}</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-200">{language === 'ar' ? 'الموقع الإلكتروني' : 'Site web'}</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-200">{language === 'ar' ? 'مفضلة' : 'Favori'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {programs.map((program) => (
                      <tr key={program.id} className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <div>
                            <div className="font-medium">{program.university}</div>
                            {program.region && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {language === 'ar' ? program.region : program.regionFr}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{program.specialization || '-'}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-mono text-gray-700 dark:text-gray-300">{program.code}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{program.field}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          {program.score && program.score.trim() !== '' ? (
                            <span className={getScoreCategory(program.score)}>{parseFloat(program.score).toFixed(3)}</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          {program.website ? (
                            <a
                              href={program.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                            >
                              <GlobeAltIcon className="h-4 w-4 mr-1" />
                              {language === 'ar' ? 'زيارة' : 'Visiter'}
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          <button
                            onClick={() => toggleFavorite(program)}
                            className={`p-1 rounded-full transition-colors ${
                              isFavorite(program.id)
                                ? 'text-yellow-500 hover:text-yellow-600'
                                : 'text-gray-400 hover:text-yellow-500'
                            }`}
                          >
                            {isFavorite(program.id) ? (
                              <StarSolidIcon className="h-5 w-5" />
                            ) : (
                              <StarIcon className="h-5 w-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex justify-center"
          >
            <nav className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {language === 'ar' ? 'السابق' : 'Précédent'}
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {language === 'ar' ? 'التالي' : 'Suivant'}
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Universities; 