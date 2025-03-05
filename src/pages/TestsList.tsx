import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, ChevronDown, Edit, Trash2, Eye, Clock, Calendar, ClipboardList, Play, Users, User } from 'lucide-react';

// Mock data for tests
const mockTests = [
  { 
    id: 1, 
    name: 'اختبار الذكاء العاطفي', 
    type: 'نفسي', 
    questions: 25, 
    duration: 30, 
    createdAt: '2023-05-10', 
    description: 'يقيس هذا الاختبار قدرة الطالب على فهم وإدارة العواطف'
  },
  { 
    id: 2, 
    name: 'اختبار الميول المهنية', 
    type: 'مهني', 
    questions: 25, 
    duration: 45, 
    createdAt: '2023-05-05', 
    description: 'يساعد في تحديد التوجهات المهنية المناسبة للطالب'
  },
  { 
    id: 3, 
    name: 'اختبار القدرات العقلية', 
    type: 'معرفي', 
    questions: 25, 
    duration: 40, 
    createdAt: '2023-04-28', 
    description: 'يقيس القدرات العقلية والمعرفية للطالب'
  },
  { 
    id: 4, 
    name: 'اختبار التفكير الابداعي', 
    type: 'معرفي', 
    questions: 25, 
    duration: 35, 
    createdAt: '2023-06-15', 
    description: 'يقيس القدرة على التفكير الإبداعي والابتكار'
  },
  { 
    id: 5, 
    name: 'اختبار المهارات الاجتماعية', 
    type: 'اجتماعي', 
    questions: 25, 
    duration: 30, 
    createdAt: '2023-06-20', 
    description: 'يقيم المهارات الاجتماعية والتواصل مع الآخرين'
  },
  { 
    id: 6, 
    name: 'اختبار الشخصية', 
    type: 'نفسي', 
    questions: 25, 
    duration: 40, 
    createdAt: '2023-06-25', 
    description: 'يحلل السمات الشخصية والطباع العامة للفرد'
  }
];

// Mock data for students
const mockStudents = [
  { id: 1, name: 'أحمد محمد', grade: 'السنة 1 متوسط', group: '1' },
  { id: 2, name: 'فاطمة علي', grade: 'السنة 2 متوسط', group: '2' },
  { id: 3, name: 'عمر خالد', grade: 'السنة 3 متوسط', group: '1' },
  { id: 4, name: 'نورة سعيد', grade: 'السنة 4 متوسط', group: '3' },
];

const TestsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [testMode, setTestMode] = useState<'individual' | 'group'>('individual');

  // Filter students based on grade and group
  const filteredStudents = mockStudents.filter(student => {
    return (!selectedGrade || student.grade === selectedGrade) &&
           (!selectedGroup || student.group === selectedGroup);
  });

  // Filter tests based on search term and filters
  const filteredTests = mockTests.filter(test => {
    return (
      test.name.includes(searchTerm) &&
      (filterType === '' || test.type === filterType)
    );
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'نفسي':
        return 'bg-purple-100 text-purple-800';
      case 'مهني':
        return 'bg-blue-100 text-blue-800';
      case 'معرفي':
        return 'bg-green-100 text-green-800';
      case 'اجتماعي':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartTest = (testId: number) => {
    if (testMode === 'individual' && !selectedStudent) {
      alert('الرجاء اختيار طالب أولاً');
      return;
    }
    if (testMode === 'group' && (!selectedGrade || !selectedGroup)) {
      alert('الرجاء اختيار المستوى والفوج أولاً');
      return;
    }
    
    const params = testMode === 'individual' 
      ? `?student=${selectedStudent}&mode=individual`
      : `?grade=${selectedGrade}&group=${selectedGroup}&mode=group`;
    
    navigate(`/tests/${testId}/take${params}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">قائمة الاختبارات</h1>
          <p className="text-gray-600">إدارة وتنظيم الاختبارات النفسية والتربوية</p>
        </div>
        <Link 
          to="/tests/add" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          <span>إضافة اختبار جديد</span>
        </Link>
      </div>
      
      {/* Test Mode Selection */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">نوع الاختبار</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setTestMode('individual')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              testMode === 'individual'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <User size={20} />
            <span>اختبار فردي</span>
          </button>
          <button
            onClick={() => setTestMode('group')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              testMode === 'group'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Users size={20} />
            <span>اختبار جماعي (فوج)</span>
          </button>
        </div>
      </div>
      
      {/* Student/Group Selection */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {testMode === 'individual' ? 'اختيار الطالب' : 'اختيار الفوج'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">المستوى</label>
            <select
              className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="">جميع المستويات</option>
              <option value="السنة 1 متوسط">السنة 1 متوسط</option>
              <option value="السنة 2 متوسط">السنة 2 متوسط</option>
              <option value="السنة 3 متوسط">السنة 3 متوسط</option>
              <option value="السنة 4 متوسط">السنة 4 متوسط</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الفوج</label>
            <select
              className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="">جميع الأفواج</option>
              <option value="1">الفوج 1</option>
              <option value="2">الفوج 2</option>
              <option value="3">الفوج 3</option>
            </select>
          </div>
          
          {testMode === 'individual' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الطالب</label>
              <select
                className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={selectedStudent || ''}
                onChange={(e) => setSelectedStudent(Number(e.target.value))}
              >
                <option value="">اختر الطالب</option>
                {filteredStudents.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.grade} - الفوج {student.group}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pr-10 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="البحث عن اختبار..."
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
              className="block w-full pr-10 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">جميع الأنواع</option>
              <option value="نفسي">نفسي</option>
              <option value="مهني">مهني</option>
              <option value="معرفي">معرفي</option>
              <option value="اجتماعي">اجتماعي</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Tests Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <div key={test.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{test.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(test.type)}`}>
                  {test.type}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{test.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <ClipboardList size={18} />
                  <span>{test.questions} سؤال</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={18} />
                  <span>{test.duration} دقيقة</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={16} />
                  <span className="text-sm">{test.createdAt}</span>
                </div>
                
                <div className="flex space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleStartTest(test.id)}
                    className={`text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-full transition-colors ${
                      (testMode === 'individual' && !selectedStudent) || 
                      (testMode === 'group' && (!selectedGrade || !selectedGroup))
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    disabled={
                      (testMode === 'individual' && !selectedStudent) || 
                      (testMode === 'group' && (!selectedGrade || !selectedGroup))
                    }
                    title={
                      testMode === 'individual' && !selectedStudent
                        ? 'الرجاء اختيار طالب أولاً'
                        : testMode === 'group' && (!selectedGrade || !selectedGroup)
                        ? 'الرجاء اختيار المستوى والفوج أولاً'
                        : 'بدء الاختبار'
                    }
                  >
                    <Play size={18} />
                  </button>
                  <Link 
                    to={`/tests/${test.id}`}
                    className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Eye size={18} />
                  </Link>
                  <Link 
                    to={`/tests/${test.id}?edit=true`}
                    className="text-yellow-600 hover:text-yellow-800 p-2 hover:bg-yellow-50 rounded-full transition-colors"
                  >
                    <Edit size={18} />
                  </Link>
                  <button 
                    className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestsList;