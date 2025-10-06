import React from 'react';
import { motion } from 'framer-motion';
import { 
  BeakerIcon, 
  InformationCircleIcon 
} from '@heroicons/react/24/outline';
import { BacStream, FGFormula } from '../types';

interface FormulaDisplayProps {
  stream: BacStream;
  fgScore: number;
  tScore: number;
}

const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ stream, fgScore, tScore }) => {
  const formulas: Record<BacStream, FGFormula> = {
    'آداب': {
      stream: 'آداب',
      formula: 'FG = (MG × 2) + (A × 1) + (PH × 1) + (HG × 1) + (F × 1) + (Ang × 1)',
      description: 'المعدل النهائي × 2 + العربية + الفلسفة + التاريخ والجغرافيا + الفرنسية + الإنجليزية'
    },
    'رياضيات': {
      stream: 'رياضيات',
      formula: 'FG = (MG × 2) + (M × 1.5) + (SP × 1) + (SVT × 0.5) + (F × 1) + (Ang × 1)',
      description: 'المعدل النهائي × 2 + الرياضيات × 1.5 + العلوم الفيزيائية + علوم الحياة والأرض × 0.5 + الفرنسية + الإنجليزية'
    },
    'علوم تقنية': {
      stream: 'علوم تقنية',
      formula: 'FG = (MG × 2) + (M × 1) + (Algo × 1) + (SP × 1) + (STI × 1) + (F × 1) + (Ang × 1)',
      description: 'المعدل النهائي × 2 + الرياضيات + الخوارزميات والبرمجة + العلوم الفيزيائية + أنظمة وتكنولوجيات المعلوماتية + الفرنسية + الإنجليزية'
    },
    'علوم تجريبية': {
      stream: 'علوم تجريبية',
      formula: 'FG = (MG × 2) + (M × 1) + (SP × 1) + (SVT × 1) + (F × 1) + (Ang × 1)',
      description: 'المعدل النهائي × 2 + الرياضيات + العلوم الفيزيائية + علوم الحياة والأرض + الفرنسية + الإنجليزية'
    },
    'إقتصاد وتصرف': {
      stream: 'إقتصاد وتصرف',
      formula: 'FG = (MG × 2) + (Ec × 1) + (Ge × 1) + (F × 1) + (Ang × 1)',
      description: 'المعدل النهائي × 2 + الاقتصاد + التصرف + الفرنسية + الإنجليزية'
    },
    'علوم الإعلامية': {
      stream: 'علوم الإعلامية',
      formula: 'FG = (MG × 2) + (M × 1) + (Algo × 1) + (F × 1) + (Ang × 1)',
      description: 'المعدل النهائي × 2 + الرياضيات + الخوارزميات والبرمجة + الفرنسية + الإنجليزية'
    },
    'رياضة': {
      stream: 'رياضة',
      formula: 'FG = (MG × 2) + (Sp-sport × 1) + (F × 1) + (Ang × 1)',
      description: 'المعدل النهائي × 2 + الرياضة + الفرنسية + الإنجليزية'
    }
  };

  const currentFormula = formulas[stream];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
    >
      <div className="flex items-center mb-4">
        <BeakerIcon className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">الصيغة المستخدمة</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">صيغة FG:</h4>
          <div className="bg-gray-50 p-3 rounded-md font-mono text-sm text-gray-800">
            {currentFormula.formula}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">الوصف:</h4>
          <p className="text-gray-600 text-sm">
            {currentFormula.description}
          </p>
        </div>
        
        <div className="flex items-center p-3 bg-blue-50 rounded-md">
          <InformationCircleIcon className="w-5 h-5 text-blue-600 mr-2" />
          <p className="text-sm text-blue-800">
            <strong>ملاحظة:</strong> صيغة T = FG × 0.5 + (MG × 0.5)
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FormulaDisplay; 