import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  CalculatorIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  CalendarIcon,
  GlobeAltIcon,
  MapIcon,
  BookOpenIcon,
  SparklesIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useAppStore } from '../store';
import UpcomingEvents from '../components/UpcomingEvents';
import CalendarWidget from '../components/CalendarWidget';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { favoritePrograms } = useAppStore();

  const features = [
    {
      icon: CalculatorIcon,
      title: t('home.calculator.title'),
      description: t('home.calculator.description'),
      href: '/calculator',
      color: 'bg-blue-500'
    },
    {
      icon: MagnifyingGlassIcon,
      title: t('home.explore.title'),
      description: t('home.explore.description'),
      href: '/explore',
      color: 'bg-green-500'
    },
    {
      icon: BookOpenIcon,
      title: language === 'ar' ? 'الجامعات' : 'Universités',
      description: language === 'ar' 
        ? 'اكتشف جميع الجامعات والبرامج المتاحة في تونس'
        : 'Découvrez toutes les universités et programmes disponibles en Tunisie',
      href: '/universities',
      color: 'bg-purple-500'
    },
    {
      icon: MapIcon,
      title: language === 'ar' ? 'خريطة الجامعات' : 'Carte des Universités',
      description: language === 'ar' 
        ? 'استكشف مواقع الجامعات على الخريطة التفاعلية'
        : 'Explorez les emplacements des universités sur la carte interactive',
      href: '/universities-map',
      color: 'bg-orange-500'
    },
    {
      icon: SparklesIcon,
      title: language === 'ar' ? 'المساعد الذكي' : 'Assistant IA',
      description: language === 'ar' 
        ? 'احصل على توصيات مخصصة بناءً على شخصيتك واهتماماتك'
        : 'Obtenez des recommandations personnalisées basées sur votre personnalité et vos intérêts',
      href: '/ai-assistant',
      color: 'bg-pink-500'
    },
    {
      icon: CalendarIcon,
      title: t('home.calendar.title'),
      description: t('home.calendar.description'),
      href: '/calendar',
      color: 'bg-indigo-500'
    }
  ];

  const quickActions = [
    {
      title: language === 'ar' ? 'حساب النقاط' : 'Calculer les points',
      description: language === 'ar' ? 'احسب نقاطك للبكالوريا' : 'Calculez vos points pour le baccalauréat',
      href: '/calculator',
      icon: CalculatorIcon,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: language === 'ar' ? 'استكشف الجامعات' : 'Explorer les universités',
      description: language === 'ar' ? 'اكتشف البرامج المتاحة' : 'Découvrez les programmes disponibles',
      href: '/universities',
      icon: BookOpenIcon,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: language === 'ar' ? 'المساعد الذكي' : 'Assistant IA',
      description: language === 'ar' ? 'احصل على توصيات مخصصة' : 'Obtenez des recommandations personnalisées',
      href: '/ai-assistant',
      icon: SparklesIcon,
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: language === 'ar' ? 'التقويم الجامعي' : 'Calendrier universitaire',
      description: language === 'ar' ? 'تابع المواعيد المهمة' : 'Suivez les dates importantes',
      href: '/calendar',
      icon: CalendarIcon,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section (keep original site colors) */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {language === 'ar' ? 'التوجيه الجامعي في تونس' : 'Orientation Universitaire en Tunisie'}
            </h1>
            {/* Enactus hero brand and tagline (enhanced, on-brand accents) */}
            <div className="relative flex flex-col items-center gap-5 mb-10">
              {/* Soft amber glow behind the logo */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full bg-amber-400/30 blur-3xl"></div>
              </div>
              {/* Logo with subtle ring */}
              <div className="relative">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-amber-400/60 to-yellow-300/40 blur-md"></div>
                <div className="relative rounded-xl ring-2 ring-amber-400/60 ring-offset-2 ring-offset-white/20">
                  <img
                    src="/logo512.png"
                    alt="Enactus logo"
                    className="w-48 h-auto drop-shadow-xl select-none"
                    draggable={false}
                  />
                </div>
              </div>
              {/* Tagline with amber accent */}
              <p className="text-lg md:text-xl text-amber-100 max-w-3xl">
                {language === 'ar'
                  ? 'Enactus هو صديقك الذي يساعدك ويوجهك لتكون الأفضل في مسيرتك!'
                  : language === 'fr'
                  ? 'Enactus est comme un ami qui vous guide pour exceller dans votre carrière !'
                  : 'Enactus is like your friend, here to guide you to be the best in your career!'}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-900 bg-amber-300 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                Enactus • Guidance
              </span>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'اكتشف أفضل مسار جامعي يناسبك مع أدوات ذكية وتوصيات مخصصة'
                : 'Découvrez le meilleur parcours universitaire qui vous convient avec des outils intelligents et des recommandations personnalisées'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculator"
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {language === 'ar' ? 'ابدأ الآن' : 'Commencer maintenant'}
              </Link>
              <Link
                to="/ai-assistant"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                {language === 'ar' ? 'المساعد الذكي' : 'Assistant IA'}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions - Neutral surface with Enactus accents */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'إجراءات سريعة' : 'Actions rapides'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {language === 'ar' 
                ? 'ابدأ رحلتك الجامعية مع هذه الأدوات المفيدة'
                : 'Commencez votre parcours universitaire avec ces outils utiles'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={action.href}
                  className="block p-6 rounded-lg bg-white dark:bg-gray-800 border border-amber-200/40 dark:border-amber-200/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">{action.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{action.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant Section - Soft amber background */}
      <div className="py-16 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-gray-900" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'المساعد الذكي للتوجيه الجامعي' : 'Assistant IA pour l\'Orientation Universitaire'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              {language === 'ar' 
                ? 'احصل على توصيات مخصصة بناءً على شخصيتك واهتماماتك ومهاراتك. مساعد ذكي يساعدك في اختيار أفضل مسار جامعي.'
                : 'Obtenez des recommandations personnalisées basées sur votre personnalité, vos intérêts et vos compétences. Un assistant intelligent qui vous aide à choisir le meilleur parcours universitaire.'
              }
            </p>
            <Link
              to="/ai-assistant"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
            >
              {language === 'ar' ? 'ابدأ المحادثة' : 'Commencer la conversation'}
              <ArrowRightIcon className="w-5 h-5 ml-2 rtl:mr-2" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'جميع الأدوات' : 'Tous les outils'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {language === 'ar' 
                ? 'اكتشف جميع الأدوات والموارد المتاحة لمساعدتك في رحلتك الجامعية'
                : 'Découvrez tous les outils et ressources disponibles pour vous aider dans votre parcours universitaire'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={feature.href}
                  className="block p-6 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="py-16 bg-amber-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'التقويم الجامعي' : 'Calendrier Universitaire'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {language === 'ar' 
                ? 'تابع جميع المواعيد المهمة والمناسبات الجامعية'
                : 'Suivez toutes les dates importantes et événements universitaires'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <UpcomingEvents />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <CalendarWidget />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Favorites Section */}
      {favoritePrograms.length > 0 && (
        <div className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'ar' ? 'برامجك المفضلة' : 'Vos programmes favoris'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {language === 'ar' 
                  ? `لديك ${favoritePrograms.length} برنامج محفوظ`
                  : `Vous avez ${favoritePrograms.length} programme(s) sauvegardé(s)`
                }
              </p>
            </motion.div>

            <div className="text-center">
              <Link
                to="/favorites"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <HeartIcon className="w-5 h-5 mr-2 rtl:ml-2" />
                {language === 'ar' ? 'عرض المفضلة' : 'Voir les favoris'}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              {language === 'ar' ? 'جاهز لبدء رحلتك الجامعية؟' : 'Prêt à commencer votre parcours universitaire?'}
            </h2>
            <p className="text-xl text-gray-800/80 mb-8">
              {language === 'ar' 
                ? 'استخدم أدواتنا الذكية لاختيار أفضل مسار جامعي يناسبك'
                : 'Utilisez nos outils intelligents pour choisir le meilleur parcours universitaire qui vous convient'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ai-assistant"
                className="px-8 py-3 bg-gray-900 text-amber-300 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                {language === 'ar' ? 'ابدأ مع المساعد الذكي' : 'Commencer avec l\'assistant IA'}
              </Link>
              <Link
                to="/universities"
                className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-amber-300 transition-colors"
              >
                {language === 'ar' ? 'استكشف الجامعات' : 'Explorer les universités'}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home; 