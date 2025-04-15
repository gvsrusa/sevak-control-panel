import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import MobileMenu from './components/layout/MobileMenu';
import PageContainer from './components/layout/PageContainer';
import Dashboard from './pages/Dashboard';
import Control from './pages/Control';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { TractorProvider } from './context/TractorContext';
import { OfflineProvider } from './context/OfflineContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <LanguageProvider>
        <OfflineProvider>
          <AuthProvider>
            <TractorProvider>
              <div className="min-h-screen bg-gray-100 text-gray-800">
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="flex">
                  <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                  <MobileMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                  <PageContainer>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/control" element={<Control />} />
                      <Route path="/schedule" element={<Schedule />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </PageContainer>
                </div>
              </div>
            </TractorProvider>
          </AuthProvider>
        </OfflineProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;