import { universityWebsites } from '../data/universityWebsites';

export interface UniversityProgram {
  university: string;
  degree: string;
  duration: string | null;
  special_note: string | null;
  field: string;
  score: string;
  code: string;
  specialization: string | null;
}

export interface Recommendation {
  program: UniversityProgram;
  matchScore: number;
  category: 'excellent' | 'good' | 'reach' | 'safety';
  probability: string;
}

export const BAC_STREAMS = {
  'آداب': 'Arts',
  'رياضيات': 'Mathematics',
  'علوم تقنية': 'Technical Sciences',
  'علوم تجريبية': 'Experimental Sciences',
  'إقتصاد وتصرف': 'Economics and Management',
  'علوم الإعلامية': 'Computer Science',
  'رياضة': 'Sports'
} as const;

export type BACStream = keyof typeof BAC_STREAMS;

export const getRecommendations = async (
  userScore: number,
  bacStream: BACStream,
  limit: number = 20
): Promise<Recommendation[]> => {
  try {
    // Load universities data
    const response = await fetch('/universities_tunisia.json');
    const programs: UniversityProgram[] = await response.json();

    // Filter programs by BAC stream and valid scores
    const relevantPrograms = programs.filter(program => {
      return program.field === bacStream && 
             program.score && 
             program.score.trim() !== '' &&
             !isNaN(parseFloat(program.score));
    });

    // Convert scores to numbers and create recommendations
    const recommendations: Recommendation[] = relevantPrograms
      .map(program => {
        const programScore = parseFloat(program.score);
        const scoreDifference = userScore - programScore;
        const matchScore = Math.max(0, 100 - Math.abs(scoreDifference) * 2);
        
        let category: Recommendation['category'];
        let probability: string;

        if (scoreDifference >= 10) {
          category = 'excellent';
          probability = 'احتمالية عالية جداً';
        } else if (scoreDifference >= 0) {
          category = 'good';
          probability = 'احتمالية عالية';
        } else if (scoreDifference >= -5) {
          category = 'reach';
          probability = 'احتمالية متوسطة';
        } else {
          category = 'safety';
          probability = 'احتمالية منخفضة';
        }

        return {
          program,
          matchScore,
          category,
          probability
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);

    return recommendations;
  } catch (error) {
    console.error('Error loading recommendations:', error);
    return [];
  }
};

export const getRecommendationsByCategory = (recommendations: Recommendation[]) => {
  return {
    excellent: recommendations.filter(r => r.category === 'excellent'),
    good: recommendations.filter(r => r.category === 'good'),
    reach: recommendations.filter(r => r.category === 'reach'),
    safety: recommendations.filter(r => r.category === 'safety')
  };
};

export const getCategoryStats = (recommendations: Recommendation[]) => {
  const categories = getRecommendationsByCategory(recommendations);
  return {
    excellent: categories.excellent.length,
    good: categories.good.length,
    reach: categories.reach.length,
    safety: categories.safety.length,
    total: recommendations.length
  };
};

export const getCategoryColor = (category: Recommendation['category']) => {
  switch (category) {
    case 'excellent':
      return 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    case 'good':
      return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    case 'reach':
      return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    case 'safety':
      return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    default:
      return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
  }
};

export const getCategoryIcon = (category: Recommendation['category']) => {
  switch (category) {
    case 'excellent':
      return '🎯';
    case 'good':
      return '✅';
    case 'reach':
      return '🎲';
    case 'safety':
      return '⚠️';
    default:
      return '📚';
  }
};

// Utility: Fetch up to N university programs by field (with website info)
export const getUniversityProgramsByField = async (
  field: string,
  limit: number = 10
) => {
  try {
    const response = await fetch('/universities_tunisia.json');
    const programs: UniversityProgram[] = await response.json();
    // Filter by field and valid degree
    const filtered = programs.filter(p => p.field === field && p.degree && p.university);
    // Attach website info
    const withWebsites = filtered.slice(0, limit).map(program => {
      const uniInfo = universityWebsites.find(
        u => program.university.includes(u.name) || program.university.includes(u.nameFr)
      );
      return {
        ...program,
        website: uniInfo?.website || '',
        universityAr: uniInfo?.name || program.university,
        universityFr: uniInfo?.nameFr || program.university
      };
    });
    return withWebsites;
  } catch (error) {
    console.error('Error loading university programs by field:', error);
    return [];
  }
}; 