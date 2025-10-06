export interface UniversityWebsite {
  name: string;
  nameFr: string;
  website: string;
  email?: string;
  phone?: string;
  address?: string;
  region: 'الشمال' | 'الوسط' | 'الجنوب';
  regionFr: 'Nord' | 'Centre' | 'Sud';
}

export const universityWebsites: UniversityWebsite[] = [
  // جامعة تونس (University of Tunis)
  {
    name: "جامعة تونس",
    nameFr: "Université de Tunis",
    website: "https://www.utunis.rnu.tn",
    email: "contact@utunis.rnu.tn",
    phone: "+216 71 872 600",
    address: "92 شارع 9 أفريل 1938، تونس 1007",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة تونس المنار (University of Tunis El Manar)
  {
    name: "جامعة تونس المنار",
    nameFr: "Université de Tunis El Manar",
    website: "https://www.utm.rnu.tn",
    email: "contact@utm.rnu.tn",
    phone: "+216 71 872 600",
    address: "تونس المنار، تونس",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة قرطاج (University of Carthage)
  {
    name: "جامعة قرطاج",
    nameFr: "Université de Carthage",
    website: "i",
    email: "contact@ucar.rnu.tn",
    phone: "+216 71 872 600",
    address: "قرطاج، تونس",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة منوبة (University of Manouba)
  {
    name: "جامعة منوبة",
    nameFr: "Université de Manouba",
    website: "https://www.uma.rnu.tn",
    email: "contact@uma.rnu.tn",
    phone: "+216 71 872 600",
    address: "منوبة، تونس",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة سوسة (University of Sousse)
  {
    name: "جامعة سوسة",
    nameFr: "Université de Sousse",
    website: "https://www.uc.rnu.tn",
    email: "contact@uc.rnu.tn",
    phone: "+216 73 227 000",
    address: "سوسة، تونس",
    region: "الوسط",
    regionFr: "Centre"
  },

  // جامعة المنستير (University of Monastir)
  {
    name: "جامعة المنستير",
    nameFr: "Université de Monastir",
    website: "https://www.um.rnu.tn",
    email: "contact@um.rnu.tn",
    phone: "+216 73 500 511",
    address: "المنستير، تونس",
    region: "الوسط",
    regionFr: "Centre"
  },

  // جامعة صفاقس (University of Sfax)
  {
    name: "جامعة صفاقس",
    nameFr: "Université de Sfax",
    website: "https://www.usf.rnu.tn",
    email: "contact@usf.rnu.tn",
    phone: "+216 74 240 400",
    address: "صفاقس، تونس",
    region: "الوسط",
    regionFr: "Centre"
  },

  // جامعة قابس (University of Gabes)
  {
    name: "جامعة قابس",
    nameFr: "Université de Gabès",
    website: "https://www.ugb.rnu.tn",
    email: "contact@ugb.rnu.tn",
    phone: "+216 75 274 000",
    address: "قابس، تونس",
    region: "الجنوب",
    regionFr: "Sud"
  },

  // جامعة قفصة (University of Gafsa)
  {
    name: "جامعة قفصة",
    nameFr: "Université de Gafsa",
    website: "https://www.ugaf.rnu.tn",
    email: "contact@ugaf.rnu.tn",
    phone: "+216 76 220 000",
    address: "قفصة، تونس",
    region: "الجنوب",
    regionFr: "Sud"
  },

  // جامعة القيروان (University of Kairouan)
  {
    name: "جامعة القيروان",
    nameFr: "Université de Kairouan",
    website: "https://www.uck.rnu.tn",
    email: "contact@uck.rnu.tn",
    phone: "+216 77 220 000",
    address: "القيروان، تونس",
    region: "الوسط",
    regionFr: "Centre"
  },

  // جامعة جندوبة (University of Jendouba)
  {
    name: "جامعة جندوبة",
    nameFr: "Université de Jendouba",
    website: "https://www.uj.rnu.tn",
    email: "contact@uj.rnu.tn",
    phone: "+216 78 613 000",
    address: "جندوبة، تونس",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة الكاف (University of El Kef)
  {
    name: "جامعة الكاف",
    nameFr: "Université de El Kef",
    website: "https://www.uck.rnu.tn",
    email: "contact@uck.rnu.tn",
    phone: "+216 78 220 000",
    address: "الكاف، تونس",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة سليانة (University of Siliana)
  {
    name: "جامعة سليانة",
    nameFr: "Université de Siliana",
    website: "https://www.usil.rnu.tn",
    email: "contact@usil.rnu.tn",
    phone: "+216 78 220 000",
    address: "سليانة، تونس",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة باجة (University of Beja)
  {
    name: "جامعة باجة",
    nameFr: "Université de Béja",
    website: "https://www.ub.rnu.tn",
    email: "contact@ub.rnu.tn",
    phone: "+216 78 220 000",
    address: "باجة، تونس",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة زغوان (University of Zaghouan)
  {
    name: "جامعة زغوان",
    nameFr: "Université de Zaghouan",
    website: "https://www.uz.rnu.tn",
    email: "contact@uz.rnu.tn",
    phone: "+216 72 220 000",
    address: "زغوان، تونس",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة بن عروس (University of Ben Arous)
  {
    name: "جامعة بن عروس",
    nameFr: "Université de Ben Arous",
    website: "https://www.uba.rnu.tn",
    email: "contact@uba.rnu.tn",
    phone: "+216 71 220 000",
    address: "بن عروس، تونس",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة أريانة (University of Ariana)
  {
    name: "جامعة أريانة",
    nameFr: "Université d'Ariana",
    website: "https://www.uar.rnu.tn",
    email: "contact@uar.rnu.tn",
    phone: "+216 71 220 000",
    address: "أريانة، تونس",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة نابل (University of Nabeul)
  {
    name: "جامعة نابل",
    nameFr: "Université de Nabeul",
    website: "https://www.unab.rnu.tn",
    email: "contact@unab.rnu.tn",
    phone: "+216 72 220 000",
    address: "نابل، تونس",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة بنزرت (University of Bizerte)
  {
    name: "جامعة بنزرت",
    nameFr: "Université de Bizerte",
    website: "https://www.ubz.rnu.tn",
    email: "contact@ubz.rnu.tn",
    phone: "+216 72 220 000",
    address: "بنزرت، تونس",
    region: "الشمال",
    regionFr: "Nord"
  },

  // جامعة المهدية (University of Mahdia)
  {
    name: "جامعة المهدية",
    nameFr: "Université de Mahdia",
    website: "https://www.umhd.rnu.tn",
    email: "contact@umhd.rnu.tn",
    phone: "+216 73 220 000",
    address: "المهدية، تونس",
    region: "الوسط",
    regionFr: "Centre"
  },

  // جامعة القصرين (University of Kasserine)
  {
    name: "جامعة القصرين",
    nameFr: "Université de Kasserine",
    website: "https://www.ukas.rnu.tn",
    email: "contact@ukas.rnu.tn",
    phone: "+216 77 220 000",
    address: "القصرين، تونس",
    region: "الوسط",
    regionFr: "Centre"
  },

  // جامعة سيدي بوزيد (University of Sidi Bouzid)
  {
    name: "جامعة سيدي بوزيد",
    nameFr: "Université de Sidi Bouzid",
    website: "https://www.usb.rnu.tn",
    email: "contact@usb.rnu.tn",
    phone: "+216 76 220 000",
    address: "سيدي بوزيد، تونس",
    region: "الوسط",
    regionFr: "Centre"
  },

  // جامعة تطاوين (University of Tataouine)
  {
    name: "جامعة تطاوين",
    nameFr: "Université de Tataouine",
    website: "https://www.utt.rnu.tn",
    email: "contact@utt.rnu.tn",
    phone: "+216 75 220 000",
    address: "تطاوين، تونس",
    region: "الجنوب",
    regionFr: "Sud"
  },

  // جامعة مدنين (University of Medenine)
  {
    name: "جامعة مدنين",
    nameFr: "Université de Médenine",
    website: "https://www.umed.rnu.tn",
    email: "contact@umed.rnu.tn",
    phone: "+216 75 220 000",
    address: "مدنين، تونس",
    region: "الجنوب",
    regionFr: "Sud"
  },

  // جامعة قبلي (University of Kebili)
  {
    name: "جامعة قبلي",
    nameFr: "Université de Kébili",
    website: "https://www.ukeb.rnu.tn",
    email: "contact@ukeb.rnu.tn",
    phone: "+216 75 220 000",
    address: "قبلي، تونس",
    region: "الجنوب",
    regionFr: "Sud"
  },

  // جامعة توزر (University of Tozeur)
  {
    name: "جامعة توزر",
    nameFr: "Université de Tozeur",
    website: "https://www.uto.rnu.tn",
    email: "contact@uto.rnu.tn",
    phone: "+216 76 220 000",
    address: "توزر، تونس",
    region: "الجنوب",
    regionFr: "Sud"
  }
];

// Helper function to find university website by name
export const findUniversityWebsite = (universityName: string): UniversityWebsite | null => {
  const normalizedName = universityName.toLowerCase();
  
  return universityWebsites.find(uni => {
    const uniNameAr = uni.name.toLowerCase();
    const uniNameFr = uni.nameFr.toLowerCase();
    
    // Check if the university name contains any of the main university names
    return uniNameAr.includes(normalizedName) || 
           uniNameFr.includes(normalizedName) ||
           normalizedName.includes(uniNameAr) ||
           normalizedName.includes(uniNameFr);
  }) || null;
};

// Helper function to get universities by region
export const getUniversitiesByRegion = (region: UniversityWebsite['region']) => {
  return universityWebsites.filter(uni => uni.region === region);
};

// Helper function to get all universities
export const getAllUniversities = () => {
  return universityWebsites;
};

// Helper function to search universities
export const searchUniversities = (searchTerm: string): UniversityWebsite[] => {
  const normalizedSearch = searchTerm.toLowerCase();
  
  return universityWebsites.filter(uni => {
    return uni.name.toLowerCase().includes(normalizedSearch) ||
           uni.nameFr.toLowerCase().includes(normalizedSearch) ||
           uni.address?.toLowerCase().includes(normalizedSearch);
  });
}; 