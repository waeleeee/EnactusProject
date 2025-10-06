import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  AcademicCapIcon, 
  HeartIcon, 
  LightBulbIcon, 
  ChartBarIcon,
  GlobeAltIcon,
  BookOpenIcon,
  BriefcaseIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import AIAssistant from '../components/AIAssistant';

const AIAssistantPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const features = [
    {
      icon: HeartIcon,
      title: language === 'ar' ? 'تحليل الشخصية' : 'Analyse de personnalité',
      description: language === 'ar' 
        ? 'فهم شخصيتك واهتماماتك لاختيار أفضل مسار'
        : 'Comprendre votre personnalité et vos intérêts pour choisir le meilleur parcours'
    },
    {
      icon: AcademicCapIcon,
      title: language === 'ar' ? 'توصيات مخصصة' : 'Recommandations personnalisées',
      description: language === 'ar' 
        ? 'توصيات مخصصة بناءً على مهاراتك وأهدافك'
        : 'Recommandations personnalisées basées sur vos compétences et objectifs'
    },
    {
      icon: LightBulbIcon,
      title: language === 'ar' ? 'استكشاف المهن' : 'Exploration des carrières',
      description: language === 'ar' 
        ? 'اكتشف المهن المختلفة والفرص المتاحة'
        : 'Découvrez les différentes carrières et opportunités disponibles'
    },
    {
      icon: ChartBarIcon,
      title: language === 'ar' ? 'تحليل السوق' : 'Analyse du marché',
      description: language === 'ar' 
        ? 'فهم متطلبات سوق العمل والاتجاهات المستقبلية'
        : 'Comprendre les exigences du marché du travail et les tendances futures'
    }
  ];

  const benefits = [
    language === 'ar' ? 'توفير الوقت والجهد في البحث' : 'Gagner du temps et de l\'effort dans la recherche',
    language === 'ar' ? 'توصيات مبنية على العلم والبيانات' : 'Recommandations basées sur la science et les données',
    language === 'ar' ? 'فهم أفضل لشخصيتك وقدراتك' : 'Meilleure compréhension de votre personnalité et capacités',
    language === 'ar' ? 'توجيه نحو المهن المطلوبة' : 'Orientation vers les carrières demandées',
    language === 'ar' ? 'معلومات محدثة عن سوق العمل' : 'Informations actualisées sur le marché du travail',
    language === 'ar' ? 'دعم مجاني ومتاح 24/7' : 'Support gratuit et disponible 24/7'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {language === 'ar' ? 'المساعد الذكي للتوجيه الجامعي' : 'Assistant IA pour l\'Orientation Universitaire'}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'اكتشف أفضل مسار جامعي بناءً على شخصيتك واهتماماتك ومهاراتك'
                : 'Découvrez le meilleur parcours universitaire basé sur votre personnalité, vos intérêts et vos compétences'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <CheckCircleIcon className="w-5 h-5" />
                <span>{language === 'ar' ? 'مجاني 100%' : '100% Gratuit'}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <CheckCircleIcon className="w-5 h-5" />
                <span>{language === 'ar' ? 'متاح 24/7' : 'Disponible 24/7'}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <CheckCircleIcon className="w-5 h-5" />
                <span>{language === 'ar' ? 'توصيات مخصصة' : 'Recommandations personnalisées'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'كيف يعمل المساعد الذكي؟' : 'Comment fonctionne l\'assistant IA?'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'نظام ذكي يحلل شخصيتك واهتماماتك لتقديم توصيات مخصصة ومفصلة'
                : 'Un système intelligent qui analyse votre personnalité et vos intérêts pour fournir des recommandations personnalisées et détaillées'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'مزايا المساعد الذكي' : 'Avantages de l\'assistant IA'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {language === 'ar' 
                ? 'لماذا تختار مساعدنا الذكي؟'
                : 'Pourquoi choisir notre assistant IA?'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 rtl:space-x-reverse"
              >
                <StarIcon className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant Chat */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'ابدأ محادثتك مع المساعد الذكي' : 'Commencez votre conversation avec l\'assistant IA'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {language === 'ar' 
                ? 'اسأل المساعد الذكي عن أفضل المسارات الجامعية المناسبة لك'
                : 'Demandez à l\'assistant IA les meilleurs parcours universitaires adaptés à votre profil'
              }
            </p>
          </motion.div>

          <AIAssistant />
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              {language === 'ar' ? 'جاهز لبدء رحلتك الجامعية؟' : 'Prêt à commencer votre parcours universitaire?'}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {language === 'ar' 
                ? 'استخدم المساعد الذكي لاختيار أفضل مسار جامعي يناسبك'
                : 'Utilisez l\'assistant IA pour choisir le meilleur parcours universitaire qui vous convient'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {language === 'ar' ? 'ابدأ الآن' : 'Commencer maintenant'}
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                {language === 'ar' ? 'تعرف على المزيد' : 'En savoir plus'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage; 