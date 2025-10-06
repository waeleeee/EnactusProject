import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ت</span>
              </div>
              <span className="text-xl font-bold">التوجيه الجامعي التونسي</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              منصة شاملة لمساعدة الطلاب التونسيين في اختيار مسارهم الجامعي المناسب. 
              نحن نقدم أدوات حسابية متقدمة، قاعدة بيانات شاملة للبرامج الجامعية، 
              ونصائح مهنية لضمان مستقبل أكاديمي ناجح.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors text-sm">
                  حاسبة النقاط
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-300 hover:text-white transition-colors text-sm">
                  استكشف البرامج
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-gray-300 hover:text-white transition-colors text-sm">
                  دليل التوجيه
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-300 hover:text-white transition-colors text-sm">
                  تقويم التوجيه
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-sm">
                  سياسة الخصوصية
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-sm">
                  شروط الاستخدام
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-sm">
                  المساعدة
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 التوجيه الجامعي التونسي. جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-6 rtl:space-x-reverse">
            <button className="text-gray-400 hover:text-gray-300 transition-colors">
              سياسة الخصوصية
            </button>
            <button className="text-gray-400 hover:text-gray-300 transition-colors">
              شروط الاستخدام
            </button>
            <button className="text-gray-400 hover:text-gray-300 transition-colors">
              المساعدة
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 