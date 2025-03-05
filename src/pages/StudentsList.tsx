import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter, ChevronDown, Edit, Trash2, Eye, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';

// Mock data for students - reduced to one example
const mockStudents = [
  { id: 1, name: 'أحمد محمد', grade: 'الأول', class: 'أ', age: 15, lastTest: '2023-06-10' }
];

interface Student {
  id: number;
  name: string;
  grade: string;
  class: string;
  age: number;
  lastTest: string;
}

const StudentsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Filter students based on search term and filters
  const filteredStudents = students.filter(student => {
    return (
      student.name.includes(searchTerm) &&
      (filterGrade === '' || student.grade === filterGrade) &&
      (filterClass === '' || student.class === filterClass)
    );
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Supposons que la première feuille contient les données
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convertir les données en JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Traiter les données et mettre à jour la liste des étudiants
        processExcelData(jsonData);
        
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      } catch (error) {
        console.error('Erreur lors du traitement du fichier Excel:', error);
        alert('حدث خطأ أثناء معالجة الملف. يرجى التحقق من تنسيق الملف والمحاولة مرة أخرى.');
      } finally {
        setIsUploading(false);
      }
    };
    
    reader.readAsArrayBuffer(file);
  };

  const processExcelData = (data: any[]) => {
    // Convertir les données Excel en format d'étudiant
    const newStudents: Student[] = data.map((row, index) => {
      return {
        id: mockStudents.length + index + 1,
        name: row.Name || `طالب ${index + 1}`,
        grade: row.Grade || 'الأول',
        class: row.Class || 'أ',
        age: row.Age || 15,
        lastTest: row.LastTest || '2023-01-01'
      };
    });
    
    // Mettre à jour la liste des étudiants
    setStudents(prev => [...prev, ...newStudents]);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">قائمة الطلاب</h1>
        <div className="flex space-x-2 space-x-reverse">
          <Link 
            to="/students/add" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus size={20} />
            <span>إضافة طالب</span>
          </Link>
          <button
            onClick={triggerFileInput}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            disabled={isUploading}
          >
            <Upload size={20} />
            <span>{isUploading ? 'جاري التحميل...' : 'استيراد من Excel'}</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".xlsx,.xls" 
            onChange={handleFileUpload}
          />
        </div>
      </div>
      
      {uploadSuccess && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md">
          تم استيراد بيانات الطلاب بنجاح
        </div>
      )}
      
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
                placeholder="البحث عن طالب..."
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
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
            >
              <option value="">جميع المستويات</option>
              <option value="الأول">الصف الأول</option>
              <option value="الثاني">الصف الثاني</option>
              <option value="الثالث">الصف الثالث</option>
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
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="">جميع الفصول</option>
              <option value="أ">الفصل أ</option>
              <option value="ب">الفصل ب</option>
              <option value="ج">الفصل ج</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الاسم
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المستوى
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الفصل
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العمر
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  آخر اختبار
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">الصف {student.grade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">الفصل {student.class}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.lastTest}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3 space-x-reverse">
                      <Link to={`/students/${student.id}`} className="text-blue-600 hover:text-blue-900">
                        <Eye size={18} />
                      </Link>
                      <Link to={`/students/${student.id}?edit=true`} className="text-yellow-600 hover:text-yellow-900">
                        <Edit size={18} />
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
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
                عرض <span className="font-medium">1</span> إلى <span className="font-medium">{filteredStudents.length}</span> من <span className="font-medium">{students.length}</span> طالب
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

export default StudentsList;