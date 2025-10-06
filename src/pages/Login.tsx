import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language } = useAppStore();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!form.email) {
      newErrors.email = t('auth.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = t('auth.invalidEmail');
    }
    
    if (!form.password) {
      newErrors.password = t('auth.passwordRequired');
    } else if (form.password.length < 6) {
      newErrors.password = t('auth.passwordTooShort');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Real API call to backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store real user data with JWT token
      localStorage.setItem('user', JSON.stringify(data));
      console.log('Login successful:', data);
      
      // Show success message and redirect
      if (data.user.role === 'admin') {
        alert('Admin login successful! Redirecting to admin dashboard...');
        navigate('/admin');
      } else {
        alert(t('auth.loginSuccess'));
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: error instanceof Error ? error.message : t('auth.loginError') });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {t('auth.login')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('auth.loginSubtitle')}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.general}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('auth.email')}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder={t('auth.emailPlaceholder')}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('auth.password')}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder={t('auth.passwordPlaceholder')}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('auth.loggingIn') : t('auth.login')}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {t('auth.noAccount')}{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {t('auth.register')}
                </button>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Demo Credentials:</strong>
              </p>
              <p className="text-xs text-gray-500">
                Admin: admin@admin.com / admin123
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 