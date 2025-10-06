import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapIcon, AcademicCapIcon, GlobeAltIcon, MapPinIcon } from '@heroicons/react/24/outline';
import UniversitiesMap from '../components/UniversitiesMap';
import { UniversityLocation } from '../data/universityLocations';

const UniversitiesMapPage: React.FC = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const handleUniversityClick = (university: UniversityLocation) => {
    // You can add additional functionality here, like opening a modal or navigating to university details
    console.log('University clicked:', university);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'خريطة الجامعات التونسية' : 'Carte des Universités Tunisiennes'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف مواقع جميع الجامعات والمعاهد العليا في تونس على الخريطة التفاعلية'
              : 'Découvrez l\'emplacement de toutes les universités et instituts supérieurs en Tunisie sur la carte interactive'
            }
          </p>
        </motion.div>

        {/* Map Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {language === 'ar' ? 'دليل الخريطة' : 'Légende de la carte'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'الشمال' : 'Nord'}
              </span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'الوسط' : 'Centre'}
              </span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'الجنوب' : 'Sud'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <UniversitiesMap 
            height="600px"
            showFilters={true}
            onUniversityClick={handleUniversityClick}
          />
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
            <MapPinIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'مواقع دقيقة' : 'Emplacements précis'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'ar' 
                ? 'جميع المواقع محدثة بدقة عالية'
                : 'Tous les emplacements sont mis à jour avec précision'
              }
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
            <GlobeAltIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'روابط مباشرة' : 'Liens directs'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'ar' 
                ? 'وصول مباشر للمواقع الإلكترونية للجامعات'
                : 'Accès direct aux sites web des universités'
              }
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
            <AcademicCapIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'معلومات شاملة' : 'Informations complètes'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'ar' 
                ? 'معلومات الاتصال والعناوين الكاملة'
                : 'Informations de contact et adresses complètes'
              }
            </p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-8"
        >
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            {language === 'ar' ? 'كيفية استخدام الخريطة' : 'Comment utiliser la carte'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <p className="mb-2">
                <strong>{language === 'ar' ? '•' : '•'}</strong> {language === 'ar' 
                  ? 'انقر على أي علامة لرؤية معلومات الجامعة'
                  : 'Cliquez sur n\'importe quel marqueur pour voir les informations de l\'université'
                }
              </p>
              <p className="mb-2">
                <strong>{language === 'ar' ? '•' : '•'}</strong> {language === 'ar' 
                  ? 'استخدم شريط البحث للعثور على جامعة محددة'
                  : 'Utilisez la barre de recherche pour trouver une université spécifique'
                }
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>{language === 'ar' ? '•' : '•'}</strong> {language === 'ar' 
                  ? 'استخدم الفلتر لتصفية الجامعات حسب المنطقة'
                  : 'Utilisez le filtre pour filtrer les universités par région'
                }
              </p>
              <p className="mb-2">
                <strong>{language === 'ar' ? '•' : '•'}</strong> {language === 'ar' 
                  ? 'انقر على الروابط للوصول المباشر للمواقع الإلكترونية'
                  : 'Cliquez sur les liens pour accéder directement aux sites web'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UniversitiesMapPage; 