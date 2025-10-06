import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  AcademicCapIcon,
  ExclamationTriangleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { BacStream, SubjectScores } from '../types';

interface ScoreDisplayProps {
  stream: BacStream;
  scores: SubjectScores;
  fgScore: number;
  tScore: number;
  errors: string[];
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ 
  stream, 
  scores, 
  fgScore, 
  tScore, 
  errors 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 15) return 'text-green-600';
    if (score >= 12) return 'text-yellow-600';
    if (score >= 10) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 15) return <AcademicCapIcon className="w-5 h-5 text-green-600" />;
    if (score >= 12) return <ChartBarIcon className="w-5 h-5 text-yellow-600" />;
    if (score >= 10) return <ExclamationTriangleIcon className="w-5 h-5 text-orange-600" />;
    return <XCircleIcon className="w-5 h-5 text-red-600" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
    >
      <div className="flex items-center mb-6">
        <ChartBarIcon className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">نتائج الحساب</h3>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center">
            <XCircleIcon className="w-5 h-5 text-red-600 mr-2" />
            <h4 className="text-red-800 font-medium">أخطاء في الإدخال:</h4>
          </div>
          <ul className="mt-2 text-red-700 text-sm">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FG Score */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-blue-900">الصيغة الإجمالية (FG)</h4>
            {getScoreIcon(fgScore)}
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(fgScore)}`}>
            {fgScore.toFixed(3)}
          </div>
          <p className="text-sm text-blue-700 mt-1">
            شعبة: {stream}
          </p>
        </div>

        {/* T Score */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-green-900">مجموع النقاط (T)</h4>
            {getScoreIcon(tScore)}
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(tScore)}`}>
            {tScore.toFixed(3)}
          </div>
          <p className="text-sm text-green-700 mt-1">
            مع الميزات الإضافية
          </p>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">تفصيل الدرجات</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(scores).map(([subject, score]) => (
            <div key={subject} className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm font-medium text-gray-700">{subject}</div>
              <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                {score.toFixed(3)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Information */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h4 className="font-medium text-blue-900 mb-2">معلومات مهمة:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• الصيغة الإجمالية (FG) هي الأساس في ترتيب المترشحين</li>
          <li>• مجموع النقاط (T) = FG × 0.5 + (المعدل النهائي × 0.5)</li>
          <li>• النتائج تُقرب إلى 3 أرقام عشرية</li>
          <li>• هذه الصيغة رسمية ومتطابقة مع وزارة التعليم العالي</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ScoreDisplay; 