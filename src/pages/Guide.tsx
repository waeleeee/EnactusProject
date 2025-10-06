import React from 'react';

const Guide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">دليل التوجيه</h1>
          <p className="text-gray-600 mb-4">
            صفحة دليل التوجيه الجامعي - قيد التطوير
          </p>
          <p className="text-gray-600">
            ستتضمن هذه الصفحة نصائح وإرشادات للطلاب حول اختيار المسار الجامعي المناسب.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guide; 