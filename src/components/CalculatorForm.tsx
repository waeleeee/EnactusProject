import React, { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  AcademicCapIcon,
  CalculatorIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { BacStream, SubjectScores } from '../types';
import { validateSubjectScores } from '../utils/fgCalculator';

interface CalculatorFormProps {
  onCalculate: (stream: BacStream, scores: SubjectScores) => void;
  onReset: () => void;
  isCalculating: boolean;
  errors: string[];
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onCalculate,
  onReset,
  isCalculating,
  errors
}) => {
  const { t } = useTranslation();
  const [selectedStream, setSelectedStream] = useState<BacStream | ''>('');

  // Get required subjects for the selected stream
  const getRequiredSubjects = (stream: BacStream): (keyof SubjectScores)[] => {
    const baseSubjects: (keyof SubjectScores)[] = ['MG', 'F', 'Ang'];
    
    switch (stream) {
      case 'آداب':
        return [...baseSubjects, 'A', 'PH', 'HG'];
      case 'رياضيات':
        return [...baseSubjects, 'M', 'SP', 'SVT'];
      case 'علوم تجريبية':
        return [...baseSubjects, 'M', 'SP', 'SVT'];
      case 'علوم تقنية':
        return [...baseSubjects, 'TE', 'M', 'SP'];
      case 'إقتصاد وتصرف':
        return [...baseSubjects, 'Ec', 'Ge', 'M', 'HG'];
      case 'علوم الإعلامية':
        return [...baseSubjects, 'M', 'Algo', 'SP', 'STI'];
      case 'رياضة':
        return [...baseSubjects, 'SB', 'Sp-sport', 'EP', 'SP', 'PH'];
      default:
        return baseSubjects;
    }
  };

  // Create validation schema dynamically
  const createValidationSchema = useCallback((stream: BacStream) => {
    const requiredSubjects = getRequiredSubjects(stream);
    const schema: any = {};
    
    requiredSubjects.forEach(subject => {
      schema[subject] = Yup.number()
        .required(t('calculator.required'))
        .min(0, t('calculator.invalidScore'))
        .max(20, t('calculator.invalidScore'))
        .typeError(t('calculator.invalidScore'));
    });
    
    return Yup.object().shape(schema);
  }, [t]);

  const validationSchema = selectedStream ? createValidationSchema(selectedStream as BacStream) : Yup.object();

  const formik = useFormik({
    initialValues: {
      bacStream: '',
      MG: '',
      A: '',
      PH: '',
      HG: '',
      F: '',
      Ang: '',
      M: '',
      SP: '',
      SVT: '',
      Algo: '',
      STI: '',
      Ec: '',
      Ge: '',
      IT: '',
      All: '',
      ESP: '',
      'Sp-sport': '',
      TE: '',
      SB: '',
      EP: '',
    },
    validationSchema,
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: any) => {
      if (!selectedStream) return;
      
      // Convert string values to numbers and filter out empty values
      const scores: SubjectScores = {
        MG: 0,
        F: 0,
        Ang: 0
      };
      Object.keys(values).forEach(key => {
        if (key !== 'bacStream' && values[key as keyof typeof values] !== '') {
          scores[key as keyof SubjectScores] = parseFloat(values[key as keyof typeof values]);
        }
      });
      
      // Validate required subjects
      const validationErrors = validateSubjectScores(selectedStream as BacStream, scores);
      if (validationErrors.length > 0) {
        formik.setErrors({ bacStream: validationErrors.join(', ') });
        return;
      }
      
      onCalculate(selectedStream as BacStream, scores);
    },
  });

  // Update validation schema when stream changes
  useEffect(() => {
    if (selectedStream) {
      formik.setFieldValue('bacStream', selectedStream);
    }
  }, [selectedStream]);

  const handleStreamChange = (stream: BacStream) => {
    setSelectedStream(stream);
    // Reset form values when stream changes
    formik.resetForm();
    formik.setFieldValue('bacStream', stream);
  };

  const handleReset = () => {
    setSelectedStream('');
    formik.resetForm();
    onReset();
  };

  const renderSubjectField = (subject: keyof SubjectScores, label: string) => {
    const isRequired = selectedStream && getRequiredSubjects(selectedStream as BacStream).includes(subject);
    
    return (
      <div key={subject} className="col-span-1">
        <label htmlFor={subject} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {isRequired && <span className="text-red-500 mr-1">*</span>}
        </label>
        <input
          id={subject}
          name={subject}
          type="number"
          step="0.001"
          min="0"
          max="20"
          placeholder="0.000"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            formik.touched[subject] && formik.errors[subject] 
              ? 'border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20' 
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[subject]}
          disabled={!selectedStream || !isRequired}
        />
        {formik.touched[subject] && formik.errors[subject] && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {typeof formik.errors[subject] === 'string' ? formik.errors[subject] : ''}
          </p>
        )}
      </div>
    );
  };

  // Check if form is valid manually
  const isFormValid = () => {
    if (!selectedStream) return false;
    
    const requiredSubjects = getRequiredSubjects(selectedStream as BacStream);
    const hasAllRequiredFields = requiredSubjects.every(subject => {
      const value = formik.values[subject];
      return value !== '' && value !== null && value !== undefined;
    });
    
    const hasValidScores = requiredSubjects.every(subject => {
      const value = formik.values[subject];
      const numValue = parseFloat(value);
      return !isNaN(numValue) && numValue >= 0 && numValue <= 20;
    });
    
    return hasAllRequiredFields && hasValidScores && Object.keys(formik.errors).length === 0;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Bac Stream Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('calculator.selectStream')} <span className="text-red-500">*</span>
          </label>
          <select
            name="bacStream"
            value={selectedStream}
            onChange={(e) => handleStreamChange(e.target.value as BacStream)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">{t('calculator.selectStream')}</option>
            <option value="آداب">آداب</option>
            <option value="رياضيات">رياضيات</option>
            <option value="علوم تقنية">علوم تقنية</option>
            <option value="علوم تجريبية">علوم تجريبية</option>
            <option value="إقتصاد وتصرف">إقتصاد وتصرف</option>
            <option value="علوم الإعلامية">علوم الإعلامية</option>
            <option value="رياضة">رياضة</option>
          </select>
        </div>

        {/* Subject Scores */}
        {selectedStream && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <AcademicCapIcon className="w-5 h-5 mr-2" />
              {t('calculator.subjects')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderSubjectField('MG', 'MG')}
              {renderSubjectField('F', 'F')}
              {renderSubjectField('Ang', 'Ang')}
              
              {/* Stream-specific subjects */}
              {selectedStream === 'آداب' && (
                <>
                  {renderSubjectField('A', 'A')}
                  {renderSubjectField('PH', 'PH')}
                  {renderSubjectField('HG', 'HG')}
                </>
              )}
              
              {(selectedStream === 'رياضيات' || selectedStream === 'علوم تجريبية') && (
                <>
                  {renderSubjectField('M', 'M')}
                  {renderSubjectField('SP', 'SP')}
                  {renderSubjectField('SVT', 'SVT')}
                </>
              )}
              
              {selectedStream === 'علوم تقنية' && (
                <>
                  {renderSubjectField('M', 'M')}
                  {renderSubjectField('Algo', 'Algo')}
                  {renderSubjectField('SP', 'SP')}
                  {renderSubjectField('STI', 'STI')}
                </>
              )}
              
              {selectedStream === 'إقتصاد وتصرف' && (
                <>
                  {renderSubjectField('Ec', 'Ec')}
                  {renderSubjectField('Ge', 'Ge')}
                </>
              )}
              
              {selectedStream === 'علوم الإعلامية' && (
                <>
                  {renderSubjectField('M', 'M')}
                  {renderSubjectField('Algo', 'Algo')}
                </>
              )}
              
              {selectedStream === 'رياضة' && (
                <>
                  {renderSubjectField('Sp-sport', 'Sp-sport')}
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={!selectedStream || isCalculating || !isFormValid()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <CalculatorIcon className="w-4 h-4 mr-2" />
            {isCalculating ? t('calculator.calculating') : t('calculator.calculate')}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            {t('calculator.reset')}
          </button>
        </div>

        {/* Debug Information */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-xs">
            <p><strong>Debug Info:</strong></p>
            <p>Selected Stream: {selectedStream || 'None'}</p>
            <p>Form Valid: {isFormValid() ? 'Yes' : 'No'}</p>
            <p>Is Calculating: {isCalculating ? 'Yes' : 'No'}</p>
            <p>Form Errors: {Object.keys(formik.errors).length}</p>
            <p>Required Subjects: {selectedStream ? getRequiredSubjects(selectedStream as BacStream).join(', ') : 'None'}</p>
          </div>
        )}

        {/* Form-level errors */}
        {formik.errors.bacStream && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">
              {typeof formik.errors.bacStream === 'string' ? formik.errors.bacStream : ''}
            </p>
          </div>
        )}

        {/* External errors */}
        {errors.length > 0 && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default CalculatorForm; 