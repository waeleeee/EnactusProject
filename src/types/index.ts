export interface UniversityProgram {
  id: string;
  university: string;
  degree: string;
  duration: string | null;
  special_note: string | null;
  field: string;
  score: string;
  code: string;
  specialization: string | null;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  region?: 'الشمال' | 'الوسط' | 'الجنوب';
  regionFr?: 'Nord' | 'Centre' | 'Sud';
}

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

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  bacStream: BacStream;
  bacYear: number;
  scores: SubjectScores;
  fgScore: number;
  tScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type BacStream = 
  | 'آداب'
  | 'رياضيات'
  | 'علوم تقنية'
  | 'علوم تجريبية'
  | 'إقتصاد وتصرف'
  | 'علوم الإعلامية'
  | 'رياضة';

export interface SubjectScores {
  MG: number; // المعدل النهائي للبكالوريا
  A?: number; // عربية
  PH?: number; // فلسفة
  HG?: number; // تاريخ وجغرافيا
  F: number; // فرنسية
  Ang: number; // إنقليزية
  M?: number; // رياضيات
  SP?: number; // علوم فيزيائية
  SVT?: number; // علوم الحياة والأرض
  Algo?: number; // الخوارزميات والبرمجة
  STI?: number; // أنظمة وتكنولوجيات المعلوماتية
  Ec?: number; // اقتصاد
  Ge?: number; // تصرف
  IT?: number; // إيطالية
  All?: number; // ألمانية
  ESP?: number; // اسبانية
  'Sp-sport'?: number; // رياضة
  TE?: number; // تكنولوجيا (علوم تقنية)
  SB?: number; // علوم الحياة (رياضة)
  EP?: number; // تربية بدنية (رياضة)
}

export interface Governorate {
  id: string;
  name: string;
  nameFr: string;
  region: 'الشمال' | 'الوسط' | 'الجنوب';
  regionFr: 'Nord' | 'Centre' | 'Sud';
  hasGeographicBonus: boolean;
}

export interface FGFormula {
  stream: BacStream;
  formula: string;
  description: string;
}

export interface Recommendation {
  program: UniversityProgram;
  matchScore: number;
  category: 'best_match' | 'stretch_goal' | 'safe_option';
  reasons: string[];
}

export interface FavoriteProgram {
  id: string;
  programId: string;
  program: UniversityProgram;
  addedAt: Date;
  notes?: string;
}

export interface OrientationCalendar {
  id: string;
  title: string;
  titleFr: string;
  date: Date;
  description: string;
  descriptionFr: string;
  category: 'fg_publishing' | 'primary_orientation' | 'final_orientation' | 'foreign_bac' | 're_orientation' | 'test_programs';
}

export interface AppState {
  language: 'ar' | 'fr';
  studentProfile: StudentProfile;
  favoritePrograms: FavoriteProgram[];
  recommendations: Recommendation[];
  universityPrograms: UniversityProgram[];
  loading: boolean;
  error: string | null;
}

export interface FilterOptions {
  university?: string;
  field?: string;
  minScore?: number;
  maxScore?: number;
  governorate?: string;
  specialization?: string;
  eligibleOnly?: boolean;
} 