import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import { Bars3Icon, XMarkIcon, UserIcon, GlobeAltIcon, StarIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  onLanguageChange: (language: 'ar' | 'fr') => void;
}

const Header: React.FC<HeaderProps> = ({ onLanguageChange }) => {
  const { t } = useTranslation();
  const { language, favoritePrograms } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Main links
  const mainLinks = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.explore'), href: '/explore' },
    { name: t('navigation.universities'), href: '/universities' },
    { name: t('navigation.calendar'), href: '/calendar' },
    { name: t('navigation.guide'), href: '/guide' },
  ];
  // Less-used links
  const moreLinks = [
    { name: t('navigation.favorites'), href: '/favorites', badge: favoritePrograms.length > 0 ? favoritePrograms.length : undefined },
    { name: language === 'ar' ? 'خريطة الجامعات' : 'Carte des Universités', href: '/universities-map' },
    { name: language === 'ar' ? 'دليل الجامعات' : 'Répertoire des Universités', href: '/universities-directory' },
    { name: language === 'ar' ? 'المساعد الذكي' : 'Assistant IA', href: '/ai-assistant' },
    { name: t('navigation.about'), href: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'fr' : 'ar';
    onLanguageChange(newLanguage);
  };

  const isRTL = language === 'ar';

  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {language === 'ar' ? 'ت' : 'O'}
                </span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'التوجيه الجامعي' : 'Orientation Universitaire'}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 rtl:space-x-reverse items-center">
            {mainLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen((open) => !open)}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {language === 'ar' ? 'المزيد' : 'More'}
              </button>
              {isMoreOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                  {moreLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      <div className="flex items-center">
                        {item.name}
                        {item.badge && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            <StarIcon className="h-3 w-3 mr-1" />
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title={language === 'ar' ? 'Switch to French' : 'التبديل إلى العربية'}
            >
              <GlobeAltIcon className="w-5 h-5" />
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">{user.name || user.email}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 rtl:left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {t('navigation.profile')}
                    </Link>
                    {user && user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {language === 'ar' ? 'لوحة الإدارة' : 'Admin Dashboard'}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {t('navigation.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t('navigation.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  {t('navigation.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
            {/* Language Switcher Mobile */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <GlobeAltIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              {mainLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* More links in mobile */}
              <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                {moreLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      {item.name}
                      {item.badge && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          <StarIcon className="h-3 w-3 mr-1" />
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 