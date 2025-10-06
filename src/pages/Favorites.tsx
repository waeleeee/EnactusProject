import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon, StarIcon, TrashIcon, AcademicCapIcon, GlobeAltIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { FavoriteProgram } from '../types';
import { useAppStore } from '../store';

const Favorites: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { language, favoritePrograms, removeFavoriteProgram } = useAppStore();
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteProgram[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string>('');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [sortBy, setSortBy] = useState<'addedAt' | 'university' | 'score'>('addedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...favoritePrograms];

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(fav =>
        fav.program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fav.program.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fav.program.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fav.program.code.includes(searchTerm)
      );
    }

    // Field filter
    if (selectedField) {
      filtered = filtered.filter(fav => fav.program.field === selectedField);
    }

    // University filter
    if (selectedUniversity) {
      filtered = filtered.filter(fav => fav.program.university === selectedUniversity);
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'addedAt':
          comparison = new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
          break;
        case 'university':
          comparison = a.program.university.localeCompare(b.program.university);
          break;
        case 'score':
          const scoreA = parseFloat(a.program.score) || 0;
          const scoreB = parseFloat(b.program.score) || 0;
          comparison = scoreA - scoreB;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredFavorites(filtered);
  }, [favoritePrograms, searchTerm, selectedField, selectedUniversity, sortBy, sortOrder]);

  // Get unique values for filters
  const uniqueFields = Array.from(new Set(favoritePrograms.map(fav => fav.program.field))).sort();
  const uniqueUniversities = Array.from(new Set(favoritePrograms.map(fav => fav.program.university))).sort();

  // Get score category color
  const getScoreCategory = (score: string) => {
    const numScore = parseFloat(score);
    if (isNaN(numScore)) return 'text-gray-500';
    if (numScore >= 150) return 'text-green-600 font-semibold';
    if (numScore >= 120) return 'text-blue-600 font-semibold';
    if (numScore >= 100) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(language === 'ar' ? 'ar-TN' : 'fr-TN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (favoritePrograms.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 max-w-2xl mx-auto">
              <StarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'ar' ? 'قائمة المفضلة فارغة' : 'Liste des favoris vide'}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {language === 'ar' 
                  ? 'لم تقم بإضافة أي برنامج إلى المفضلة بعد. اذهب إلى صفحة الجامعات وأضف البرامج التي تهمك!'
                  : 'Vous n\'avez pas encore ajouté de programme aux favoris. Allez sur la page des universités et ajoutez les programmes qui vous intéressent !'
                }
              </p>
              <a
                href="/universities"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <AcademicCapIcon className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'تصفح الجامعات' : 'Parcourir les universités'}
              </a>
            </div>
          </motion.div>
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
            {language === 'ar' ? 'البرامج المفضلة' : 'Programmes Favoris'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {language === 'ar' 
              ? `${favoritePrograms.length} برنامج محفوظ في المفضلة`
              : `${favoritePrograms.length} programme(s) sauvegardé(s) dans les favoris`
            }
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex items-center mb-4">
            <FunnelIcon className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {language === 'ar' ? 'الفلترة والبحث' : 'Filtres et Recherche'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'البحث في البرامج...' : 'Rechercher des programmes...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Field Filter */}
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">{language === 'ar' ? 'جميع الشعب' : 'Toutes les sections'}</option>
              {uniqueFields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>

            {/* University Filter */}
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">{language === 'ar' ? 'جميع الجامعات' : 'Toutes les universités'}</option>
              {uniqueUniversities.map(university => (
                <option key={university} value={university}>{university}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="addedAt-desc">{language === 'ar' ? 'الأحدث أولاً' : 'Plus récent'}</option>
              <option value="addedAt-asc">{language === 'ar' ? 'الأقدم أولاً' : 'Plus ancien'}</option>
              <option value="university-asc">{language === 'ar' ? 'الجامعة (أ-ي)' : 'Université (A-Z)'}</option>
              <option value="university-desc">{language === 'ar' ? 'الجامعة (ي-أ)' : 'Université (Z-A)'}</option>
              <option value="score-desc">{language === 'ar' ? 'النقطة (عالي-منخفض)' : 'Score (Haut-Bas)'}</option>
              <option value="score-asc">{language === 'ar' ? 'النقطة (منخفض-عالي)' : 'Score (Bas-Haut)'}</option>
            </select>
          </div>
        </motion.div>

        {/* Results Summary */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'ar' 
              ? `تم العثور على ${filteredFavorites.length} برنامج من أصل ${favoritePrograms.length}`
              : `${filteredFavorites.length} programme(s) trouvé(s) sur ${favoritePrograms.length}`
            }
          </p>
        </div>

        {/* Favorites List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {filteredFavorites.map((favorite) => (
            <motion.div
              key={favorite.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <StarSolidIcon className="h-5 w-5 text-yellow-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {favorite.program.university}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {language === 'ar' ? 'الدرجة:' : 'Diplôme:'}
                      </span>
                      <p className="text-gray-900 dark:text-white">{favorite.program.degree}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {language === 'ar' ? 'التخصص:' : 'Spécialité:'}
                      </span>
                      <p className="text-gray-900 dark:text-white">{favorite.program.specialization || '-'}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {language === 'ar' ? 'الشعبة:' : 'Section:'}
                      </span>
                      <p className="text-gray-900 dark:text-white">{favorite.program.field}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {language === 'ar' ? 'الرمز:' : 'Code:'}
                      </span>
                      <p className="font-mono text-gray-900 dark:text-white">{favorite.program.code}</p>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  {(favorite.program.website || favorite.program.email || favorite.program.phone) && (
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {language === 'ar' ? 'معلومات الاتصال:' : 'Informations de contact:'}
                      </span>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse mt-1">
                        {favorite.program.website && (
                          <a
                            href={favorite.program.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                          >
                            <GlobeAltIcon className="h-4 w-4 mr-1" />
                            {language === 'ar' ? 'الموقع الإلكتروني' : 'Site web'}
                          </a>
                        )}
                        {favorite.program.email && (
                          <a
                            href={`mailto:${favorite.program.email}`}
                            className="flex items-center text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm"
                          >
                            <EnvelopeIcon className="h-4 w-4 mr-1" />
                            {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                          </a>
                        )}
                        {favorite.program.phone && (
                          <a
                            href={`tel:${favorite.program.phone}`}
                            className="flex items-center text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-sm"
                          >
                            <PhoneIcon className="h-4 w-4 mr-1" />
                            {language === 'ar' ? 'الهاتف' : 'Téléphone'}
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {favorite.program.score && favorite.program.score.trim() !== '' && (
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'ar' ? 'النقطة الدنيا:' : 'Score minimum:'}
                          </span>
                          <span className={`ml-2 ${getScoreCategory(favorite.program.score)}`}>
                            {parseFloat(favorite.program.score).toFixed(3)}
                          </span>
                        </div>
                      )}
                      
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {language === 'ar' ? 'تاريخ الإضافة:' : 'Ajouté le:'}
                        </span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {formatDate(favorite.addedAt)}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeFavoriteProgram(favorite.id)}
                      className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title={language === 'ar' ? 'إزالة من المفضلة' : 'Retirer des favoris'}
                    >
                      <TrashIcon className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">
                        {language === 'ar' ? 'إزالة' : 'Retirer'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state when no results after filtering */}
        {filteredFavorites.length === 0 && favoritePrograms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {language === 'ar' ? 'لا توجد نتائج' : 'Aucun résultat'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'ar' 
                  ? 'جرب تغيير معايير البحث أو الفلترة'
                  : 'Essayez de modifier vos critères de recherche ou de filtrage'
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites; 