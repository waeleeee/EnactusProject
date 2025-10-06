import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Recommendation, 
  getRecommendationsByCategory, 
  getCategoryStats, 
  getCategoryColor, 
  getCategoryIcon,
  BACStream 
} from '../utils/recommendations';
import { ChevronDownIcon, ChevronUpIcon, StarIcon, MapPinIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

interface RecommendationsDisplayProps {
  recommendations: Recommendation[];
  userScore: number;
  bacStream: BACStream;
  loading?: boolean;
}

const RecommendationsDisplay: React.FC<RecommendationsDisplayProps> = ({
  recommendations,
  userScore,
  bacStream,
  loading = false
}) => {
  const { t } = useTranslation();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['excellent', 'good']));

  const categories = getRecommendationsByCategory(recommendations);
  const stats = getCategoryStats(recommendations);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'excellent':
        return { ar: 'ممتازة', fr: 'Excellente' };
      case 'good':
        return { ar: 'جيدة', fr: 'Bonne' };
      case 'reach':
        return { ar: 'متوسطة', fr: 'Moyenne' };
      case 'safety':
        return { ar: 'منخفضة', fr: 'Faible' };
      default:
        return { ar: 'جميع', fr: 'Toutes' };
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'excellent':
        return { ar: 'احتمالية عالية جداً للقبول', fr: 'Probabilité très élevée d\'admission' };
      case 'good':
        return { ar: 'احتمالية عالية للقبول', fr: 'Probabilité élevée d\'admission' };
      case 'reach':
        return { ar: 'احتمالية متوسطة للقبول', fr: 'Probabilité moyenne d\'admission' };
      case 'safety':
        return { ar: 'احتمالية منخفضة للقبول', fr: 'Probabilité faible d\'admission' };
      default:
        return { ar: 'جميع التوصيات', fr: 'Toutes les recommandations' };
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <div className="text-gray-500 dark:text-gray-400">
          <AcademicCapIcon className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg font-medium">
            {t('calculator.noRecommendations')}
          </p>
          <p className="text-sm mt-2">
            {t('calculator.tryDifferentScore')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">
              {t('calculator.recommendations')}
            </h3>
            <p className="text-blue-100 text-sm mt-1">
              {t('calculator.basedOnScore')}: {userScore.toFixed(3)} | {t('calculator.stream')}: {bacStream}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-blue-100 text-sm">{t('calculator.programs')}</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="text-green-600">
            <div className="text-lg font-bold">{stats.excellent}</div>
            <div className="text-xs">{getCategoryName('excellent').ar}</div>
          </div>
          <div className="text-blue-600">
            <div className="text-lg font-bold">{stats.good}</div>
            <div className="text-xs">{getCategoryName('good').ar}</div>
          </div>
          <div className="text-yellow-600">
            <div className="text-lg font-bold">{stats.reach}</div>
            <div className="text-xs">{getCategoryName('reach').ar}</div>
          </div>
          <div className="text-red-600">
            <div className="text-lg font-bold">{stats.safety}</div>
            <div className="text-xs">{getCategoryName('safety').ar}</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Object.entries(categories).map(([category, programs]) => {
          if (programs.length === 0) return null;
          
          const isExpanded = expandedCategories.has(category);
          const categoryName = getCategoryName(category);
          const categoryDesc = getCategoryDescription(category);
          const categoryColor = getCategoryColor(category as any);
          const categoryIcon = getCategoryIcon(category as any);

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${categoryColor}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-2xl">{categoryIcon}</span>
                    <div>
                      <h4 className="font-semibold">{categoryName.ar}</h4>
                      <p className="text-sm opacity-75">{categoryDesc.ar}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-medium">{programs.length} {t('calculator.program')}</span>
                    {isExpanded ? (
                      <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>

              {/* Programs List */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-3">
                      {programs.map((recommendation, index) => (
                        <motion.div
                          key={recommendation.program.code}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                                <StarIcon className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                  {recommendation.probability}
                                </span>
                              </div>
                              
                              <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {recommendation.program.degree}
                              </h5>
                              
                              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <MapPinIcon className="w-4 h-4" />
                                <span>{recommendation.program.university}</span>
                              </div>
                              
                              {recommendation.program.specialization && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {recommendation.program.specialization}
                                </p>
                              )}
                            </div>
                            
                            <div className="text-right rtl:text-left ml-4">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {parseFloat(recommendation.program.score).toFixed(3)}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {t('calculator.requiredScore')}
                              </div>
                              <div className="text-xs font-medium text-green-600 dark:text-green-400 mt-1">
                                +{(userScore - parseFloat(recommendation.program.score)).toFixed(3)}
                              </div>
                            </div>
                          </div>
                          
                          {recommendation.program.special_note && (
                            <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm text-blue-700 dark:text-blue-300">
                              {recommendation.program.special_note}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsDisplay; 