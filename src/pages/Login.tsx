import React, { useState, useEffect } from 'react';
import { Lock, ArrowLeft, Timer } from 'lucide-react';
import { login, getAuthInfo } from '../utils/auth';
import dayjs from 'dayjs';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if there's an active trial and update remaining time
    const authInfo = getAuthInfo();
    if (authInfo && !authInfo.isUnlimited && authInfo.trialEndDate) {
      const updateRemainingTime = () => {
        const now = dayjs();
        const end = dayjs(authInfo.trialEndDate);
        const diff = end.diff(now);
        
        if (diff <= 0) {
          setRemainingTime(null);
          return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        setRemainingTime(`${days}d ${hours}h ${minutes}m`);
      };
      
      updateRemainingTime();
      const interval = setInterval(updateRemainingTime, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = login(password);
    
    if (result.success) {
      setError('');
      setShowWelcome(true);
      
      setTimeout(() => {
        onLogin();
      }, 2000);
    } else {
      setError(result.message);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {showWelcome ? (
          <div className="text-center">
            <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6">
              <h2 className="text-2xl font-bold">مرحبا</h2>
              <p className="mt-2">جاري تحميل النظام...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-800 mb-4">
                <Lock size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">نظام الاختبارات النفسية</h1>
              <p className="text-gray-600 mt-2">الرجاء إدخال كلمة المرور للدخول</p>
              
              {remainingTime && (
                <div className="mt-4 flex items-center justify-center text-yellow-600 gap-2">
                  <Timer size={20} />
                  <span>الوقت المتبقي للتجربة: {remainingTime}</span>
                </div>
              )}
            </div>
            
            {error && (
              <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                  placeholder="أدخل كلمة المرور"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <span>تسجيل الدخول</span>
                <ArrowLeft size={20} />
              </button>
            </form>
            
            <div className="mt-8 text-center text-xs text-gray-500">
              <p className="font-bold">جميع الحقوق محفوظة © 2025</p>
              <p className="mt-1 font-bold">Mr ROUABEH KARIM</p>
              <p className="mt-1 ltr font-bold">Tél: (+213) 07.83.32.87.29</p>
              <a 
                href="https://netscolaire-dz.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block mt-1 text-blue-500 hover:text-blue-700"
              >
                netscolaire-dz.netlify.app
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;