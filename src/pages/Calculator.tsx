import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import CalculatorForm from '../components/CalculatorForm';
import ScoreDisplay from '../components/ScoreDisplay';
import FormulaDisplay from '../components/FormulaDisplay';
import RecommendationsDisplay from '../components/RecommendationsDisplay';
import { BacStream, SubjectScores } from '../types';
import { calculateFG, calculateT } from '../utils/fgCalculator';
import { getRecommendations, BACStream as BACStreamType, Recommendation } from '../utils/recommendations';

const Calculator: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useAppStore();
  const [results, setResults] = useState<{
    fgScore: number;
    tScore: number;
    stream: BacStream;
    scores: SubjectScores;
  } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [selectedBACStream, setSelectedBACStream] = useState<BACStreamType>('آداب');

  const BAC_STREAMS = [
    { value: 'آداب', label: { ar: 'آداب', fr: 'Arts' } },
    { value: 'رياضيات', label: { ar: 'رياضيات', fr: 'Mathématiques' } },
    { value: 'علوم تقنية', label: { ar: 'علوم تقنية', fr: 'Sciences Techniques' } },
    { value: 'علوم تجريبية', label: { ar: 'علوم تجريبية', fr: 'Sciences Expérimentales' } },
    { value: 'إقتصاد وتصرف', label: { ar: 'إقتصاد وتصرف', fr: 'Économie et Gestion' } },
    { value: 'علوم الإعلامية', label: { ar: 'علوم الإعلامية', fr: 'Sciences Informatiques' } },
    { value: 'رياضة', label: { ar: 'رياضة', fr: 'Sport' } }
  ];

  const loadRecommendations = async (score: number, stream: BACStreamType) => {
    setIsLoadingRecommendations(true);
    try {
      const recs = await getRecommendations(score, stream, 30);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      setRecommendations([]);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleCalculate = (stream: BacStream, scores: SubjectScores) => {
    setIsCalculating(true);
    setErrors([]);

    try {
      const fgScore = calculateFG(stream, scores);
      const tScore = calculateT(fgScore, scores.MG);

      setResults({
        fgScore,
        tScore,
        stream,
        scores
      });

      // Load recommendations after calculation
      loadRecommendations(fgScore, selectedBACStream);
    } catch (error) {
      setErrors([error instanceof Error ? error.message : t('calculator.calculationError')]);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setErrors([]);
    setRecommendations([]);
  };

  const handleBACStreamChange = (stream: BACStreamType) => {
    setSelectedBACStream(stream);
    if (results) {
      loadRecommendations(results.fgScore, stream);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('calculator.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('calculator.subtitle')}
          </p>
        </motion.div>

        {/* BAC Stream Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('calculator.selectStream')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {BAC_STREAMS.map((stream) => (
                <button
                  key={stream.value}
                  onClick={() => handleBACStreamChange(stream.value as BACStreamType)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                    selectedBACStream === stream.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  {stream.label[language as keyof typeof stream.label]}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CalculatorForm
              onCalculate={handleCalculate}
              onReset={handleReset}
              isCalculating={isCalculating}
              errors={errors}
            />
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {results && (
              <>
                <ScoreDisplay
                  stream={results.stream}
                  scores={results.scores}
                  fgScore={results.fgScore}
                  tScore={results.tScore}
                  errors={errors}
                />
                <FormulaDisplay
                  stream={results.stream}
                  fgScore={results.fgScore}
                  tScore={results.tScore}
                />
              </>
            )}

            {!results && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('calculator.startCalculation')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('calculator.enterScores')}
                </p>
              </div>
            )}
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="xl:col-span-1"
          >
            {results && (
              <RecommendationsDisplay
                recommendations={recommendations}
                userScore={results.fgScore}
                bacStream={selectedBACStream}
                loading={isLoadingRecommendations}
              />
            )}

            {!results && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('calculator.recommendations')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('calculator.recommendationsDescription')}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Calculator; 