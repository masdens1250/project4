import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Plus, Trash2 } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  type: string;
  options: string[];
}

const AddTest: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    duration: '',
    instructions: '',
  });
  
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: '',
      type: 'multiple',
      options: ['', '', '', ''],
    },
  ]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleQuestionChange = (id: number, field: string, value: string) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };
  
  const handleOptionChange = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(prev => 
      prev.map(q => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };
  
  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions(prev => [
      ...prev,
      {
        id: newId,
        text: '',
        type: 'multiple',
        options: ['', '', '', ''],
      },
    ]);
  };
  
  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(prev => prev.filter(q => q.id !== id));
    }
  };
  
  const addOption = (questionId: number) => {
    setQuestions(prev => 
      prev.map(q => {
        if (q.id === questionId) {
          return { ...q, options: [...q.options, ''] };
        }
        return q;
      })
    );
  };
  
  const removeOption = (questionId: number, optionIndex: number) => {
    setQuestions(prev => 
      prev.map(q => {
        if (q.id === questionId && q.options.length > 2) {
          const newOptions = [...q.options];
          newOptions.splice(optionIndex, 1);
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', { ...formData, questions });
    
    // Redirect to tests list after submission
    navigate('/tests');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">إضافة اختبار جديد</h1>
        <div className="flex space-x-2 space-x-reverse">
          <button
            onClick={() => navigate('/tests')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <X size={20} />
            <span>إلغاء</span>
          </button>
          <button
            form="add-test-form"
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Save size={20} />
            <span>حفظ</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form id="add-test-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                اسم الاختبار
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                نوع الاختبار
              </label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">اختر النوع</option>
                <option value="نفسي">نفسي</option>
                <option value="مهني">مهني</option>
                <option value="معرفي">معرفي</option>
                <option value="اجتماعي">اجتماعي</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                وصف الاختبار
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                مدة الاختبار (بالدقائق)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                required
                min="1"
                value={formData.duration}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                تعليمات الاختبار
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows={3}
                value={formData.instructions}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="أدخل تعليمات للطلاب قبل بدء الاختبار"
              ></textarea>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">الأسئلة</h2>
              <button
                type="button"
                onClick={addQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm"
              >
                <Plus size={16} />
                <span>إضافة سؤال</span>
              </button>
            </div>
            
            <div className="space-y-6">
              {questions.map((question, qIndex) => (
                <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">السؤال {qIndex + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={questions.length === 1}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label htmlFor={`question-${question.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        نص السؤال
                      </label>
                      <input
                        type="text"
                        id={`question-${question.id}`}
                        value={question.text}
                        onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`question-type-${question.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        نوع السؤال
                      </label>
                      <select
                        id={`question-type-${question.id}`}
                        value={question.type}
                        onChange={(e) => handleQuestionChange(question.id, 'type', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="multiple">اختيار متعدد</option>
                        <option value="truefalse">صح / خطأ</option>
                        <option value="scale">مقياس (1-5)</option>
                      </select>
                    </div>
                  </div>
                  
                  {question.type === 'multiple' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-gray-700">الخيارات</h4>
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            type="button"
                            onClick={() => addOption(question.id)}
                            className="text-blue-600 hover:text-blue-900 text-sm flex items-center gap-1"
                          >
                            <Plus size={14} />
                            <span>إضافة خيار</span>
                          </button>
                        </div>
                      </div>
                      
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(question.id, oIndex, e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`الخيار ${oIndex + 1}`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => removeOption(question.id, oIndex)}
                            className="text-red-600 hover:text-red-900"
                            disabled={question.options.length <= 2}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'truefalse' && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700">الخيارات</h4>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <input
                            id={`true-${question.id}`}
                            type="radio"
                            name={`truefalse-${question.id}`}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            defaultChecked
                          />
                          <label htmlFor={`true-${question.id}`} className="mr-2 block text-sm text-gray-700">
                            صحيح
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id={`false-${question.id}`}
                            type="radio"
                            name={`truefalse-${question.id}`}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                          <label htmlFor={`false-${question.id}`} className="mr-2 block text-sm text-gray-700">
                            خطأ
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {question.type === 'scale' && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700">المقياس (1-5)</h4>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">لا أوافق بشدة</span>
                        <div className="flex gap-4">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <div key={value} className="flex flex-col items-center">
                              <input
                                id={`scale-${question.id}-${value}`}
                                type="radio"
                                name={`scale-${question.id}`}
                                value={value}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                              />
                              <label htmlFor={`scale-${question.id}-${value}`} className="mt-1 block text-sm text-gray-700">
                                {value}
                              </label>
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">أوافق بشدة</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTest;