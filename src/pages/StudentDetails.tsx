import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Edit, 
  Trash2, 
  Plus,
  ChevronLeft,
  Download
} from 'lucide-react';

// Mock student data
const mockStudent = {
  id: 1,
  firstName: 'أحمد',
  lastName: 'محمد',
  fullName: 'أحمد محمد',
  grade: 'الأول',
  class: 'أ',
  age: 15,
  birthDate: '2008-05-10',
  gender: 'ذكر',
  address: 'شارع الملك فهد، الرياض',
  parentName: 'محمد أحمد',
  parentPhone: '0501234567',
  parentEmail: 'parent@example.com',
  familyStatus: 'مستقرة',
  medicalConditions: 'لا يوجد',
  notes: 'طالب متفوق في الرياضيات',
  joinDate: '2022-09-01'
};

// Mock tests data
const mockTests = [
  { id: 1, name: 'اختبار الذكاء العاطفي', date: '2023-06-10', status: 'مكتمل', score: 85 },
  { id: 2, name: 'اختبار الميول المهنية', date: '2023-05-15', status: 'مكتمل', score: 92 },
  { id: 3, name: 'اختبار القدرات العقلية', date: '2023-04-20', status: 'مكتمل', score: 78 },
];

const StudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  
  // In a real app, you would fetch the student data based on the ID
  const student = mockStudent;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            onClick={() => navigate('/students')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{student.fullName}</h1>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Link 
            to={`/students/${id}?edit=true`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Edit size={20} />
            <span>تعديل</span>
          </Link>
          <button 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Trash2 size={20} />
            <span>حذف</span>
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'info'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('info')}
            >
              المعلومات الشخصية
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'tests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('tests')}
            >
              الاختبارات
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reports')}
            >
              التقارير
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">المعلومات الأساسية</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">الاسم الكامل</p>
                      <p className="text-sm text-gray-500">{student.fullName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Calendar className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">تاريخ الميلاد</p>
                      <p className="text-sm text-gray-500">{student.birthDate} ({student.age} سنة)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">الجنس</p>
                      <p className="text-sm text-gray-500">{student.gender}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">العنوان</p>
                      <p className="text-sm text-gray-500">{student.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">المستوى الدراسي</p>
                      <p className="text-sm text-gray-500">الصف {student.grade} - الفصل {student.class}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Calendar className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">تاريخ الالتحاق</p>
                      <p className="text-sm text-gray-500">{student.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">معلومات ولي الأمر</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">اسم ولي الأمر</p>
                      <p className="text-sm text-gray-500">{student.parentName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Phone className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">رقم الهاتف</p>
                      <p className="text-sm text-gray-500">{student.parentPhone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">البريد الإلكتروني</p>
                      <p className="text-sm text-gray-500">{student.parentEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">الحالة الاجتماعية للأسرة</p>
                      <p className="text-sm text-gray-500">{student.familyStatus}</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mt-8 mb-4 border-b pb-2">معلومات إضافية</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">الحالة الصحية</p>
                    <p className="text-sm text-gray-500 mt-1">{student.medicalConditions}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-900">ملاحظات</p>
                    <p className="text-sm text-gray-500 mt-1">{student.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'tests' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">الاختبارات</h2>
                <Link 
                  to={`/tests/add?student=${id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <Plus size={20} />
                  <span>إضافة اختبار</span>
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        اسم الاختبار
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        التاريخ
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        النتيجة
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockTests.map((test) => (
                      <tr key={test.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{test.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{test.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            test.status === 'مكتمل' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {test.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{test.score}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3 space-x-reverse">
                            <Link to={`/tests/${test.id}`} className="text-blue-600 hover:text-blue-900">
                              عرض
                            </Link>
                            <Link to={`/reports/generate?test=${test.id}&student=${id}`} className="text-green-600 hover:text-green-900">
                              إنشاء تقرير
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">التقارير</h2>
              
              <div className="space-y-4">
                {mockTests.map((test) => (
                  <div key={test.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{test.name}</h3>
                      <p className="text-sm text-gray-500">تاريخ الاختبار: {test.date}</p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Link 
                        to={`/reports/${test.id}`}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <FileText size={16} />
                        <span>عرض</span>
                      </Link>
                      <button className="text-green-600 hover:text-green-900 flex items-center gap-1">
                        <Download size={16} />
                        <span>تحميل</span>
                      </button>
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

export default StudentDetails;