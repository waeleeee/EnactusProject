import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import { motion } from 'framer-motion';
import { universityLocations, UniversityLocation } from '../data/universityLocations';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useAppStore();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    city: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!form.firstName.trim()) {
      newErrors.firstName = t('auth.firstName') + ' ' + t('common.required');
    }
    
    if (!form.lastName.trim()) {
      newErrors.lastName = t('auth.lastName') + ' ' + t('common.required');
    }
    
    if (!form.email) {
      newErrors.email = t('auth.email') + ' ' + t('common.required');
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = t('auth.invalidEmail');
    }
    
    if (!form.phone.trim()) {
      newErrors.phone = t('auth.phone') + ' ' + t('common.required');
    }
    
    if (!form.password) {
      newErrors.password = t('auth.password') + ' ' + t('common.required');
    } else if (form.password.length < 6) {
      newErrors.password = t('auth.passwordTooShort');
    }
    
    if (!form.confirmPassword) {
      newErrors.confirmPassword = t('auth.confirmPassword') + ' ' + t('common.required');
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = t('auth.passwordsDontMatch');
    }
    
    if (!form.birthDate) {
      newErrors.birthDate = t('auth.birthDate') + ' ' + t('common.required');
    }
    
    if (!form.gender) {
      newErrors.gender = t('auth.gender') + ' ' + t('common.required');
    }
    
    if (!form.city) {
      newErrors.city = t('auth.city') + ' ' + t('common.required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user info in localStorage for demo
      localStorage.setItem('user', JSON.stringify({
        email: form.email,
        name: `${form.firstName} ${form.lastName}`,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        birthDate: form.birthDate,
        gender: form.gender,
        city: form.city,
        token: 'demo-token-' + Date.now()
      }));
      
      // Show success message
      alert(t('auth.registerSuccess'));
      navigate('/');
    } catch (error) {
      setErrors({ general: t('auth.registerError') });
    } finally {
      setLoading(false);
    }
  };

  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t('auth.register')}
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {language === 'ar' ? 'أنشئ حسابك الجديد' : 'Créez votre nouveau compte'}
          </motion.p>
        </div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400 text-sm"
              >
                {errors.general}
              </motion.div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('auth.firstName')}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.firstName 
                      ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  } ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'ar' ? 'الاسم الأول' : 'Prénom'}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('auth.lastName')}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.lastName 
                      ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  } ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'ar' ? 'اسم العائلة' : 'Nom de famille'}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('auth.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.email 
                    ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } ${isRTL ? 'text-right' : 'text-left'}`}
                placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('auth.phone')}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.phone 
                    ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } ${isRTL ? 'text-right' : 'text-left'}`}
                placeholder={language === 'ar' ? 'رقم الهاتف' : 'Téléphone'}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* City Dropdown */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('auth.city')}
              </label>
              <select
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.city 
                    ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } ${isRTL ? 'text-right' : 'text-left'}`}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{language === 'ar' ? 'اختر المدينة' : 'Choisissez la ville'}</option>
                {[...new Set(universityLocations.map((u: UniversityLocation) => language === 'ar' ? u.city : u.cityFr))].sort().map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city}</p>
              )}
            </div>

            {/* Birth Date and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('auth.birthDate')}
                </label>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={form.birthDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.birthDate 
                      ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                />
                {errors.birthDate && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.birthDate}</p>
                )}
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('auth.gender')}
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.gender 
                      ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                >
                  <option value="">{language === 'ar' ? 'اختر الجنس' : 'Sélectionner le genre'}</option>
                  <option value="male">{t('auth.male')}</option>
                  <option value="female">{t('auth.female')}</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gender}</p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.password 
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    } ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={language === 'ar' ? 'كلمة المرور' : 'Mot de passe'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('auth.confirmPassword')}
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.confirmPassword 
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    } ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirmer le mot de passe'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-4 border border-transparent rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'ar' ? 'جاري التسجيل...' : 'Inscription...'}
                </div>
              ) : (
                t('auth.signUp')
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'أو' : 'Ou'}
                </span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('auth.hasAccount')}{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                {t('auth.signIn')}
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Demo Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm text-green-800 dark:text-green-200">
              {language === 'ar' 
                ? '💡 للمعاينة: سيتم حفظ بياناتك محلياً للعرض فقط'
                : '💡 Pour la démo: Vos données seront sauvegardées localement pour l\'affichage uniquement'
              }
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register; 