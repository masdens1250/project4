import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StudentsList from './pages/StudentsList';
import StudentDetails from './pages/StudentDetails';
import AddStudent from './pages/AddStudent';
import TestsList from './pages/TestsList';
import TestDetails from './pages/TestDetails';
import AddTest from './pages/AddTest';
import TakeTest from './pages/TakeTest';
import Reports from './pages/Reports';
import ReportView from './pages/ReportView';
import GuidanceReport from './pages/GuidanceReport';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/tests" element={<TestsList />} />
            <Route path="/tests/:id" element={<TestDetails />} />
            <Route path="/tests/add" element={<AddTest />} />
            <Route path="/tests/:id/take" element={<TakeTest />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:id" element={<ReportView />} />
            <Route path="/reports/guidance" element={<GuidanceReport />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;