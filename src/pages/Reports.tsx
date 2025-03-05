import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown, FileText, Download, Eye, Upload } from 'lucide-react';

// Mock data for reports
const mockReports = [
  { id: 1, student: 'أحمد محمد', test: 'اختبار الذكاء العاطفي', date: '2023-06-15', type: 'فردي' },
  { id: 2, student: 'فاطمة علي', test: 'اختبار الميول المهنية', date: '2023-06-14', type: 'فردي' },
  { id: 3, student: 'عمر خالد', test: 'اختبار القدرات العقلية', date: '2023-06-13', type: 'فردي' },
  { id: 4, student: 'الصف الأول - أ', test: 'اختبار الذكاء العاطفي', date: '2023-06-10', type: 'جماعي' },
  { id: 5, student: 'الصف الثاني - ب', test: 'اختبار الميول المهنية', date: '2023-06-05', type: 'جماعي' },
  { id: 6, student: 'نورة سعيد', test: 'اختبار الشخصية', date: '2023-06-01', type: 'فردي' },
  { id: 7, student: 'الإعلام والإرشاد - السنة 5 ابتدائي', test: 'تقرير الإعلام والإرشاد', date: '2023-07-01', type: 'جماعي' },
  { id: 8, student: 'الإعلام والإرشاد - السنة 1 متوسط', test: 'تقرير الإعلام والإرشاد', date: '2023-07-02', type: 'جماعي' },
];

const Reports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterTest, setFilterTest] = useState('');
  
  // Filter reports based on search term and filters
  const filteredReports = mockReports.filter(report => {
    return (
      (report.student.includes(searchTerm) || report.test.includes(searchTerm)) &&
      (filterType === '' || report.type === filterType) &&
      (filterTest === '' || report.test === filterTest)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">التقارير</h1>
        <div className="flex space-x-2 space-x-reverse">
          <Link 
            to="/reports/generate" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FileText size={20} />
            <span>إنشاء تقرير جديد</span>
          </Link>
          <Link 
            to="/reports/guidance" 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Upload size={20} />
            <span>تقارير الإعلام والإرشاد</span>
          </Link>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pr-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="البحث عن تقرير..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pr-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">جميع الأنواع</option>
              <option value="فردي">فردي</option>
              <option value="جماعي">جماعي</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pr-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={filterTest}
              onChange={(e) => setFilterTest(e.target.value)}
            >
              <option value="">جميع الاختبارات</option>
              <option value="اختبار الذكاء العاطفي">اختبار الذكاء العاطفي</option>
              <option value="اختبار الميول المهنية">اختبار الميول المهنية</option>
              <option value="اختبار القدرات العقلية">اختبار القدرات العقلية</option>
              <option value="اختبار الشخصية">اختبار الشخصية</option>
              <option value="تقرير الإعلام والإرشاد">تقرير الإعلام والإرشاد</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الطالب / المجموعة
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الاختبار
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  النوع
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.student}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.test}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.type === 'فردي' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3 space-x-reverse">
                      <Link to={`/reports/${report.id}`} className="text-blue-600 hover:text-blue-900">
                        <Eye size={18} />
                      </Link>
                      <button className="text-green-600 hover:text-green-900">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              السابق
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              التالي
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                عرض <span className="font-medium">1</span> إلى <span className="font-medium">8</span> من <span className="font-medium">8</span> تقرير
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  السابق
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  التالي
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;