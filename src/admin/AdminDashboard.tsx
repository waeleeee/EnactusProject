import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import UniversitiesAdmin from './UniversitiesAdmin';
import ProgramsAdmin from './ProgramsAdmin';
import CalendarAdmin from './CalendarAdmin';
import UsersAdmin from './UsersAdmin';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { adminApi } from '../services/adminApi';

export type AdminSection = 'dashboard' | 'universities' | 'programs' | 'calendar' | 'users';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for admin authentication
    const user = localStorage.getItem('user');
    console.log('AdminDashboard: Checking authentication, user data:', user);
    
    if (user) {
      const userData = JSON.parse(user);
      console.log('AdminDashboard: Parsed user data:', userData);
      
      if (userData.role === 'admin') {
        console.log('AdminDashboard: Admin access granted');
        setIsAuthorized(true);
      } else {
        // User is logged in but not admin
        console.log('AdminDashboard: Access denied - not admin role');
        alert('Access denied. Admin privileges required.');
        navigate('/');
      }
    } else {
      // Not logged in
      console.log('AdminDashboard: No user data found');
      alert('Please login as admin to access this page.');
      navigate('/login');
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect to login
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'universities':
        return <UniversitiesAdmin />;
      case 'programs':
        return <ProgramsAdmin />;
      case 'calendar':
        return <CalendarAdmin />;
      case 'users':
        return <UsersAdmin />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const DashboardOverview: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    universities: 0,
    programs: 0,
    users: 0,
    events: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [universities, programs, users] = await Promise.all([
          adminApi.getUniversities(),
          adminApi.getPrograms(),
          adminApi.getUsers()
        ]);
        
        setStats({
          universities: universities.length,
          programs: programs.length,
          users: users.length,
          events: 12 // Hardcoded for now
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('admin.dashboard.title')}
          </h1>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {t('admin.dashboard.title')}
        </h1>
        <p className="text-gray-600">
          {t('admin.dashboard.welcome')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t('admin.dashboard.universities')}</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.universities}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t('admin.dashboard.programs')}</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.programs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t('admin.dashboard.events')}</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.events}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t('admin.dashboard.users')}</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.users}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{t('admin.dashboard.recentActivity')}</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-sm text-gray-600">Database updated: {stats.programs} programs imported</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <p className="text-sm text-gray-600">Universities: {stats.universities} total</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <p className="text-sm text-gray-600">Users registered: {stats.users}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{t('admin.dashboard.quickActions')}</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              {t('admin.dashboard.addUniversity')}
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              {t('admin.dashboard.addProgram')}
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              {t('admin.dashboard.addEvent')}
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              {t('admin.dashboard.viewReports')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 