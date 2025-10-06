import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  CalendarIcon, 
  ClockIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  BookOpenIcon,
  GlobeAltIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useAppStore } from '../store';
import { 
  orientationEvents, 
  getEventsByCategory, 
  getEventsByMonth, 
  getUpcomingEvents,
  getCurrentMonthEvents 
} from '../data/orientationCalendar';
import { OrientationCalendar } from '../types';
import CalendarWidget from '../components/CalendarWidget';

const Calendar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { language } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<OrientationCalendar['category'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<OrientationCalendar | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Filter events based on search and category
  const filteredEvents = orientationEvents.filter(event => {
    const matchesSearch = searchTerm === '' || 
      (language === 'ar' ? event.title : event.titleFr).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (language === 'ar' ? event.description : event.descriptionFr).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get upcoming events
  const upcomingEvents = getUpcomingEvents(3);

  // Get current month events
  const currentMonthEvents = getCurrentMonthEvents();

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

  // Category icons
  const getCategoryIcon = (category: OrientationCalendar['category']) => {
    switch (category) {
      case 'fg_publishing': return <DocumentTextIcon className="h-4 w-4" />;
      case 'primary_orientation': return <AcademicCapIcon className="h-4 w-4" />;
      case 'final_orientation': return <BookOpenIcon className="h-4 w-4" />;
      case 'foreign_bac': return <GlobeAltIcon className="h-4 w-4" />;
      case 're_orientation': return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'test_programs': return <UserGroupIcon className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
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

  // Check if event is today
  const isEventToday = (date: Date) => {
    const today = new Date();
    const eventDate = new Date(date);
    return today.toDateString() === eventDate.toDateString();
  };

  // Check if event is upcoming
  const isEventUpcoming = (date: Date) => {
    const today = new Date();
    const eventDate = new Date(date);
    return eventDate > today;
  };

  // Add to personal calendar function
  const addToPersonalCalendar = (event: OrientationCalendar) => {
    // Create calendar event data
    const eventDate = new Date(event.date);
    const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000); // 1 hour duration
    
    const calendarData = {
      title: language === 'ar' ? event.title : event.titleFr,
      description: language === 'ar' ? event.description : event.descriptionFr,
      start: eventDate.toISOString(),
      end: endDate.toISOString(),
      location: '',
      allDay: false
    };

    // Create .ics file content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Tunisian Orientation App//Calendar Event//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}@tunisian-orientation-app.com`,
      `DTSTART:${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${calendarData.title}`,
      `DESCRIPTION:${calendarData.description}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // Create and download .ics file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.id}-event.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success message
    alert(language === 'ar' ? 'تم إضافة الحدث إلى التقويم الشخصي' : 'Événement ajouté au calendrier personnel');
  };

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
            {language === 'ar' ? 'التقويم الجامعي' : 'Calendrier Universitaire'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {language === 'ar' 
              ? 'جميع التواريخ المهمة للطلاب الجامعيين والتوجيه الأكاديمي'
              : 'Toutes les dates importantes pour les étudiants universitaires et l\'orientation académique'
            }
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'إجمالي الأحداث' : 'Total des événements'}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {orientationEvents.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'الأحداث القادمة' : 'Événements à venir'}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {upcomingEvents.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'هذا الشهر' : 'Ce mois'}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentMonthEvents.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <AcademicCapIcon className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'التوجيه الأولي' : 'Orientation primaire'}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {getEventsByCategory('primary_orientation').length}
                </p>
              </div>
            </div>
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'البحث في الأحداث...' : 'Rechercher des événements...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as OrientationCalendar['category'] | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">{language === 'ar' ? 'جميع الفئات' : 'Toutes les catégories'}</option>
              <option value="fg_publishing">{language === 'ar' ? 'نشر النقاط' : 'Publication des notes'}</option>
              <option value="primary_orientation">{language === 'ar' ? 'التوجيه الأولي' : 'Orientation primaire'}</option>
              <option value="final_orientation">{language === 'ar' ? 'التوجيه النهائي' : 'Orientation finale'}</option>
              <option value="foreign_bac">{language === 'ar' ? 'باكالوريا أجنبية' : 'Bac étranger'}</option>
              <option value="re_orientation">{language === 'ar' ? 'إعادة التوجيه' : 'Réorientation'}</option>
              <option value="test_programs">{language === 'ar' ? 'برامج الاختبار' : 'Programmes de test'}</option>
            </select>

            {/* View Mode */}
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {language === 'ar' ? 'قائمة' : 'Liste'}
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {language === 'ar' ? 'تقويم' : 'Calendrier'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'ar' 
              ? `تم العثور على ${filteredEvents.length} حدث من أصل ${orientationEvents.length}`
              : `${filteredEvents.length} événement(s) trouvé(s) sur ${orientationEvents.length}`
            }
          </p>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <CalendarWidget className="w-full" />
          </motion.div>
        )}

        {/* Events List */}
        {viewMode === 'list' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer ${
                  isEventToday(event.date) ? 'ring-2 ring-yellow-500' : ''
                } ${isEventUpcoming(event.date) ? 'border-l-4 border-blue-500' : ''}`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                        {getCategoryIcon(event.category)}
                        <span className="ml-1">{getCategoryLabel(event.category)}</span>
                      </span>
                      {isEventToday(event.date) && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          {language === 'ar' ? 'اليوم' : 'Aujourd\'hui'}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {language === 'ar' ? event.title : event.titleFr}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {language === 'ar' ? event.description : event.descriptionFr}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {formatDate(event.date)}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {getTimeUntilEvent(event.date)}
                        </div>
                      </div>
                      
                      <button
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToPersonalCalendar(event);
                        }}
                      >
                        {language === 'ar' ? 'إضافة إلى التقويم الشخصي' : 'Ajouter au calendrier personnel'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {language === 'ar' ? 'لا توجد أحداث' : 'Aucun événement'}
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

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedEvent.category)}`}>
                    {getCategoryIcon(selectedEvent.category)}
                    <span className="ml-2">{getCategoryLabel(selectedEvent.category)}</span>
                  </span>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? selectedEvent.title : selectedEvent.titleFr}
                </h2>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {formatDate(selectedEvent.date)}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {language === 'ar' ? selectedEvent.description : selectedEvent.descriptionFr}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {getTimeUntilEvent(selectedEvent.date)}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        addToPersonalCalendar(selectedEvent);
                        setSelectedEvent(null);
                      }}
                    >
                      {language === 'ar' ? 'إضافة إلى التقويم' : 'Ajouter au calendrier'}
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => setSelectedEvent(null)}
                    >
                      {language === 'ar' ? 'إغلاق' : 'Fermer'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar; 