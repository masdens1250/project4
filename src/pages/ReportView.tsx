import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, Printer } from 'lucide-react';

// Mock report data
const mockReport = {
  id: 1,
  student: {
    name: 'أحمد محمد',
    grade: 'الأول',
    class: 'أ',
    age: 15,
  },
  test: {
    name: 'اختبار الذكاء العاطفي',
    date: '2023-06-15',
  },
  results: {
    overallScore: 85,
    categories: [
      { name: 'الوعي الذاتي', score: 90 },
      { name: 'إدارة العواطف', score: 75 },
      { name: 'الدافعية', score: 85 },
      { name: 'التعاطف', score: 88 },
      { name: 'المهارات الاجتماعية', score: 87 },
    ],
    strengths: [
      'القدرة على فهم المشاعر الذاتية',
      'التعاطف مع الآخرين',
      'المهارات الاجتماعية الجيدة',
    ],
    weaknesses: [
      'صعوبة في إدارة الغضب',
      'الحاجة إلى تحسين مهارات التحفيز الذاتي',
    ],
    recommendations: [
      'المشاركة في أنشطة جماعية لتعزيز المهارات الاجتماعية',
      'تدريبات على إدارة الغضب والتوتر',
      'تشجيع الطالب على التعبير عن مشاعره بشكل منتظم',
      'تعزيز الثقة بالنفس من خلال تكليفه بمهام قيادية بسيطة',
    ],
  },
  counselor: 'د. محمد عبدالله',
  date: '2023-06-20',
  school: {
    name: 'متوسطة جلول ناصر',
    header: 'الجمهورية الجزائرية الديمقراطية الشعبية\nوزارة التعليم الوطنية\nمتوسطة جلول ناصر',
  }
};

const ReportView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const reportRef = useRef<HTMLDivElement>(null);
  const [schoolSettings, setSchoolSettings] = useState({
    header: 'الجمهورية الجزائرية الديمقراطية الشعبية\nوزارة التعليم الوطنية\nمتوسطة جلول ناصر',
    footer: 'جميع الحقوق محفوظة © 2023',
    websiteUrl: 'https://netscolaire-dz.netlify.app',
  });
  
  // Load saved settings from localStorage when component mounts
  useEffect(() => {
    const savedSettings = localStorage.getItem('schoolSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSchoolSettings({
          header: parsedSettings.reportHeader || schoolSettings.header,
          footer: parsedSettings.reportFooter || schoolSettings.footer,
          websiteUrl: parsedSettings.websiteUrl || schoolSettings.websiteUrl,
        });
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);
  
  // In a real app, you would fetch the report data based on the ID
  const report = mockReport;
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF using jsPDF or similar
    alert('جاري تحميل التقرير...');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            onClick={() => navigate('/reports')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">تقرير {report.test.name}</h1>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <button 
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <Printer size={20} />
            <span>طباعة</span>
          </button>
          <button 
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <Download size={20} />
            <span>تحميل PDF</span>
          </button>
        </div>
      </div>
      
      {/* Report Preview */}
      <div className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition-shadow" ref={reportRef}>
        <div className="report-container">
          {/* Report Header */}
          <div className="text-center mb-8">
            {schoolSettings.header.split('\n').map((line, index) => (
              <h1 key={index} className={`${index === 0 ? 'text-2xl' : index === 1 ? 'text-xl' : 'text-lg'} font-bold ${index !== 0 ? 'mb-2' : 'mb-1'}`}>
                {line}
              </h1>
            ))}
            <div className="border-t border-b border-gray-300 my-4 py-4">
              <h2 className="text-2xl font-bold mb-2">تقرير نتائج الاختبار النفسي</h2>
              <h3 className="text-xl">{report.test.name}</h3>
            </div>
          </div>
          
          {/* Student Information */}
          <div className="mb-8">
            <h3 className="text-lg font-bold border-b pb-2 mb-4">معلومات الطالب</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">اسم الطالب:</p>
                <p>{report.student.name}</p>
              </div>
              <div>
                <p className="font-medium">الصف:</p>
                <p>الصف {report.student.grade} - الفصل {report.student.class}</p>
              </div>
              <div>
                <p className="font-medium">العمر:</p>
                <p>{report.student.age} سنة</p>
              </div>
              <div>
                <p className="font-medium">تاريخ الاختبار:</p>
                <p>{report.test.date}</p>
              </div>
            </div>
          </div>
          
          {/* Test Results */}
          <div className="mb-8">
            <h3 className="text-lg font-bold border-b pb-2 mb-4">نتائج الاختبار</h3>
            
            <div className="mb-6">
              <p className="font-medium mb-2">الدرجة الكلية:</p>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div 
                  className="bg-blue-600 h-6 rounded-full text-center text-white text-sm leading-6"
                  style={{ width: `${report.results.overallScore}%` }}
                >
                  {report.results.overallScore}%
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="font-medium mb-2">النتائج حسب الفئات:</p>
              <div className="space-y-2">
                {report.results.categories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{category.name}</span>
                      <span>{category.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${category.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Analysis */}
          <div className="mb-8">
            <h3 className="text-lg font-bold border-b pb-2 mb-4">التحليل والتوصيات</h3>
            
            <div className="mb-4">
              <p className="font-medium mb-2">نقاط القوة:</p>
              <ul className="list-disc list-inside space-y-1">
                {report.results.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-4">
              <p className="font-medium mb-2">نقاط تحتاج إلى تحسين:</p>
              <ul className="list-disc list-inside space-y-1">
                {report.results.weaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <p className="font-medium mb-2">التوصيات:</p>
              <ul className="list-disc list-inside space-y-1">
                {report.results.recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Signatures */}
          <div className="mt-12">
            <div className="flex justify-between">
              <div className="w-1/3 text-center">
                <p className="font-medium">مستشار(ة) التوجيه</p>
                <p className="mt-8 pt-2 border-t border-gray-400">{report.counselor}</p>
              </div>
              
              <div className="w-1/3 text-center">
                <p className="font-medium">مدير المدرسة</p>
                <p className="mt-8 pt-2 border-t border-gray-400">................................</p>
              </div>
              
              <div className="w-1/3 text-center">
                <p className="font-medium">ولي أمر الطالب</p>
                <p className="mt-8 pt-2 border-t border-gray-400">................................</p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>تم إصدار هذا التقرير بتاريخ: {report.date}</p>
            <p className="mt-2">{schoolSettings.footer}</p>
            <p className="mt-2">
              <a href={schoolSettings.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {schoolSettings.websiteUrl.replace('https://', '')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;