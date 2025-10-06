import { OrientationCalendar } from '../types';

export const orientationEvents: OrientationCalendar[] = [
  // January 2025
  {
    id: '1',
    title: 'بداية التسجيل في مناظرة الباكالوريا 2025',
    titleFr: 'Début des inscriptions au concours du Bac 2025',
    date: new Date('2025-01-15'),
    description: 'بداية فترة التسجيل في مناظرة الباكالوريا للدورة الرئيسية 2025. يجب على جميع الطلاب التسجيل عبر المنصة الرسمية.',
    descriptionFr: 'Début de la période d\'inscription au concours du Bac pour la session principale 2025. Tous les étudiants doivent s\'inscrire via la plateforme officielle.',
    category: 'primary_orientation'
  },
  {
    id: '2',
    title: 'إعلان برامج التكوين المهني الجديدة',
    titleFr: 'Annonce des nouveaux programmes de formation professionnelle',
    date: new Date('2025-01-20'),
    description: 'إعلان البرامج الجديدة في التكوين المهني والاختصاصات المتاحة للطلاب.',
    descriptionFr: 'Annonce des nouveaux programmes de formation professionnelle et des spécialités disponibles pour les étudiants.',
    category: 'test_programs'
  },

  // February 2025
  {
    id: '3',
    title: 'انتهاء التسجيل في مناظرة الباكالوريا',
    titleFr: 'Fin des inscriptions au concours du Bac',
    date: new Date('2025-02-15'),
    description: 'آخر موعد للتسجيل في مناظرة الباكالوريا 2025. لا يمكن التسجيل بعد هذا التاريخ.',
    descriptionFr: 'Dernière date limite pour s\'inscrire au concours du Bac 2025. Aucune inscription ne sera acceptée après cette date.',
    category: 'primary_orientation'
  },
  {
    id: '4',
    title: 'بداية التسجيل في الاختبارات النفسية',
    titleFr: 'Début des inscriptions aux tests psychologiques',
    date: new Date('2025-02-20'),
    description: 'بداية التسجيل في الاختبارات النفسية لتحديد الميول المهنية للطلاب.',
    descriptionFr: 'Début des inscriptions aux tests psychologiques pour déterminer les tendances professionnelles des étudiants.',
    category: 'test_programs'
  },

  // March 2025
  {
    id: '5',
    title: 'مناظرة إعادة التوجيه - مارس 2025',
    titleFr: 'Concours de réorientation - Mars 2025',
    date: new Date('2025-03-10'),
    description: 'مناظرة إعادة التوجيه للطلاب الراغبين في تغيير اختصاصهم أو جامعتهم.',
    descriptionFr: 'Concours de réorientation pour les étudiants souhaitant changer de spécialité ou d\'université.',
    category: 're_orientation'
  },
  {
    id: '6',
    title: 'إعلان نتائج الاختبارات النفسية',
    titleFr: 'Annonce des résultats des tests psychologiques',
    date: new Date('2025-03-25'),
    description: 'إعلان نتائج الاختبارات النفسية وتوصيات التوجيه للطلاب.',
    descriptionFr: 'Annonce des résultats des tests psychologiques et des recommandations d\'orientation pour les étudiants.',
    category: 'test_programs'
  },

  // April 2025
  {
    id: '7',
    title: 'بداية التسجيل في التكوين المهني',
    titleFr: 'Début des inscriptions à la formation professionnelle',
    date: new Date('2025-04-01'),
    description: 'بداية التسجيل في برامج التكوين المهني والاختصاصات التقنية.',
    descriptionFr: 'Début des inscriptions aux programmes de formation professionnelle et aux spécialités techniques.',
    category: 'test_programs'
  },
  {
    id: '8',
    title: 'إعلان برامج الدراسة بالخارج',
    titleFr: 'Annonce des programmes d\'études à l\'étranger',
    date: new Date('2025-04-15'),
    description: 'إعلان البرامج المتاحة للدراسة في الخارج والمنح الدراسية.',
    descriptionFr: 'Annonce des programmes disponibles pour les études à l\'étranger et des bourses d\'études.',
    category: 'foreign_bac'
  },

  // May 2025
  {
    id: '9',
    title: 'بداية امتحانات الباكالوريا',
    titleFr: 'Début des examens du Bac',
    date: new Date('2025-05-20'),
    description: 'بداية امتحانات الباكالوريا للدورة الرئيسية 2025.',
    descriptionFr: 'Début des examens du Bac pour la session principale 2025.',
    category: 'primary_orientation'
  },
  {
    id: '10',
    title: 'انتهاء امتحانات الباكالوريا',
    titleFr: 'Fin des examens du Bac',
    date: new Date('2025-05-30'),
    description: 'انتهاء امتحانات الباكالوريا وبداية فترة انتظار النتائج.',
    descriptionFr: 'Fin des examens du Bac et début de la période d\'attente des résultats.',
    category: 'primary_orientation'
  },

  // June 2025
  {
    id: '11',
    title: 'إعلان نتائج الباكالوريا',
    titleFr: 'Annonce des résultats du Bac',
    date: new Date('2025-06-15'),
    description: 'إعلان نتائج امتحانات الباكالوريا ونشر النقاط.',
    descriptionFr: 'Annonce des résultats des examens du Bac et publication des notes.',
    category: 'fg_publishing'
  },
  {
    id: '12',
    title: 'بداية التوجيه الأولي',
    titleFr: 'Début de l\'orientation primaire',
    date: new Date('2025-06-20'),
    description: 'بداية عملية التوجيه الأولي للطلاب الناجحين في الباكالوريا.',
    descriptionFr: 'Début du processus d\'orientation primaire pour les étudiants ayant réussi le Bac.',
    category: 'primary_orientation'
  },

  // July 2025
  {
    id: '13',
    title: 'انتهاء التوجيه الأولي',
    titleFr: 'Fin de l\'orientation primaire',
    date: new Date('2025-07-10'),
    description: 'انتهاء فترة التوجيه الأولي وإعلان النتائج الأولية.',
    descriptionFr: 'Fin de la période d\'orientation primaire et annonce des résultats préliminaires.',
    category: 'primary_orientation'
  },
  {
    id: '14',
    title: 'بداية التوجيه النهائي',
    titleFr: 'Début de l\'orientation finale',
    date: new Date('2025-07-15'),
    description: 'بداية عملية التوجيه النهائي وتوزيع الطلاب على الجامعات.',
    descriptionFr: 'Début du processus d\'orientation finale et répartition des étudiants dans les universités.',
    category: 'final_orientation'
  },

  // August 2025
  {
    id: '15',
    title: 'إعلان نتائج التوجيه النهائي',
    titleFr: 'Annonce des résultats de l\'orientation finale',
    date: new Date('2025-08-05'),
    description: 'إعلان النتائج النهائية للتوجيه وتوزيع الطلاب على الاختصاصات.',
    descriptionFr: 'Annonce des résultats finaux de l\'orientation et répartition des étudiants par spécialités.',
    category: 'final_orientation'
  },
  {
    id: '16',
    title: 'مناظرة إعادة التوجيه - أوت 2025',
    titleFr: 'Concours de réorientation - Août 2025',
    date: new Date('2025-08-20'),
    description: 'مناظرة إعادة التوجيه للطلاب غير الراضين عن نتائج التوجيه النهائي.',
    descriptionFr: 'Concours de réorientation pour les étudiants insatisfaits des résultats de l\'orientation finale.',
    category: 're_orientation'
  },

  // September 2025
  {
    id: '17',
    title: 'بداية السنة الدراسية الجامعية',
    titleFr: 'Début de l\'année universitaire',
    date: new Date('2025-09-15'),
    description: 'بداية السنة الدراسية الجديدة في الجامعات والمعاهد العليا.',
    descriptionFr: 'Début de la nouvelle année universitaire dans les universités et instituts supérieurs.',
    category: 'final_orientation'
  },
  {
    id: '18',
    title: 'إعلان نتائج إعادة التوجيه',
    titleFr: 'Annonce des résultats de réorientation',
    date: new Date('2025-09-25'),
    description: 'إعلان النتائج النهائية لمناظرة إعادة التوجيه.',
    descriptionFr: 'Annonce des résultats finaux du concours de réorientation.',
    category: 're_orientation'
  },

  // October 2025
  {
    id: '19',
    title: 'بداية التسجيل في مناظرة الباكالوريا 2026',
    titleFr: 'Début des inscriptions au concours du Bac 2026',
    date: new Date('2025-10-01'),
    description: 'بداية التسجيل في مناظرة الباكالوريا للدورة الرئيسية 2026.',
    descriptionFr: 'Début des inscriptions au concours du Bac pour la session principale 2026.',
    category: 'primary_orientation'
  },
  {
    id: '20',
    title: 'إعلان برامج الماجستير الجديدة',
    titleFr: 'Annonce des nouveaux programmes de Master',
    date: new Date('2025-10-15'),
    description: 'إعلان البرامج الجديدة في الماجستير والاختصاصات المتاحة.',
    descriptionFr: 'Annonce des nouveaux programmes de Master et des spécialités disponibles.',
    category: 'test_programs'
  },

  // November 2025
  {
    id: '21',
    title: 'مناظرة الباكالوريا الأجنبية',
    titleFr: 'Concours du Bac étranger',
    date: new Date('2025-11-10'),
    description: 'مناظرة خاصة لحاملي الباكالوريا الأجنبية للالتحاق بالجامعات التونسية.',
    descriptionFr: 'Concours spécial pour les titulaires du Bac étranger pour intégrer les universités tunisiennes.',
    category: 'foreign_bac'
  },
  {
    id: '22',
    title: 'إعلان نتائج الباكالوريا الأجنبية',
    titleFr: 'Annonce des résultats du Bac étranger',
    date: new Date('2025-11-25'),
    description: 'إعلان نتائج مناظرة الباكالوريا الأجنبية.',
    descriptionFr: 'Annonce des résultats du concours du Bac étranger.',
    category: 'foreign_bac'
  },

  // December 2025
  {
    id: '23',
    title: 'إعلان التقويم الجامعي 2026',
    titleFr: 'Annonce du calendrier universitaire 2026',
    date: new Date('2025-12-01'),
    description: 'إعلان التقويم الجامعي للسنة الدراسية 2025-2026.',
    descriptionFr: 'Annonce du calendrier universitaire pour l\'année académique 2025-2026.',
    category: 'test_programs'
  },
  {
    id: '24',
    title: 'انتهاء السنة الدراسية الجامعية',
    titleFr: 'Fin de l\'année universitaire',
    date: new Date('2025-12-20'),
    description: 'انتهاء الفصل الدراسي الأول وبداية العطلة الشتوية.',
    descriptionFr: 'Fin du premier semestre et début des vacances d\'hiver.',
    category: 'final_orientation'
  }
];

// Helper function to get events by category
export const getEventsByCategory = (category: OrientationCalendar['category']) => {
  return orientationEvents.filter(event => event.category === category);
};

// Helper function to get events by month
export const getEventsByMonth = (month: number, year: number) => {
  return orientationEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === month && eventDate.getFullYear() === year;
  });
};

// Helper function to get upcoming events
export const getUpcomingEvents = (limit: number = 5) => {
  const now = new Date();
  return orientationEvents
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
};

// Helper function to get events for current month
export const getCurrentMonthEvents = () => {
  const now = new Date();
  return getEventsByMonth(now.getMonth(), now.getFullYear());
}; 