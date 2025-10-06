import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPinIcon, MagnifyingGlassIcon, FunnelIcon, GlobeAltIcon, PhoneIcon, EnvelopeIcon, MapIcon } from '@heroicons/react/24/outline';
import { UniversityLocation, getAllUniversities, getUniversitiesByRegion, searchUniversities, getMapCenter } from '../data/universityLocations';

// Import Leaflet types
declare global {
  interface Window {
    L: any;
  }
}

interface University {
  _id: string;
  name: string;
  nameFr: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  region: string;
  regionFr: string;
}

interface UniversitiesMapProps {
  height?: string;
  showFilters?: boolean;
  onUniversityClick?: (university: UniversityLocation) => void;
  universities?: University[]; // New prop for external university data
}

const UniversitiesMap: React.FC<UniversitiesMapProps> = ({ 
  height = '600px', 
  showFilters = true,
  onUniversityClick,
  universities: externalUniversities
}) => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  
  // Use external universities if provided, otherwise use static data
  const staticUniversities = getAllUniversities();
  const [universities, setUniversities] = useState<UniversityLocation[]>(
    externalUniversities ? convertToUniversityLocations(externalUniversities) : staticUniversities
  );
  const [filteredUniversities, setFilteredUniversities] = useState<UniversityLocation[]>(
    externalUniversities ? convertToUniversityLocations(externalUniversities) : staticUniversities
  );
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedUniversity, setSelectedUniversity] = useState<UniversityLocation | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Convert external university data to UniversityLocation format
  function convertToUniversityLocations(uniData: University[]): UniversityLocation[] {
    return uniData.map((uni, index) => ({
      id: uni._id || `uni-${index}`,
      name: uni.name,
      nameFr: uni.nameFr,
      city: uni.address || 'Unknown City',
      cityFr: uni.address || 'Ville Inconnue',
      region: uni.region as 'الشمال' | 'الوسط' | 'الجنوب',
      regionFr: uni.regionFr as 'Nord' | 'Centre' | 'Sud',
      latitude: getDefaultLatitude(uni.region),
      longitude: getDefaultLongitude(uni.region),
      address: uni.address || 'Address not available',
      website: uni.website,
      email: uni.email,
      phone: uni.phone,
      type: 'جامعة' as const,
      typeFr: 'Université' as const
    }));
  }

  // Get default coordinates based on region
  function getDefaultLatitude(region: string): number {
    switch (region) {
      case 'الشمال': return 36.8065; // Tunis area
      case 'الوسط': return 35.8245; // Sousse area
      case 'الجنوب': return 33.8869; // Sfax area
      default: return 36.8065;
    }
  }

  function getDefaultLongitude(region: string): number {
    switch (region) {
      case 'الشمال': return 10.1815; // Tunis area
      case 'الوسط': return 10.6346; // Sousse area
      case 'الجنوب': return 10.4958; // Sfax area
      default: return 10.1815;
    }
  }

  // Update universities when external data changes
  useEffect(() => {
    if (externalUniversities) {
      const convertedUniversities = convertToUniversityLocations(externalUniversities);
      setUniversities(convertedUniversities);
      setFilteredUniversities(convertedUniversities);
    }
  }, [externalUniversities]);

  // Load Leaflet script
  useEffect(() => {
    const loadLeaflet = () => {
      return new Promise<void>((resolve, reject) => {
        // Check if Leaflet is already loaded
        if (window.L) {
          resolve();
          return;
        }

        // Load Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);

        // Load Leaflet JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Leaflet'));
        document.head.appendChild(script);
      });
    };

    loadLeaflet()
      .then(() => {
        setIsMapLoaded(true);
        setMapError(null);
      })
      .catch((error) => {
        console.error('Failed to load Leaflet:', error);
        setMapError('Map could not be loaded');
        setIsMapLoaded(true); // Set to true to show fallback
      });
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded || !window.L || map) return;

    try {
      const L = window.L;
      const mapCenter = getMapCenter();
      const newMap = L.map(mapRef.current).setView([mapCenter.latitude, mapCenter.longitude], 7);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(newMap);

      setMap(newMap);
    } catch (error) {
      console.error('Failed to initialize map:', error);
      setMapError('Map could not be initialized');
    }
  }, [isMapLoaded, map]);

  // Add markers when map is loaded
  useEffect(() => {
    if (!map || !window.L || mapError) return;

    try {
      const L = window.L;
      
      // Clear existing markers
      markers.forEach(marker => map.removeLayer(marker));
      const newMarkers: any[] = [];

      // Add markers for filtered universities
      filteredUniversities.forEach((university, index) => {
        // Create custom icon
        const getRegionColor = (region: string) => {
          switch (region) {
            case 'الشمال':
              return '#3B82F6'; // Blue
            case 'الوسط':
              return '#10B981'; // Green
            case 'الجنوب':
              return '#F59E0B'; // Orange
            default:
              return '#6B7280'; // Gray
          }
        };

        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              background-color: ${getRegionColor(university.region)};
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 12px;
            ">
              ${index + 1}
            </div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        const marker = L.marker([university.latitude, university.longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width: 250px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1F2937;">
                ${language === 'ar' ? university.name : university.nameFr}
              </h3>
              <p style="margin: 0 0 4px 0; color: #6B7280; font-size: 14px;">
                ${language === 'ar' ? university.city : university.cityFr}
              </p>
              <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 14px;">
                ${language === 'ar' ? university.region : university.regionFr}
              </p>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                ${university.website ? `
                  <a href="${university.website}" target="_blank" style="
                    background-color: #3B82F6;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    text-decoration: none;
                    font-size: 12px;
                  ">
                    ${language === 'ar' ? 'الموقع' : 'Site'}
                  </a>
                ` : ''}
                ${university.email ? `
                  <a href="mailto:${university.email}" style="
                    background-color: #10B981;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    text-decoration: none;
                    font-size: 12px;
                  ">
                    ${language === 'ar' ? 'البريد' : 'Email'}
                  </a>
                ` : ''}
              </div>
            </div>
          `);

        marker.on('click', () => {
          setSelectedUniversity(university);
          if (onUniversityClick) {
            onUniversityClick(university);
          }
        });

        newMarkers.push(marker);
      });

      setMarkers(newMarkers);

      // Fit map to show all markers
      if (newMarkers.length > 0) {
        const group = L.featureGroup(newMarkers);
        map.fitBounds(group.getBounds().pad(0.1));
      }
    } catch (error) {
      console.error('Failed to add markers:', error);
      setMapError('Failed to add markers to map');
    }
  }, [map, filteredUniversities, language, onUniversityClick, mapError]);

  // Filter universities
  const filterUniversities = () => {
    let filtered = universities;
    
    // Filter by region
    if (selectedRegion !== 'all') {
      filtered = externalUniversities 
        ? universities.filter(uni => uni.region === selectedRegion)
        : getUniversitiesByRegion(selectedRegion as any);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      filtered = externalUniversities
        ? universities.filter(uni => 
            uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            uni.nameFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            uni.city.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : searchUniversities(searchTerm);
    }
    
    setFilteredUniversities(filtered);
  };

  // Apply filters when search term or region changes
  useEffect(() => {
    filterUniversities();
  }, [searchTerm, selectedRegion, universities]);

  // Get region color for badges
  const getRegionColor = (region: string) => {
    switch (region) {
      case 'الشمال':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'الوسط':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'الجنوب':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (mapError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {mapError}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'البحث' : 'Recherche'}
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'ar' ? 'البحث في الجامعات...' : 'Rechercher des universités...'}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'المنطقة' : 'Région'}
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">{language === 'ar' ? 'جميع المناطق' : 'Toutes les régions'}</option>
                <option value="الشمال">{language === 'ar' ? 'الشمال' : 'Nord'}</option>
                <option value="الوسط">{language === 'ar' ? 'الوسط' : 'Centre'}</option>
                <option value="الجنوب">{language === 'ar' ? 'الجنوب' : 'Sud'}</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Map Container */}
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }}
        className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm"
      >
        {!isMapLoaded && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* University List */}
      {filteredUniversities.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'الجامعات المعروضة' : 'Universités affichées'} ({filteredUniversities.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUniversities.map((university, index) => (
              <div
                key={`${university.name}-${index}`}
                className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedUniversity(university);
                  if (onUniversityClick) {
                    onUniversityClick(university);
                  }
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    {language === 'ar' ? university.name : university.nameFr}
                  </h4>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRegionColor(university.region)}`}>
                    {index + 1}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {language === 'ar' ? university.city : university.cityFr}
                </p>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRegionColor(university.region)}`}>
                  {language === 'ar' ? university.region : university.regionFr}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Selected University Details */}
      {selectedUniversity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {language === 'ar' ? selectedUniversity.name : selectedUniversity.nameFr}
            </h3>
            <button
              onClick={() => setSelectedUniversity(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <MapPinIcon className="inline h-4 w-4 mr-2" />
              {language === 'ar' ? selectedUniversity.city : selectedUniversity.cityFr}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRegionColor(selectedUniversity.region)}`}>
                {language === 'ar' ? selectedUniversity.region : selectedUniversity.regionFr}
              </span>
            </p>
            
            <div className="flex space-x-2 rtl:space-x-reverse">
              {selectedUniversity.website && (
                <a
                  href={selectedUniversity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <GlobeAltIcon className="h-4 w-4 mr-1" />
                  {language === 'ar' ? 'الموقع الإلكتروني' : 'Site web'}
                </a>
              )}
              {selectedUniversity.email && (
                <a
                  href={`mailto:${selectedUniversity.email}`}
                  className="flex items-center text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                >
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </a>
              )}
              {selectedUniversity.phone && (
                <a
                  href={`tel:${selectedUniversity.phone}`}
                  className="flex items-center text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  {language === 'ar' ? 'الهاتف' : 'Téléphone'}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UniversitiesMap; 