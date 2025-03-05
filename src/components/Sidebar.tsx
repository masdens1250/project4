import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  FileText, 
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <div className="w-64 bg-blue-800 text-white h-full flex flex-col">
      <div className="p-5 border-b border-blue-700">
        <h1 className="text-2xl font-bold text-center">نظام الاختبارات النفسية</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          <li>
            <Link 
              to="/" 
              className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-blue-700 transition-colors ${isActive('/')}`}
            >
              <LayoutDashboard size={20} />
              <span>لوحة التحكم</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/students" 
              className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-blue-700 transition-colors ${isActive('/students')}`}
            >
              <Users size={20} />
              <span>قائمة التلاميذ</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/tests" 
              className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-blue-700 transition-colors ${isActive('/tests')}`}
            >
              <ClipboardList size={20} />
              <span>الاختبارات</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/reports" 
              className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-blue-700 transition-colors ${isActive('/reports')}`}
            >
              <FileText size={20} />
              <span>التقارير</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/settings" 
              className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-blue-700 transition-colors ${isActive('/settings')}`}
            >
              <Settings size={20} />
              <span>الإعدادات</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-700">
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-md hover:bg-blue-700 transition-colors"
        >
          <LogOut size={20} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
      
      <div className="p-3 text-center text-xs text-blue-300 border-t border-blue-700">
        <p className="font-bold">جميع الحقوق محفوظة © 2025</p>
        <p className="mt-1 font-bold">Mr ROUABEH KARIM</p>
        <p className="mt-1 ltr font-bold">Tél: (+213) 07.83.32.87.29</p>
        <a 
          href="https://netscolaire-dz.netlify.app" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block mt-1 text-blue-200 hover:text-white transition-colors"
        >
          netscolaire-dz.netlify.app
        </a>
      </div>
    </div>
  );
};

export default Sidebar;