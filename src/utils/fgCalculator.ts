import { BacStream, SubjectScores, FGFormula } from '../types';

// Official FG formulas from the guide
export const FG_FORMULAS: Record<BacStream, FGFormula> = {
  'آداب': {
    stream: 'آداب',
    formula: 'FG = 4MG + 1,5 A + 1,5 PH + 1 HG + 1F +1Ang',
    description: 'صيغة الإجمالية لشعبة الآداب'
  },
  'رياضيات': {
    stream: 'رياضيات',
    formula: 'FG = 4MG + 2 M + 1,5 SP + 0,5 SVT + 1F +1Ang',
    description: 'صيغة الإجمالية لشعبة الرياضيات'
  },
  'علوم تجريبية': {
    stream: 'علوم تجريبية',
    formula: 'FG = 4MG + 1 M + 1,5 SP + 1,5 SVT +1F +1Ang',
    description: 'صيغة الإجمالية لشعبة العلوم التجريبية'
  },
  'علوم تقنية': {
    stream: 'علوم تقنية',
    formula: 'FG = 4MG + 1,5 M +1,5 Algo +0,5 SP +0,5 STI +1F +1Ang',
    description: 'صيغة الإجمالية لشعبة العلوم التقنية'
  },
  'إقتصاد وتصرف': {
    stream: 'إقتصاد وتصرف',
    formula: 'FG = 4MG + 1,5 Ec + 1,5 Ge + 1F +1Ang',
    description: 'صيغة الإجمالية لشعبة الاقتصاد والتصرف'
  },
  'علوم الإعلامية': {
    stream: 'علوم الإعلامية',
    formula: 'FG = 4MG + 1,5 M + 1,5 Algo + 1F +1Ang',
    description: 'صيغة الإجمالية لشعبة علوم الإعلامية'
  },
  'رياضة': {
    stream: 'رياضة',
    formula: 'FG = 4MG + 1,5 Sp-sport + 1F +1Ang',
    description: 'صيغة الإجمالية لشعبة الرياضة'
  }
};

export function calculateFG(bacStream: BacStream, subjectsScores: SubjectScores): number {
  const { MG, A, PH, HG, F, Ang, M, SP, SVT, Algo, STI, Ec, Ge, TE, SB, EP } = subjectsScores;
  let fg = 0;
  switch (bacStream) {
    case 'آداب':
      if (!A || !PH || !HG || !F || !Ang) throw new Error('Missing required subjects for آداب stream');
      fg = 4 * MG + 1.5 * A + 1.5 * PH + 1 * HG + 1 * F + 1 * Ang;
      break;
    case 'رياضيات':
      if (!M || !SP || !SVT || !F || !Ang) throw new Error('Missing required subjects for رياضيات stream');
      fg = 4 * MG + 2 * M + 1.5 * SP + 0.5 * SVT + 1 * F + 1 * Ang;
      break;
    case 'علوم تجريبية':
      if (!M || !SP || !SVT || !F || !Ang) throw new Error('Missing required subjects for علوم تجريبية stream');
      fg = 4 * MG + 1 * M + 1.5 * SP + 1.5 * SVT + 1 * F + 1 * Ang;
      break;
    case 'إقتصاد وتصرف':
      if (!Ec || !Ge || !M || !HG || !F || !Ang) throw new Error('Missing required subjects for إقتصاد وتصرف stream');
      fg = 4 * MG + 1.5 * Ec + 1.5 * Ge + 0.5 * M + 0.5 * HG + 1 * F + 1 * Ang;
      break;
    case 'علوم تقنية':
      if (!TE || !M || !SP || !F || !Ang) throw new Error('Missing required subjects for علوم تقنية stream');
      fg = 4 * MG + 1.5 * TE + 1.5 * M + 1 * SP + 1 * F + 1 * Ang;
      break;
    case 'علوم الإعلامية':
      if (!M || !Algo || !SP || !STI || !F || !Ang) throw new Error('Missing required subjects for علوم الإعلامية stream');
      fg = 4 * MG + 1.5 * M + 1.5 * Algo + 0.5 * SP + 0.5 * STI + 1 * F + 1 * Ang;
      break;
    case 'رياضة':
      const sportScore = subjectsScores['Sp-sport' as keyof SubjectScores];
      if (!SB || !sportScore || !EP || !SP || !PH || !F || !Ang) throw new Error('Missing required subjects for رياضة stream');
      fg = 4 * MG + 1.5 * SB + 1 * sportScore + 0.5 * EP + 0.5 * SP + 0.5 * PH + 1 * F + 1 * Ang;
      break;
    default:
      throw new Error(`Unknown bac stream: ${bacStream}`);
  }
  return Math.round(fg * 1000) / 1000;
}

