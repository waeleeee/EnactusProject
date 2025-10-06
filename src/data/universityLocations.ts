export interface UniversityLocation {
  id: string;
  name: string;
  nameFr: string;
  latitude: number;
  longitude: number;
  region: 'الشمال' | 'الوسط' | 'الجنوب';
  regionFr: 'Nord' | 'Centre' | 'Sud';
  city: string;
  cityFr: string;
  address: string;
  website?: string;
  email?: string;
  phone?: string;
  type: 'جامعة' | 'معهد عالي' | 'كلية';
  typeFr: 'Université' | 'Institut Supérieur' | 'Faculté';
}

export const universityLocations: UniversityLocation[] = [
  // جامعة تونس (University of Tunis)
  {
    id: 'utunis',
    name: 'جامعة تونس',
    nameFr: 'Université de Tunis',
    latitude: 36.8065,
    longitude: 10.1815,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'تونس',
    cityFr: 'Tunis',
    address: '92 شارع 9 أفريل 1938، تونس 1007',
    website: 'https://www.utunis.rnu.tn',
    email: 'contact@utunis.rnu.tn',
    phone: '+216 71 872 600',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة تونس المنار (University of Tunis El Manar)
  {
    id: 'utm',
    name: 'جامعة تونس المنار',
    nameFr: 'Université de Tunis El Manar',
    latitude: 36.8389,
    longitude: 10.1577,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'تونس المنار',
    cityFr: 'Tunis El Manar',
    address: 'تونس المنار، تونس',
    website: 'https://www.utm.rnu.tn',
    email: 'contact@utm.rnu.tn',
    phone: '+216 71 872 600',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة قرطاج (University of Carthage)
  {
    id: 'ucar',
    name: 'جامعة قرطاج',
    nameFr: 'Université de Carthage',
    latitude: 36.8549,
    longitude: 10.3303,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'قرطاج',
    cityFr: 'Carthage',
    address: 'قرطاج، تونس',
    website: 'https://www.ucar.rnu.tn',
    email: 'contact@ucar.rnu.tn',
    phone: '+216 71 872 600',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة منوبة (University of Manouba)
  {
    id: 'uma',
    name: 'جامعة منوبة',
    nameFr: 'Université de Manouba',
    latitude: 36.8077,
    longitude: 10.1012,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'منوبة',
    cityFr: 'Manouba',
    address: 'منوبة، تونس',
    website: 'https://www.uma.rnu.tn',
    email: 'contact@uma.rnu.tn',
    phone: '+216 71 872 600',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة سوسة (University of Sousse)
  {
    id: 'uc',
    name: 'جامعة سوسة',
    nameFr: 'Université de Sousse',
    latitude: 35.8333,
    longitude: 10.6333,
    region: 'الوسط',
    regionFr: 'Centre',
    city: 'سوسة',
    cityFr: 'Sousse',
    address: 'سوسة، تونس',
    website: 'https://www.uc.rnu.tn',
    email: 'contact@uc.rnu.tn',
    phone: '+216 73 227 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة المنستير (University of Monastir)
  {
    id: 'um',
    name: 'جامعة المنستير',
    nameFr: 'Université de Monastir',
    latitude: 35.7833,
    longitude: 10.8333,
    region: 'الوسط',
    regionFr: 'Centre',
    city: 'المنستير',
    cityFr: 'Monastir',
    address: 'المنستير، تونس',
    website: 'https://www.um.rnu.tn',
    email: 'contact@um.rnu.tn',
    phone: '+216 73 500 511',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة صفاقس (University of Sfax)
  {
    id: 'usf',
    name: 'جامعة صفاقس',
    nameFr: 'Université de Sfax',
    latitude: 34.7333,
    longitude: 10.7667,
    region: 'الوسط',
    regionFr: 'Centre',
    city: 'صفاقس',
    cityFr: 'Sfax',
    address: 'صفاقس، تونس',
    website: 'https://www.usf.rnu.tn',
    email: 'contact@usf.rnu.tn',
    phone: '+216 74 240 400',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة قابس (University of Gabes)
  {
    id: 'ugb',
    name: 'جامعة قابس',
    nameFr: 'Université de Gabès',
    latitude: 33.8833,
    longitude: 10.1167,
    region: 'الجنوب',
    regionFr: 'Sud',
    city: 'قابس',
    cityFr: 'Gabès',
    address: 'قابس، تونس',
    website: 'https://www.ugb.rnu.tn',
    email: 'contact@ugb.rnu.tn',
    phone: '+216 75 274 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة قفصة (University of Gafsa)
  {
    id: 'ugaf',
    name: 'جامعة قفصة',
    nameFr: 'Université de Gafsa',
    latitude: 34.4167,
    longitude: 8.7833,
    region: 'الجنوب',
    regionFr: 'Sud',
    city: 'قفصة',
    cityFr: 'Gafsa',
    address: 'قفصة، تونس',
    website: 'https://www.ugaf.rnu.tn',
    email: 'contact@ugaf.rnu.tn',
    phone: '+216 76 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة القيروان (University of Kairouan)
  {
    id: 'uck',
    name: 'جامعة القيروان',
    nameFr: 'Université de Kairouan',
    latitude: 35.6833,
    longitude: 10.1000,
    region: 'الوسط',
    regionFr: 'Centre',
    city: 'القيروان',
    cityFr: 'Kairouan',
    address: 'القيروان، تونس',
    website: 'https://www.uck.rnu.tn',
    email: 'contact@uck.rnu.tn',
    phone: '+216 77 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة جندوبة (University of Jendouba)
  {
    id: 'uj',
    name: 'جامعة جندوبة',
    nameFr: 'Université de Jendouba',
    latitude: 36.5000,
    longitude: 8.7833,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'جندوبة',
    cityFr: 'Jendouba',
    address: 'جندوبة، تونس',
    website: 'https://www.uj.rnu.tn',
    email: 'contact@uj.rnu.tn',
    phone: '+216 78 613 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة الكاف (University of El Kef)
  {
    id: 'uckef',
    name: 'جامعة الكاف',
    nameFr: 'Université de El Kef',
    latitude: 36.1833,
    longitude: 8.7167,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'الكاف',
    cityFr: 'El Kef',
    address: 'الكاف، تونس',
    website: 'https://www.uck.rnu.tn',
    email: 'contact@uck.rnu.tn',
    phone: '+216 78 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة سليانة (University of Siliana)
  {
    id: 'usil',
    name: 'جامعة سليانة',
    nameFr: 'Université de Siliana',
    latitude: 36.0833,
    longitude: 9.3667,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'سليانة',
    cityFr: 'Siliana',
    address: 'سليانة، تونس',
    website: 'https://www.usil.rnu.tn',
    email: 'contact@usil.rnu.tn',
    phone: '+216 78 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة باجة (University of Beja)
  {
    id: 'ub',
    name: 'جامعة باجة',
    nameFr: 'Université de Béja',
    latitude: 36.7333,
    longitude: 9.1833,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'باجة',
    cityFr: 'Béja',
    address: 'باجة، تونس',
    website: 'https://www.ub.rnu.tn',
    email: 'contact@ub.rnu.tn',
    phone: '+216 78 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة زغوان (University of Zaghouan)
  {
    id: 'uz',
    name: 'جامعة زغوان',
    nameFr: 'Université de Zaghouan',
    latitude: 36.4000,
    longitude: 10.1500,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'زغوان',
    cityFr: 'Zaghouan',
    address: 'زغوان، تونس',
    website: 'https://www.uz.rnu.tn',
    email: 'contact@uz.rnu.tn',
    phone: '+216 72 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة بن عروس (University of Ben Arous)
  {
    id: 'uba',
    name: 'جامعة بن عروس',
    nameFr: 'Université de Ben Arous',
    latitude: 36.7500,
    longitude: 10.2167,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'بن عروس',
    cityFr: 'Ben Arous',
    address: 'بن عروس، تونس',
    website: 'https://www.uba.rnu.tn',
    email: 'contact@uba.rnu.tn',
    phone: '+216 71 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة أريانة (University of Ariana)
  {
    id: 'uar',
    name: 'جامعة أريانة',
    nameFr: 'Université d\'Ariana',
    latitude: 36.8667,
    longitude: 10.1833,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'أريانة',
    cityFr: 'Ariana',
    address: 'أريانة، تونس',
    website: 'https://www.uar.rnu.tn',
    email: 'contact@uar.rnu.tn',
    phone: '+216 71 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة نابل (University of Nabeul)
  {
    id: 'unab',
    name: 'جامعة نابل',
    nameFr: 'Université de Nabeul',
    latitude: 36.4500,
    longitude: 10.7333,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'نابل',
    cityFr: 'Nabeul',
    address: 'نابل، تونس',
    website: 'https://www.unab.rnu.tn',
    email: 'contact@unab.rnu.tn',
    phone: '+216 72 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة بنزرت (University of Bizerte)
  {
    id: 'ubz',
    name: 'جامعة بنزرت',
    nameFr: 'Université de Bizerte',
    latitude: 37.2833,
    longitude: 9.8667,
    region: 'الشمال',
    regionFr: 'Nord',
    city: 'بنزرت',
    cityFr: 'Bizerte',
    address: 'بنزرت، تونس',
    website: 'https://www.ubz.rnu.tn',
    email: 'contact@ubz.rnu.tn',
    phone: '+216 72 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة المهدية (University of Mahdia)
  {
    id: 'umhd',
    name: 'جامعة المهدية',
    nameFr: 'Université de Mahdia',
    latitude: 35.5000,
    longitude: 11.0667,
    region: 'الوسط',
    regionFr: 'Centre',
    city: 'المهدية',
    cityFr: 'Mahdia',
    address: 'المهدية، تونس',
    website: 'https://www.umhd.rnu.tn',
    email: 'contact@umhd.rnu.tn',
    phone: '+216 73 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة القصرين (University of Kasserine)
  {
    id: 'ukas',
    name: 'جامعة القصرين',
    nameFr: 'Université de Kasserine',
    latitude: 35.1667,
    longitude: 8.8333,
    region: 'الوسط',
    regionFr: 'Centre',
    city: 'القصرين',
    cityFr: 'Kasserine',
    address: 'القصرين، تونس',
    website: 'https://www.ukas.rnu.tn',
    email: 'contact@ukas.rnu.tn',
    phone: '+216 77 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة سيدي بوزيد (University of Sidi Bouzid)
  {
    id: 'usb',
    name: 'جامعة سيدي بوزيد',
    nameFr: 'Université de Sidi Bouzid',
    latitude: 35.0333,
    longitude: 9.5000,
    region: 'الوسط',
    regionFr: 'Centre',
    city: 'سيدي بوزيد',
    cityFr: 'Sidi Bouzid',
    address: 'سيدي بوزيد، تونس',
    website: 'https://www.usb.rnu.tn',
    email: 'contact@usb.rnu.tn',
    phone: '+216 76 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة تطاوين (University of Tataouine)
  {
    id: 'utt',
    name: 'جامعة تطاوين',
    nameFr: 'Université de Tataouine',
    latitude: 32.9333,
    longitude: 10.4500,
    region: 'الجنوب',
    regionFr: 'Sud',
    city: 'تطاوين',
    cityFr: 'Tataouine',
    address: 'تطاوين، تونس',
    website: 'https://www.utt.rnu.tn',
    email: 'contact@utt.rnu.tn',
    phone: '+216 75 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة مدنين (University of Medenine)
  {
    id: 'umed',
    name: 'جامعة مدنين',
    nameFr: 'Université de Médenine',
    latitude: 33.3500,
    longitude: 10.5000,
    region: 'الجنوب',
    regionFr: 'Sud',
    city: 'مدنين',
    cityFr: 'Médenine',
    address: 'مدنين، تونس',
    website: 'https://www.umed.rnu.tn',
    email: 'contact@umed.rnu.tn',
    phone: '+216 75 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة قبلي (University of Kebili)
  {
    id: 'ukeb',
    name: 'جامعة قبلي',
    nameFr: 'Université de Kébili',
    latitude: 33.7000,
    longitude: 8.9667,
    region: 'الجنوب',
    regionFr: 'Sud',
    city: 'قبلي',
    cityFr: 'Kébili',
    address: 'قبلي، تونس',
    website: 'https://www.ukeb.rnu.tn',
    email: 'contact@ukeb.rnu.tn',
    phone: '+216 75 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  },

  // جامعة توزر (University of Tozeur)
  {
    id: 'uto',
    name: 'جامعة توزر',
    nameFr: 'Université de Tozeur',
    latitude: 33.9167,
    longitude: 8.1333,
    region: 'الجنوب',
    regionFr: 'Sud',
    city: 'توزر',
    cityFr: 'Tozeur',
    address: 'توزر، تونس',
    website: 'https://www.uto.rnu.tn',
    email: 'contact@uto.rnu.tn',
    phone: '+216 76 220 000',
    type: 'جامعة',
    typeFr: 'Université'
  }
];

// Helper function to get universities by region
export const getUniversitiesByRegion = (region: UniversityLocation['region']) => {
  return universityLocations.filter(uni => uni.region === region);
};

// Helper function to get universities by city
export const getUniversitiesByCity = (city: string) => {
  return universityLocations.filter(uni => 
    uni.city.toLowerCase().includes(city.toLowerCase()) ||
    uni.cityFr.toLowerCase().includes(city.toLowerCase())
  );
};

// Helper function to search universities
export const searchUniversities = (searchTerm: string): UniversityLocation[] => {
  const normalizedSearch = searchTerm.toLowerCase();
  
  return universityLocations.filter(uni => {
    return uni.name.toLowerCase().includes(normalizedSearch) ||
           uni.nameFr.toLowerCase().includes(normalizedSearch) ||
           uni.city.toLowerCase().includes(normalizedSearch) ||
           uni.cityFr.toLowerCase().includes(normalizedSearch);
  });
};

// Helper function to get all universities
export const getAllUniversities = () => {
  return universityLocations;
};

// Helper function to get map center coordinates (Tunisia center)
export const getMapCenter = () => {
  return {
    latitude: 35.8617,
    longitude: 10.5369
  };
}; 