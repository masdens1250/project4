import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, Save, FileText, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface StudentData {
  id: number;
  name: string;
  grade: string;
  class: string;
}

interface GuidanceReportData {
  elementaryLevel: {
    grade5: {
      school: string;
      classesCount: number;
      beneficiaryClassesCount: number;
      completionDate: string;
      subject: string;
      comments: string;
    }
  };
  middleLevel: {
    grade1: {
      school: string;
      classesCount: number;
      beneficiaryClassesCount: number;
      completionDate: string;
      subject: string;
      comments: string;
    }
  };
}

const GuidanceReport: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const [reportData, setReportData] = useState<GuidanceReportData>({
    elementaryLevel: {
      grade5: {
        school: 'مدرسة النموذجية الابتدائية',
        classesCount: 4,
        beneficiaryClassesCount: 3,
        completionDate: '2023-06-15',
        subject: 'التوجيه المهني',
        comments: ''
      }
    },
    middleLevel: {
      grade1: {
        school: 'متوسطة جلول ناصر',
        classesCount: 5,
        beneficiaryClassesCount: 4,
        completionDate: '2023-06-20',
        subject: 'الإرشاد الأكاديمي',
        comments: ''
      }
    }
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
        
        // Traiter les données et mettre à jour le rapport
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
    // Exemple de traitement des données Excel
    // Dans une application réelle, vous adapteriez cette logique en fonction de la structure de votre fichier Excel
    
    const elementaryData = data.filter(row => row.Level === 'ابتدائي' && row.Grade === '5');
    const middleData = data.filter(row => row.Level === 'متوسط' && row.Grade === '1');
    
    if (elementaryData.length > 0) {
      const elementary = elementaryData[0];
      setReportData(prev => ({
        ...prev,
        elementaryLevel: {
          grade5: {
            ...prev.elementaryLevel.grade5,
            school: elementary.School || prev.elementaryLevel.grade5.school,
            classesCount: elementary.ClassesCount || prev.elementaryLevel.grade5.classesCount,
            beneficiaryClassesCount: elementary.BeneficiaryClassesCount || prev.elementaryLevel.grade5.beneficiaryClassesCount,
            completionDate: elementary.CompletionDate || prev.elementaryLevel.grade5.completionDate,
            subject: elementary.Subject || prev.elementaryLevel.grade5.subject,
            comments: elementary.Comments || prev.elementaryLevel.grade5.comments
          }
        }
      }));
    }
    
    if (middleData.length > 0) {
      const middle = middleData[0];
      setReportData(prev => ({
        ...prev,
        middleLevel: {
          grade1: {
            ...prev.middleLevel.grade1,
            school: middle.School || prev.middleLevel.grade1.school,
            classesCount: middle.ClassesCount || prev.middleLevel.grade1.classesCount,
            beneficiaryClassesCount: middle.BeneficiaryClassesCount || prev.middleLevel.grade1.beneficiaryClassesCount,
            completionDate: middle.CompletionDate || prev.middleLevel.grade1.completionDate,
            subject: middle.Subject || prev.middleLevel.grade1.subject,
            comments: middle.Comments || prev.middleLevel.grade1.comments
          }
        }
      }));
    }
  };

  const handleChange = (level: 'elementaryLevel' | 'middleLevel', grade: 'grade5' | 'grade1', field: string, value: string | number) => {
    setReportData(prev => ({
      ...prev,
      [level]: {
        ...prev[level],
        [grade]: {
          ...prev[level][grade],
          [field]: value
        }
      }
    }));
  };

  const handleSave = () => {
    // Simuler la sauvegarde des données
    localStorage.setItem('guidanceReportData', JSON.stringify(reportData));
    alert('تم حفظ التقرير بنجاح');
  };

  const handleGeneratePDF = () => {
    alert('جاري تحميل التقرير بصيغة PDF...');
    // Dans une application réelle, vous utiliseriez jsPDF pour générer le PDF
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
          <h1 className="text-3xl font-bold text-gray-800">تقارير الإعلام والإرشاد</h1>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <button
            onClick={triggerFileInput}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
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
          
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Save size={20} />
            <span>حفظ</span>
          </button>
          
          <button
            onClick={handleGeneratePDF}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Download size={20} />
            <span>تحميل PDF</span>
          </button>
        </div>
      </div>
      
      {uploadSuccess && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md">
          تم استيراد البيانات بنجاح وتحديث التقرير
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-6 border-b pb-2">1- الإعــــــلام والإرشــاد:</h2>
        
        {/* Elementary Level - Grade 5 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">1-1 السنة 5 ابتدائي</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">المدرسة</th>
                  <th className="border border-gray-300 px-4 py-2">عدد الأفواج</th>
                  <th className="border border-gray-300 px-4 py-2">عدد الأفواج المستفيدة</th>
                  <th className="border border-gray-300 px-4 py-2">تاريخ الإنجاز</th>
                  <th className="border border-gray-300 px-4 py-2">الموضوع</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={reportData.elementaryLevel.grade5.school}
                      onChange={(e) => handleChange('elementaryLevel', 'grade5', 'school', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={reportData.elementaryLevel.grade5.classesCount}
                      onChange={(e) => handleChange('elementaryLevel', 'grade5', 'classesCount', parseInt(e.target.value))}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={reportData.elementaryLevel.grade5.beneficiaryClassesCount}
                      onChange={(e) => handleChange('elementaryLevel', 'grade5', 'beneficiaryClassesCount', parseInt(e.target.value))}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="date"
                      value={reportData.elementaryLevel.grade5.completionDate}
                      onChange={(e) => handleChange('elementaryLevel', 'grade5', 'completionDate', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={reportData.elementaryLevel.grade5.subject}
                      onChange={(e) => handleChange('elementaryLevel', 'grade5', 'subject', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="border border-gray-300 px-4 py-2 bg-gray-50">
                    <div className="mb-2 font-medium">تعليق:</div>
                    <textarea
                      value={reportData.elementaryLevel.grade5.comments}
                      onChange={(e) => handleChange('elementaryLevel', 'grade5', 'comments', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows={3}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Middle Level - Grade 1 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">1-2 السنة 1 متوسط:</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">المتوسطة</th>
                  <th className="border border-gray-300 px-4 py-2">عدد الأفواج</th>
                  <th className="border border-gray-300 px-4 py-2">عدد الأفواج المستفيدة</th>
                  <th className="border border-gray-300 px-4 py-2">تاريخ الإنجاز</th>
                  <th className="border border-gray-300 px-4 py-2">الموضوع</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={reportData.middleLevel.grade1.school}
                      onChange={(e) => handleChange('middleLevel', 'grade1', 'school', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={reportData.middleLevel.grade1.classesCount}
                      onChange={(e) => handleChange('middleLevel', 'grade1', 'classesCount', parseInt(e.target.value))}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={reportData.middleLevel.grade1.beneficiaryClassesCount}
                      onChange={(e) => handleChange('middleLevel', 'grade1', 'beneficiaryClassesCount', parseInt(e.target.value))}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="date"
                      value={reportData.middleLevel.grade1.completionDate}
                      onChange={(e) => handleChange('middleLevel', 'grade1', 'completionDate', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={reportData.middleLevel.grade1.subject}
                      onChange={(e) => handleChange('middleLevel', 'grade1', 'subject', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="border border-gray-300 px-4 py-2 bg-gray-50">
                    <div className="mb-2 font-medium">تعليق:</div>
                    <textarea
                      value={reportData.middleLevel.grade1.comments}
                      onChange={(e) => handleChange('middleLevel', 'grade1', 'comments', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows={3}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidanceReport;