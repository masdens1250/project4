import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ClipboardList, 
  Clock, 
  Calendar, 
  Users, 
  Edit, 
  Trash2, 
  ChevronLeft,
  Play,
  CheckCircle,
  AlertCircle,
  BarChart2,
  FileText,
  User
} from 'lucide-react';

// Mock test data
const mockTest = {
  id: 1,
  name: 'اختبار الذكاء العاطفي',
  type: 'نفسي',
  description: 'يقيس هذا الاختبار قدرة الطالب على فهم وإدارة العواطف الخاصة به وبالآخرين.',
  questions: 25,
  duration: 30,
  createdAt: '2023-05-10',
  instructions: 'اقرأ كل سؤال بعناية واختر الإجابة التي تعبر عن رأيك بصدق. لا توجد إجابات صحيحة أو خاطئة.',
  stats: {
    totalAssigned: 45,
    completed: 38,
    pending: 7,
    averageScore: 82
  }
};

// Mock students who took the test
const mockStudentTests = [
  { id: 1, student: 'أحمد محمد', date: '2023-06-10', status: 'مكتمل', score: 85 },
  { id: 2, student: 'فاطمة علي', date: '2023-06-08', status: 'مكتمل', score: 92 },
  { id: 3, student: 'عمر خالد', date: '2023-06-05', status: 'مكتمل', score: 78 },
  { id: 4, student: 'نورة سعيد', date: '2023-06-01', status: 'قيد المراجعة', score: null },
];

const TestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  
  // In a real app, you would fetch the test data based on the ID
  const test = mockTest;

  const getStatusColor = (status: string) => {
    return status === 'مكتمل' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            onClick={() => navigate('/tests')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{test.name}</h1>
            <p className="text-gray-600 mt-1">{test.description}</p>
          </div>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Link 
            to={`/tests/${id}/preview`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Play size={20} />
            <span>معاينة الاختبار</span>
          </Link>
          <Link 
            to={`/tests/${id}?edit=true`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Edit size={20} />
            <span>تعديل</span>
          </Link>
          <button 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Trash2 size={20} />
            <span>حذف</span>
          </button>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">إجمالي التلاميذ</p>
              <p className="text-2xl font-bold text-gray-900">{test.stats.totalAssigned}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">الاختبارات المكتملة</p>
              <p className="text-2xl font-bold text-green-600">{test.stats.completed}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">قيد الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600">{test.stats.pending}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">متوسط النتائج</p>
              <p className="text-2xl font-bold text-purple-600">{test.stats.averageScore}%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'info'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('info')}
            >
              معلومات الاختبار
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'students'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
               }`}
              onClick={() => setActiveTab('students')}
            >
              الطلاب
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'questions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('questions')}
            >
              الأسئلة
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b">معلومات الاختبار</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <ClipboardList className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">نوع الاختبار</p>
                      <p className="text-sm text-gray-600">{test.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">مدة الاختبار</p>
                      <p className="text-sm text-gray-600">{test.duration} دقيقة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <ClipboardList className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">عدد الأسئلة</p>
                      <p className="text-sm text-gray-600">{test.questions} سؤال</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Calendar className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">تاريخ الإنشاء</p>
                      <p className="text-sm text-gray-600">{test.createdAt}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b">التعليمات</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">{test.instructions}</p>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">إجراءات سريعة</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Link 
                      to={`/tests/${id}/assign`}
                      className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      <Users size={20} />
                      <span>تعيين للطلاب</span>
                    </Link>
                    <Link 
                      to={`/reports/generate?test=${id}`}
                      className="flex items-center gap-2 p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors"
                    >
                      <FileText size={20} />
                      <span>إنشاء تقرير</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'students' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">الطلاب المشاركون</h2>
                <Link 
                  to={`/tests/${id}/assign`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
                >
                  <Users size={20} />
                  <span>تعيين للطلاب</span>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockStudentTests.map((studentTest) => (
                  <div key={studentTest.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{studentTest.student}</h3>
                          <p className="text-sm text-gray-500">{studentTest.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${ getStatusColor(studentTest.status)}`}>
                        {studentTest.status}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">النتيجة</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {studentTest.score !== null ? `${studentTest.score}%` : '-'}
                        </p>
                      </div>
                      
                      <Link 
                        to={`/reports/generate?test=${id}&student=${studentTest.id}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <FileText size={16} />
                        <span>عرض التقرير</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'questions' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">أسئلة الاختبار</h2>
              
              <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
                    <div className="p-4 bg-gray-50 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">السؤال {index + 1}</h3>
                        <span className="text-sm text-gray-500">5 نقاط</span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-gray-800 mb-4">
                        {index === 0 && 'عندما أواجه موقفًا صعبًا، أستطيع التحكم في مشاعري.'}
                        {index === 1 && 'أستطيع فهم مشاعر الآخرين من خلال تعبيرات وجوههم.'}
                        {index === 2 && 'أجد صعوبة في التعبير عن مشاعري للآخرين.'}
                        {index === 3 && 'عندما أشعر بالغضب، أستطيع تهدئة نفسي بسرعة.'}
                        {index === 4 && 'أستطيع التكيف مع المواقف الجديدة بسهولة.'}
                      </p>
                      
                      <div className="space-y-3">
                        {['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا'].map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center h-5">
                              <input
                                id={`q${index}-option${optionIndex}`}
                                type="radio"
                                name={`question-${index}`}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                              />
                            </div>
                            <label htmlFor={`q${index}-option${optionIndex}`} className="text-gray-700">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDetails;