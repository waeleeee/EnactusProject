import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon, GlobeAltIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, AcademicCapIcon, MapIcon } from '@heroicons/react/24/outline';
import { universitiesApi } from '../services/api';
import UniversitiesMap from '../components/UniversitiesMap';

interface University {
  _id: string;
  name: string;
  nameFr: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  region: string;
  regionFr: string;
}

const UniversitiesDirectory: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'region'>('name');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load universities from backend API
  useEffect(() => {
    const loadUniversities = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await universitiesApi.getAll();
        setUniversities(data);
        setFilteredUniversities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load universities');
        console.error('Error loading universities:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUniversities();
  }, []);
  
  // Filter and search universities
  useEffect(() => {
    let filtered = universities;
    
    // Filter by region
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(uni => uni.region === selectedRegion);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(uni => 
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.nameFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (uni.address && uni.address.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Sort universities
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return language === 'ar' ? a.name.localeCompare(b.name) : a.nameFr.localeCompare(b.nameFr);
      } else {
        return a.region.localeCompare(b.region);
      }
    });
    
    setFilteredUniversities(filtered);
  }, [universities, searchTerm, selectedRegion, sortBy, language]);

  // Get region color for badges
  const getRegionColor = (region: string) => {
    switch (region) {
      case 'الشمال':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'الوسط':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'الجنوب':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

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
            {language === 'ar' ? 'دليل الجامعات التونسية' : 'Répertoire des Universités Tunisiennes'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {language === 'ar' 
              ? `اكتشف ${universities.length} جامعة ومعهد عالي في تونس`
              : `Découvrez ${universities.length} universités et instituts supérieurs en Tunisie`
            }
          </p>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <AcademicCapIcon className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'قائمة' : 'Liste'}
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'map'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <MapIcon className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'خريطة' : 'Carte'}
              </button>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'ar' 
                ? `${filteredUniversities.length} جامعة`
                : `${filteredUniversities.length} université(s)`
              }
            </div>
          </div>
        </motion.div>
        
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'البحث' : 'Recherche'}
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'ar' ? 'البحث في الجامعات...' : 'Rechercher des universités...'}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'المنطقة' : 'Région'}
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">{language === 'ar' ? 'جميع المناطق' : 'Toutes les régions'}</option>
                <option value="الشمال">{language === 'ar' ? 'الشمال' : 'Nord'}</option>
                <option value="الوسط">{language === 'ar' ? 'الوسط' : 'Centre'}</option>
                <option value="الجنوب">{language === 'ar' ? 'الجنوب' : 'Sud'}</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'ترتيب حسب' : 'Trier par'}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'region')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="name">{language === 'ar' ? 'الاسم' : 'Nom'}</option>
                <option value="region">{language === 'ar' ? 'المنطقة' : 'Région'}</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {viewMode === 'list' ? (
          /* Universities Grid */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredUniversities.map((university, index) => (
              <motion.div
                key={university._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                {/* University Header */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {language === 'ar' ? university.name : university.nameFr}
                  </h3>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRegionColor(university.region)}`}>
                    {language === 'ar' ? university.region : university.regionFr}
                  </span>
                </div>
                
                {/* Contact Information */}
                <div className="space-y-2">
                  {university.address && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{university.address}</span>
                    </div>
                  )}
                  
                  {university.email && (
                    <a
                      href={`mailto:${university.email}`}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <EnvelopeIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{university.email}</span>
                    </a>
                  )}
                  
                  {university.phone && (
                    <a
                      href={`tel:${university.phone}`}
                      className="flex items-center text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <PhoneIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{university.phone}</span>
                    </a>
                  )}
                  
                  {university.website && (
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      <GlobeAltIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{language === 'ar' ? 'الموقع الإلكتروني' : 'Site web'}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Map View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <UniversitiesMap 
              height="600px"
              showFilters={false}
              universities={filteredUniversities}
            />
          </motion.div>
        )}

        {/* No Results */}
        {filteredUniversities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <AcademicCapIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'لا توجد نتائج' : 'Aucun résultat'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' 
                ? 'جرب تغيير معايير البحث أو الفلترة'
                : 'Essayez de modifier vos critères de recherche ou de filtrage'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UniversitiesDirectory; 