export function calculateT(fgScore: number, specializationBonus: number = 0, geographicBonus: number = 0): number {
  const tScore = fgScore + specializationBonus + geographicBonus;
  return Math.round(tScore * 1000) / 1000;
}

export function getGeographicBonus(governorate: string): number {
  // This would be based on the official geographic bonus system
  // For now, returning 0 - this should be implemented based on official data
  return 0;
}

export function validateSubjectScores(bacStream: BacStream, subjectsScores: SubjectScores): string[] {
  const errors: string[] = [];
  
  // Check if MG is provided
  if (!subjectsScores.MG) {
    errors.push('المعدل النهائي للبكالوريا مطلوب');
  }
  
  // Check if F and Ang are provided (required for all streams)
  if (!subjectsScores.F) {
    errors.push('معدل الفرنسية مطلوب');
  }
  if (!subjectsScores.Ang) {
    errors.push('معدل الإنجليزية مطلوب');
  }
  
  // Check stream-specific requirements
  switch (bacStream) {
    case 'آداب':
      if (!subjectsScores.A) errors.push('معدل العربية مطلوب لشعبة الآداب');
      if (!subjectsScores.PH) errors.push('معدل الفلسفة مطلوب لشعبة الآداب');
      if (!subjectsScores.HG) errors.push('معدل التاريخ والجغرافيا مطلوب لشعبة الآداب');
      break;
      
    case 'رياضيات':
      if (!subjectsScores.M) errors.push('معدل الرياضيات مطلوب لشعبة الرياضيات');
      if (!subjectsScores.SP) errors.push('معدل العلوم الفيزيائية مطلوب لشعبة الرياضيات');
      if (!subjectsScores.SVT) errors.push('معدل علوم الحياة والأرض مطلوب لشعبة الرياضيات');
      break;
      
    case 'علوم تجريبية':
      if (!subjectsScores.M) errors.push('معدل الرياضيات مطلوب لشعبة العلوم التجريبية');
      if (!subjectsScores.SP) errors.push('معدل العلوم الفيزيائية مطلوب لشعبة العلوم التجريبية');
      if (!subjectsScores.SVT) errors.push('معدل علوم الحياة والأرض مطلوب لشعبة العلوم التجريبية');
      break;
      
    case 'علوم تقنية':
      if (!subjectsScores.M) errors.push('معدل الرياضيات مطلوب لشعبة العلوم التقنية');
      if (!subjectsScores.Algo) errors.push('معدل الخوارزميات والبرمجة مطلوب لشعبة العلوم التقنية');
      if (!subjectsScores.SP) errors.push('معدل العلوم الفيزيائية مطلوب لشعبة العلوم التقنية');
      if (!subjectsScores.STI) errors.push('معدل أنظمة وتكنولوجيات المعلوماتية مطلوب لشعبة العلوم التقنية');
      break;
      
    case 'إقتصاد وتصرف':
      if (!subjectsScores.Ec) errors.push('معدل الاقتصاد مطلوب لشعبة الاقتصاد والتصرف');
      if (!subjectsScores.Ge) errors.push('معدل التصرف مطلوب لشعبة الاقتصاد والتصرف');
      break;
      
    case 'علوم الإعلامية':
      if (!subjectsScores.M) errors.push('معدل الرياضيات مطلوب لشعبة علوم الإعلامية');
      if (!subjectsScores.Algo) errors.push('معدل الخوارزميات والبرمجة مطلوب لشعبة علوم الإعلامية');
      break;
      
    case 'رياضة':
      // For رياضة, we need to check if there's a sport score
      const sportScore = subjectsScores['Sp-sport' as keyof SubjectScores];
      if (!sportScore) errors.push('معدل الاختصاص الرياضي مطلوب لشعبة الرياضة');
      break;
  }
  
  return errors;
} 