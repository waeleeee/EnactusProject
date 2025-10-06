import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppStore } from './store';
import './i18n'; // Import i18n configuration

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import Guide from './pages/Guide';
import Calendar from './pages/Calendar';
import About from './pages/About';
import Profile from './pages/Profile';
import Universities from './pages/Universities';
import UniversitiesDirectory from './pages/UniversitiesDirectory';
import UniversitiesMapPage from './pages/UniversitiesMapPage';
import AIAssistantPage from './pages/AIAssistantPage';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin
import AdminDashboard from './admin/AdminDashboard';

const App: React.FC = () => {
  const { language, setLanguage } = useAppStore();

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header onLanguageChange={setLanguage} />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/universities" element={<Universities />} />
              <Route path="/universities-directory" element={<UniversitiesDirectory />} />
              <Route path="/universities-map" element={<UniversitiesMapPage />} />
              <Route path="/ai-assistant" element={<AIAssistantPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
