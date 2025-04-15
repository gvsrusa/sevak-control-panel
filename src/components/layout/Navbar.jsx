import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import EmergencyStopButton from './EmergencyStopButton';
import { OfflineContext } from '../../context/OfflineContext';
import { LanguageContext } from '../../context/LanguageContext';

const Navbar = ({ toggleSidebar }) => {
  const { isOffline } = useContext(OfflineContext);
  const { language } = useContext(LanguageContext);

  const translations = {
    title: {
      en: 'Sevak Control',
      hi: 'सेवक नियंत्रण',
      mr: 'सेवक नियंत्रण',
      te: 'సేవక్ కంట్రోల్',
    }
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="ml-4 font-bold text-xl md:text-2xl">
              {translations.title[language]}
            </Link>
          </div>
          <div className="flex items-center">
            {isOffline && (
              <span className="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full mr-3">
                Offline
              </span>
            )}
            <EmergencyStopButton className="mr-4" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;