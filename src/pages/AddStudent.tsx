import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';

const AddStudent: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    grade: '',
    class: '',
    age: '',
    birthDate: '',
    gender: '',
    address: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    familyStatus: '',
    medicalConditions: '',
    notes: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Redirect to students list after submission
    navigate('/students');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">إضافة طالب جديد</h1>
        <div className="flex space-x-2 space-x-reverse">
          <button
            onClick={() => navigate('/students')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <X size={20} />
            <span>إلغاء</span>
          </button>
          <button
            form="add-student-form"
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Save size={20} />
            <span>حفظ</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form id="add-student-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-lg font-medium text-blue-600 mb-2 font-amiri">
                اللقب
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xl"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-lg font-medium text-blue-600 mb-2 font-amiri">
                الاسم
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xl"
              />
            </div>
            
            <div>
              <label htmlFor="grade" className="block text-sm font-bold text-gray-700 mb-1">
                المستوى الدراسي
              </label>
              <select
                id="grade"
                name="grade"
                required
                value={formData.grade}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">اختر المستوى</option>
                <option value="الأول">الصف الأول</option>
                <option value="الثاني">الصف الثاني</option>
                <option value="الثالث">الصف الثالث</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="class" className="block text-sm font-bold text-gray-700 mb-1">
                الفصل
              </label>
              <select
                id="class"
                name="class"
                required
                value={formData.class}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">اختر الفصل</option>
                <option value="أ">الفصل - 1</option>
                <option value="ب">الفصل - 2</option>
                <option value="ج">الفصل - 3</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-bold text-gray-700 mb-1">
                السن
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="10"
                max="20"
                value={formData.age}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="birthDate" className="block text-sm font-bold text-gray-700 mb-1">
                تاريخ الميلاد
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                required
                value={formData.birthDate}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-bold text-gray-700 mb-1">
                الجنس
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">اختر الجنس</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-1">
                العنوان
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <h2 className="text-xl font-medium text-gray-900 border-b pb-2 mt-8">معلومات ولي الأمر</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="parentName" className="block text-sm font-bold text-gray-700 mb-1">
                اسم ولي الأمر
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                required
                value={formData.parentName}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="parentPhone" className="block text-sm font-bold text-gray-700 mb-1">
                رقم الهاتف
              </label>
              <input
                type="tel"
                id="parentPhone"
                name="parentPhone"
                required
                value={formData.parentPhone}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="parentEmail" className="block text-sm font-bold text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="parentEmail"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="familyStatus" className="block text-sm font-bold text-gray-700 mb-1">
                الحالة الاجتماعية للأسرة
              </label>
              <select
                id="familyStatus"
                name="familyStatus"
                value={formData.familyStatus}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">اختر الحالة</option>
                <option value="مستقرة">مستقرة</option>
                <option value="منفصلة">منفصلة</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>
          </div>
          
          <h2 className="text-xl font-medium text-gray-900 border-b pb-2 mt-8">معلومات إضافية</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="medicalConditions" className="block text-sm font-bold text-gray-700 mb-1">
                الحالة الصحية
              </label>
              <textarea
                id="medicalConditions"
                name="medicalConditions"
                rows={3}
                value={formData.medicalConditions}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="أي حالات صحية أو احتياجات خاصة يجب معرفتها"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-bold text-gray-700 mb-1">
                ملاحظات
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="أي ملاحظات إضافية"
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;