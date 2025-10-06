import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../store';
import { getUpcomingEvents } from '../data/orientationCalendar';
import { OrientationCalendar } from '../types';

interface UpcomingEventsProps {
  limit?: number;
  showTitle?: boolean;
  showViewAll?: boolean;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ 
  limit = 3, 
  showTitle = true, 
  showViewAll = true 
}) => {
  const { t } = useTranslation();
  const { language } = useAppStore();
  const upcomingEvents = getUpcomingEvents(limit);

  // Category colors
  const getCategoryColor = (category: OrientationCalendar['category']) => {
    switch (category) {
      case 'fg_publishing': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'primary_orientation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'final_orientation': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'foreign_bac': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 're_orientation': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'test_programs': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Category labels
  const getCategoryLabel = (category: OrientationCalendar['category']) => {
    switch (category) {
      case 'fg_publishing': return language === 'ar' ? 'نشر النقاط' : 'Publication des notes';
      case 'primary_orientation': return language === 'ar' ? 'التوجيه الأولي' : 'Orientation primaire';
      case 'final_orientation': return language === 'ar' ? 'التوجيه النهائي' : 'Orientation finale';
      case 'foreign_bac': return language === 'ar' ? 'باكالوريا أجنبية' : 'Bac étranger';
      case 're_orientation': return language === 'ar' ? 'إعادة التوجيه' : 'Réorientation';
      case 'test_programs': return language === 'ar' ? 'برامج الاختبار' : 'Programmes de test';
      default: return '';
    }
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(language === 'ar' ? 'ar-TN' : 'fr-TN', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time until event
  const getTimeUntilEvent = (date: Date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return language === 'ar' ? 'منتهي' : 'Terminé';
    } else if (diffDays === 0) {
      return language === 'ar' ? 'اليوم' : 'Aujourd\'hui';
    } else if (diffDays === 1) {
      return language === 'ar' ? 'غداً' : 'Demain';
    } else if (diffDays <= 7) {
      return language === 'ar' ? `خلال ${diffDays} أيام` : `Dans ${diffDays} jours`;
    } else {
      return language === 'ar' ? `خلال ${diffDays} يوم` : `Dans ${diffDays} jours`;
    }
  };

  if (upcomingEvents.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {language === 'ar' ? 'الأحداث القادمة' : 'Événements à venir'}
          </h2>
          {showViewAll && (
            <a
              href="/calendar"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center"
            >
              {language === 'ar' ? 'عرض الكل' : 'Voir tout'}
              <ArrowRightIcon className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
            </a>
          )}
        </div>
      )}

      <div className="space-y-3">
        {upcomingEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                  {getCategoryLabel(event.category)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(event.date)}
                </span>
              </div>
              
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {language === 'ar' ? event.title : event.titleFr}
              </h3>
              
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                <ClockIcon className="h-3 w-3 mr-1" />
                {getTimeUntilEvent(event.date)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents; 