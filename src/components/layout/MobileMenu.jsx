import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';

const MobileMenu = ({ isOpen, toggleSidebar }) => {
  const { language } = useContext(LanguageContext);

  const translations = {
    dashboard: {
      en: 'Dashboard',
      hi: 'डैशबोर्ड',
      mr: 'डॅशबोर्ड',
      te: 'డాష్‌బోర్డ్',
    },
    control: {
      en: 'Control',
      hi: 'नियंत्रण',
      mr: 'नियंत्रण',
      te: 'నియంత్రణ',
    },
    schedule: {
      en: 'Schedule',
      hi: 'अनुसूची',
      mr: 'वेळापत्रक',
      te: 'షెడ్యూల్',
    },
    settings: {
      en: 'Settings',
      hi: 'सेटिंग्स',
      mr: 'सेटिंग्ज',
      te: 'సెట్టింగులు',
    },
  };

  // Only shown on mobile, when sidebar is closed
  if (!isOpen) return null;

  const navItems = [
    { path: '/', name: translations.dashboard[language], icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/control', name: translations.control[language], icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { path: '/schedule', name: translations.schedule[language], icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { path: '/settings', name: translations.settings[language], icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
        <div className="px-6 pt-6 pb-4 flex justify-between items-center">
          <span className="text-xl font-semibold">Menu</span>
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-5 px-3">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={toggleSidebar}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors 
                  ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;