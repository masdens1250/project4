import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { resetApplicationData } from '../utils/resetData';
import { useNavigate } from 'react-router-dom';

type TabType = 'general' | 'reports' | 'notifications';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolType: '',
    schoolLogo: '',
    principalName: '',
    counselorName: '',
    address: '',
    phone: '',
    email: '',
    reportHeader: 'الجمهورية الجزائرية الديمقراطية الشعبية\nوزارة التعليم الوطنية',
    reportFooter: 'جميع الحقوق محفوظة © 2025',
    enableEmailNotifications: false,
    enableSmsNotifications: false,
    enablePushNotifications: false,
    notifyOnNewTest: false,
    notifyOnTestCompletion: false,
    notifyOnReportGeneration: false,
    defaultLanguage: 'ar',
    reportLogo: false,
    reportSignature: false,
    reportWatermark: false,
    reportColorTheme: 'blue',
    websiteUrl: 'https://netscolaire-dz.netlify.app',
    groupsCount: '3',
    groupsEnabled: true,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('schoolSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setFormData(prev => ({ ...prev, ...parsedSettings }));
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (name === 'schoolType') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        reportHeader: `الجمهورية الجزائرية الديمقراطية الشعبية\nوزارة التعليم الوطنية\n${value}`
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('schoolSettings', JSON.stringify(formData));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setResetConfirmOpen(true);
  };

  const confirmReset = () => {
    resetApplicationData();
    setResetConfirmOpen(false);
    navigate('/');
  };

  const renderGroupSettings = () => (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">إعدادات الأفواج</h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="groupsEnabled"
              name="groupsEnabled"
              type="checkbox"
              checked={formData.groupsEnabled}
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="mr-3 text-sm">
            <label htmlFor="groupsEnabled" className="font-medium text-gray-700">
              تفعيل نظام الأفواج
            </label>
            <p className="text-gray-500">السماح بتقسيم الطلاب إلى أفواج</p>
          </div>
        </div>

        <div>
          <label htmlFor="groupsCount" className="block text-sm font-medium text-gray-700 mb-1">
            عدد الأفواج
          </label>
          <select
            id="groupsCount"
            name="groupsCount"
            value={formData.groupsCount}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">الإعدادات</h1>
        <div className="flex items-center gap-4">
          {saveSuccess && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
              تم حفظ الإعدادات بنجاح
            </div>
          )}
          <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <RefreshCw size={20} />
            <span>إعادة تعيين التطبيق</span>
          </button>
          <button
            form="settings-form"
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Save size={20} />
            <span>حفظ الإعدادات</span>
          </button>
        </div>
      </div>

      {resetConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">تأكيد إعادة التعيين</h2>
            <p className="text-gray-700 mb-6">
              هل أنت متأكد من أنك تريد إعادة تعيين جميع بيانات التطبيق؟ سيتم حذف جميع السجلات والتقارير والإعدادات بشكل نهائي.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                إلغاء
              </button>
              <button
                onClick={confirmReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                تأكيد إعادة التعيين
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              الإعدادات العامة
            </button>
            <button
              className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              إعدادات التقارير
            </button>
            <button
              className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              إعدادات الإشعارات
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          <form id="settings-form" onSubmit={handleSubmit} className="space-y-8">
            {activeTab === 'general' && (
              <>
                <div>
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">معلومات المؤسسة</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
                        اسم المؤسسة
                      </label>
                      <input
                        type="text"
                        id="schoolName"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="schoolType" className="block text-sm font-medium text-gray-700 mb-1">
                        نوع المؤسسة
                      </label>
                      <select
                        id="schoolType"
                        name="schoolType"
                        value={formData.schoolType}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">اختر نوع المؤسسة</option>
                        <option value="متوسطة جلول ناصر">متوسطة جلول ناصر</option>
                        <option value="متوسطة حورية">متوسطة حورية</option>
                        <option value="متوسطة بوتشاشة">متوسطة بوتشاشة</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="principalName" className="block text-sm font-medium text-gray-700 mb-1">
                        اسم مدير المؤسسة
                      </label>
                      <input
                        type="text"
                        id="principalName"
                        name="principalName"
                        value={formData.principalName}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="counselorName" className="block text-sm font-medium text-gray-700 mb-1">
                        اسم مستشار(ة) التوجيه
                      </label>
                      <input
                        type="text"
                        id="counselorName"
                        name="counselorName"
                        value={formData.counselorName}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">معلومات الاتصال</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
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
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        الموقع الإلكتروني
                      </label>
                      <input
                        type="url"
                        id="websiteUrl"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                        اللغة الافتراضية
                      </label>
                      <select
                        id="defaultLanguage"
                        name="defaultLanguage"
                        value={formData.defaultLanguage}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="ar">العربية</option>
                        <option value="en">الإنجليزية</option>
                        <option value="fr">الفرنسية</option>
                      </select>
                    </div>
                  </div>
                </div>
                {renderGroupSettings()}
              </>
            )}
            
            {activeTab === 'reports' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">إعدادات التقارير</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="reportHeader" className="block text-sm font-medium text-gray-700 mb-1">
                      ترويسة التقرير
                    </label>
                    <textarea
                      id="reportHeader"
                      name="reportHeader"
                      rows={3}
                      value={formData.reportHeader}
                      onChange={handleChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="reportFooter" className="block text-sm font-medium text-gray-700 mb-1">
                      تذييل التقرير
                    </label>
                    <textarea
                      id="reportFooter"
                      name="reportFooter"
                      rows={2}
                      value={formData.reportFooter}
                      onChange={handleChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="reportColorTheme" className="block text-sm font-medium text-gray-700 mb-1">
                        لون التقرير
                      </label>
                      <select
                        id="reportColorTheme"
                        name="reportColorTheme"
                        value={formData.reportColorTheme}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="blue">أزرق</option>
                        <option value="green">أخضر</option>
                        <option value="red">أحمر</option>
                        <option value="purple">بنفسجي</option>
                        <option value="gray">رمادي</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="reportLogo"
                          name="reportLogo"
                          type="checkbox"
                          checked={formData.reportLogo}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="mr-3 text-sm">
                        <label htmlFor="reportLogo" className="font-medium text-gray-700">
                          إظهار شعار المؤسسة في التقارير
                        </label>
                        <p className="text-gray-500">سيتم عرض شعار المؤسسة في أعلى كل تقرير.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="reportSignature"
                          name="reportSignature"
                          type="checkbox"
                          checked={formData.reportSignature}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="mr-3 text-sm">
                        <label htmlFor="reportSignature" className="font-medium text-gray-700">
                          إظهار مساحة التوقيع في التقارير
                        </label>
                        <p className="text-gray-500">سيتم عرض مساحة للتوقيع في نهاية كل تقرير.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="reportWatermark"
                          name="reportWatermark"
                          type="checkbox"
                          checked={formData.reportWatermark}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="mr-3 text-sm">
                        <label htmlFor="reportWatermark" className="font-medium text-gray-700">
                          إضافة علامة مائية للتقارير
                        </label>
                        <p className="text-gray-500">سيتم إضافة علامة مائية تحمل اسم المؤسسة في خلفية التقارير.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">إعدادات الإشعارات</h2>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-md font-medium text-gray-800">قنوات الإشعارات</h3>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="enableEmailNotifications"
                          name="enableEmailNotifications"
                          type="checkbox"
                          checked={formData.enableEmailNotifications}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="mr-3 text-sm">
                        <label htmlFor="enableEmailNotifications" className="font-medium text-gray-700">
                          تفعيل إشعارات البريد الإلكتروني
                        </label>
                        <p className="text-gray-500">سيتم إرسال إشعارات عبر البريد الإلكتروني عند إضافة اختبارات جديدة أو تحديث نتائج التلاميذ.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="enableSmsNotifications"
                          name="enableSmsNotifications"
                          type="checkbox"
                          checked={formData.enableSmsNotifications}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="mr-3 text-sm">
                        <label htmlFor="enableSmsNotifications" className="font-medium text-gray-700">
                          تفعيل إشعارات الرسائل النصية
                        </label>
                        <p className="text-gray-500">سيتم إرسال إشعارات عبر الرسائل النصية عند إضافة اختبارات جديدة أو تحديث نتائج التلاميذ.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="enablePushNotifications"
                          name="enablePushNotifications"
                          type="checkbox"
                          checked={formData.enablePushNotifications}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="mr-3 text-sm">
                        <label htmlFor="enablePushNotifications" className="font-medium text-gray-700">
                          تفعيل الإشعارات الفورية
                        </label>
                        <p className="text-gray-500">سيتم إرسال إشعارات فورية عبر التطبيق عند حدوث تحديثات مهمة.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-md font-medium text-gray-800">أنواع الإشعارات</h3>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notifyOnNewTest"
                          name="notifyOnNewTest"
                          type="checkbox"
                          checked={formData.notifyOnNewTest}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="mr-3 text-sm">
                        <label htmlFor="notifyOnNewTest" className="font-medium text-gray-700">
                          إشعار عند إضافة اختبار جديد
                        </label>
                        <p className="text-gray-500">سيتم إرسال إشعار عند إضافة اختبار جديد للتلاميذ.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notifyOnTestCompletion"
                          name="notifyOnTestCompletion"
                          type="checkbox"
                          checked={formData.notifyOnTestCompletion}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="mr-3 text-sm">
                        <label htmlFor="notifyOnTestCompletion" className="font-medium text-gray-700">
                          إشعار عند اكتمال الاختبار
                        </label>
                        <p className="text-gray-500">سيتم إرسال إشعار عند اكتمال اختبار من قبل التلميذ.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notifyOnReportGeneration"
                          name="notifyOnReportGeneration"
                          type="checkbox"
                          checked={formData.notifyOnReportGeneration}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="mr-3 text-sm">
                        <label htmlFor="notifyOnReportGeneration" className="font-medium text-gray-700">
                          إشعار عند إنشاء تقرير جديد
                        </label>
                        <p className="text-gray-500">سيتم إرسال إشعار عند إنشاء تقرير جديد للتلميذ.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;