import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">حول التطبيق</h1>
          <p className="text-gray-600 mb-4">
            مرحباً بك في منصة التوجيه الجامعي التونسي، منصة شاملة لمساعدة الطلاب التونسيين في اختيار مسارهم الجامعي المناسب.
          </p>
          <p className="text-gray-600">
            هذا التطبيق قيد التطوير وسيحتوي على جميع الميزات المطلوبة قريباً.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 