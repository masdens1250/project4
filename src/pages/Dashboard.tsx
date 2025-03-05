import React from 'react';
import { Users, ClipboardList, FileText, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  // Mock data for the dashboard
  const stats = {
    totalStudents: 256,
    totalTests: 42,
    completedTests: 128,
    pendingTests: 14,
  };

  const chartData = {
    labels: ['الصف الأول', 'الصف الثاني', 'الصف الثالث'],
    datasets: [
      {
        label: 'عدد التلاميذ',
        data: [85, 92, 79],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
      {
        label: 'الاختبارات المكتملة',
        data: [42, 56, 30],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'توزيع التلاميذ حسب المستوى',
        font: {
          size: 16,
          family: 'Tajawal',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: 'Tajawal',
          },
        },
      },
      x: {
        ticks: {
          font: {
            family: 'Tajawal',
          },
        },
      },
    },
  };

  const recentTests = [
    { id: 1, student: 'أحمد محمد', test: 'اختبار الذكاء العاطفي', date: '2023-06-15', status: 'مكتمل' },
    { id: 2, student: 'فاطمة علي', test: 'اختبار الميول المهنية', date: '2023-06-14', status: 'مكتمل' },
    { id: 3, student: 'عمر خالد', test: 'اختبار القدرات العقلية', date: '2023-06-13', status: 'قيد المراجعة' },
    { id: 4, student: 'نورة سعيد', test: 'اختبار الشخصية', date: '2023-06-12', status: 'مكتمل' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">لوحة التحكم</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card group">
          <div className="stat-icon stat-students group-hover:bg-blue-200 transition-colors">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 text-lg">إجمالي التلاميذ</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
          </div>
        </div>
        
        <div className="stat-card group">
          <div className="stat-icon stat-tests group-hover:bg-green-200 transition-colors">
            <ClipboardList className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 text-lg">إجمالي الاختبارات</p>
            <p className="text-2xl font-bold text-green-600">{stats.totalTests}</p>
          </div>
        </div>
        
        <div className="stat-card group">
          <div className="stat-icon stat-completed group-hover:bg-purple-200 transition-colors">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 text-lg">الاختبارات المكتملة</p>
            <p className="text-2xl font-bold text-purple-600">{stats.completedTests}</p>
          </div>
        </div>
        
        <div className="stat-card group">
          <div className="stat-icon stat-pending group-hover:bg-yellow-200 transition-colors">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 text-lg">اختبارات قيد الانتظار</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingTests}</p>
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800">إحصائيات التلاميذ والاختبارات</h2>
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
      
      {/* Recent Tests */}
      <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">آخر الاختبارات</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التلميذ
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الاختبار
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {test.student}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {test.test}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {test.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      test.status === 'مكتمل' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link to={`/tests/${test.id}`} className="text-blue-600 hover:text-blue-900 ml-4 transition-colors">
                      عرض
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 text-center">
          <Link to="/tests" className="text-blue-600 hover:text-blue-900 transition-colors">
            عرض جميع الاختبارات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;