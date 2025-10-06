import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../store';
import { getEventsByMonth } from '../data/orientationCalendar';
import { OrientationCalendar } from '../types';

interface CalendarWidgetProps {
  className?: string;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { language } = useAppStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showDayEvents, setShowDayEvents] = useState(false);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get events for current month
  const monthEvents = getEventsByMonth(currentMonth, currentYear);

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayIndex = firstDayOfMonth.getDay();

  // Month names
  const monthNames = language === 'ar' 
    ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  // Day names
  const dayNames = language === 'ar'
    ? ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
    : ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDay(null);
    setShowDayEvents(false);
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDay(null);
    setShowDayEvents(false);
  };

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    return monthEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day;
    });
  };

  // Get category color for event
  const getCategoryColor = (category: OrientationCalendar['category']) => {
    switch (category) {
      case 'fg_publishing': return 'bg-green-500';
      case 'primary_orientation': return 'bg-blue-500';
      case 'final_orientation': return 'bg-purple-500';
      case 'foreign_bac': return 'bg-orange-500';
      case 're_orientation': return 'bg-red-500';
      case 'test_programs': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Get category label
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

  // Check if date is today
  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  };

  // Handle day click
  const handleDayClick = (day: number) => {
    const dayEvents = getEventsForDay(day);
    if (dayEvents.length > 0) {
      setSelectedDay(day);
      setShowDayEvents(true);
    }
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(language === 'ar' ? 'ar-TN' : 'fr-TN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="h-16"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const hasEvents = dayEvents.length > 0;
      
      days.push(
        <div
          key={day}
          className={`h-16 border border-gray-200 dark:border-gray-700 p-1 relative cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
            isToday(day) ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500' : ''
          } ${hasEvents ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''} ${
            selectedDay === day ? 'bg-blue-100 dark:bg-blue-800' : ''
          }`}
          onClick={() => handleDayClick(day)}
        >
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">
            {day}
          </div>
          {/* Show up to 2 event labels per day */}
          {dayEvents.slice(0, 2).map((event, index) => (
            <div
              key={event.id}
              className={`inline-block px-1 py-0.5 my-0.5 rounded text-[10px] font-semibold text-white ${getCategoryColor(event.category)}`}
              title={`${language === 'ar' ? event.title : event.titleFr}`}
              style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%'}}
            >
              {getCategoryLabel(event.category)}
            </div>
          ))}
          {/* Show +N if more events */}
          {dayEvents.length > 2 && (
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              +{dayEvents.length - 2}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-1 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="p-1 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((dayName) => (
          <div
            key={dayName}
            className="h-8 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays()}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          {language === 'ar' ? 'دليل الألوان' : 'Légende'}
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'نشر النقاط' : 'Publication des notes'}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'التوجيه الأولي' : 'Orientation primaire'}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'التوجيه النهائي' : 'Orientation finale'}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'باكالوريا أجنبية' : 'Bac étranger'}
            </span>
          </div>
        </div>
      </div>

      {/* Month Summary */}
      {monthEvents.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {language === 'ar' 
              ? `${monthEvents.length} حدث في ${monthNames[currentMonth]}`
              : `${monthEvents.length} événement(s) en ${monthNames[currentMonth]}`
            }
          </div>
        </div>
      )}

      {/* Day Events Modal */}
      {showDayEvents && selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {language === 'ar' ? `أحداث ${selectedDay} ${monthNames[currentMonth]}` : `Événements du ${selectedDay} ${monthNames[currentMonth]}`}
                </h3>
                <button
                  onClick={() => setShowDayEvents(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-3">
                {getEventsForDay(selectedDay).map((event) => (
                  <div key={event.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)} text-white`}>
                        {getCategoryLabel(event.category)}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {language === 'ar' ? event.title : event.titleFr}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {language === 'ar' ? event.description : event.descriptionFr}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {formatDate(event.date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CalendarWidget; 