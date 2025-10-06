import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, StudentProfile, FavoriteProgram, Recommendation, UniversityProgram } from '../types';
import { calculateFG, calculateT } from '../utils/fgCalculator';

interface AppStore extends AppState {
  setLanguage: (language: 'ar' | 'fr') => void;
  setStudentProfile: (profile: StudentProfile) => void;
  addFavoriteProgram: (program: FavoriteProgram) => void;
  removeFavoriteProgram: (programId: string) => void;
  addRecommendation: (recommendation: Recommendation) => void;
  clearRecommendations: () => void;
  setUniversityPrograms: (programs: UniversityProgram[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  calculateScores: (stream: string, scores: any) => void;
}

const initialState: AppState = {
  language: 'ar',
  studentProfile: {
    id: '',
    name: '',
    email: '',
    bacStream: 'آداب',
    bacYear: new Date().getFullYear(),
    scores: {
      MG: 0,
      A: 0,
      PH: 0,
      HG: 0,
      F: 0,
      Ang: 0,
      M: 0,
      SP: 0,
      SVT: 0,
      Algo: 0,
      STI: 0,
      Ec: 0,
      Ge: 0,
      'Sp-sport': 0
    },
    fgScore: 0,
    tScore: 0
  },
  favoritePrograms: [],
  recommendations: [],
  universityPrograms: [],
  loading: false,
  error: null
};

export const useAppStore = create<AppStore>()(
  persist(
    (set: any, get: any) => ({
      ...initialState,

      setLanguage: (language: 'ar' | 'fr') => {
        set({ language });
      },

      setStudentProfile: (profile: StudentProfile) => {
        set({ studentProfile: profile });
      },

      addFavoriteProgram: (program: FavoriteProgram) => {
        const { favoritePrograms } = get();
        const exists = favoritePrograms.find((p: FavoriteProgram) => p.id === program.id);
        if (!exists) {
          set({ favoritePrograms: [...favoritePrograms, program] });
        }
      },

      removeFavoriteProgram: (programId: string) => {
        const { favoritePrograms } = get();
        set({ 
          favoritePrograms: favoritePrograms.filter((p: FavoriteProgram) => p.id !== programId) 
        });
      },

      addRecommendation: (recommendation: Recommendation) => {
        const { recommendations } = get();
        set({ recommendations: [...recommendations, recommendation] });
      },

      clearRecommendations: () => {
        set({ recommendations: [] });
      },

      setUniversityPrograms: (programs: UniversityProgram[]) => {
        set({ universityPrograms: programs });
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      calculateScores: (stream: string, scores: any) => {
        try {
          const fgScore = calculateFG(stream as any, scores);
          const tScore = calculateT(fgScore, scores.MG);
          
          set((state: AppStore) => ({
            studentProfile: {
              ...state.studentProfile,
              bacStream: stream as any,
              scores,
              fgScore,
              tScore
            }
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'خطأ في الحساب' });
        }
      }
    }),
    {
      name: 'tunisian-orientation-storage',
      partialize: (state: AppStore) => ({
        language: state.language,
        studentProfile: state.studentProfile,
        favoritePrograms: state.favoritePrograms
      })
    }
  )
); 