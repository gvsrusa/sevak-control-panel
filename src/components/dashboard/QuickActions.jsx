import React, { useContext } from 'react';
import Button from '../common/Button';
import { TractorContext } from '../../context/TractorContext';
import { LanguageContext } from '../../context/LanguageContext';

const QuickActions = ({ className }) => {
  const { triggerOperation, isTractorBusy } = useContext(TractorContext);
  const { language } = useContext(LanguageContext);

  const translations = {
    quickActions: {
      en: 'Quick Actions',
      hi: 'त्वरित क्रियाएँ',
      mr: 'जलद क्रिया',
      te: 'త్వరిత చర్యలు',
    },
    startCutting: {
      en: 'Start Cutting',
      hi: 'कटाई शुरू करें',
      mr: 'कापणी सुरू करा',
      te: 'కటింగ్ ప్రారంభించండి',
    },
    startLoading: {
      en: 'Start Loading',
      hi: 'लोडिंग शुरू करें',
      mr: 'लोडिंग सुरू करा',
      te: 'లోడింగ్ ప్రారంభించండి',
    },
    startTransport: {
      en: 'Start Transport',
      hi: 'परिवहन शुरू करें',
      mr: 'वाहतूक सुरू करा',
      te: 'రవాణా ప్రారంభించండి',
    },
    goToField: {
      en: 'Go To Field',
      hi: 'खेत पर जाएँ',
      mr: 'शेतात जा',
      te: 'క్షేత్రానికి వెళ్ళండి',
    },
    returnHome: {
      en: 'Return Home',
      hi: 'घर वापस आएँ',
      mr: 'घरी परत या',
      te: 'తిరిగి ఇంటికి',
    },
    scheduleTask: {
      en: 'Schedule Task',
      hi: 'कार्य शेड्यूल करें',
      mr: 'कार्य नियोजित करा',
      te: 'పనిని షెడ్యూల్ చేయండి',
    }
  };

  const quickActionButtons = [
    { id: 'startCutting', icon: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z', action: () => triggerOperation('cutting') },
    { id: 'startLoading', icon: 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4', action: () => triggerOperation('loading') },
    { id: 'startTransport', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0', action: () => triggerOperation('transport') },
    { id: 'goToField', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', action: () => triggerOperation('goToField') },
    { id: 'returnHome', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', action: () => triggerOperation('returnHome') },
    { id: 'scheduleTask', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', action: () => window.location.href = '/schedule' },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className || ''}`}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        {translations.quickActions[language]}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {quickActionButtons.map((button) => (
          <Button
            key={button.id}
            onClick={button.action}
            disabled={isTractorBusy && button.id !== 'scheduleTask'}
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 h-20 flex flex-col items-center justify-center p-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={button.icon} />
            </svg>
            <span className="text-xs font-medium">
              {translations[button.id][language]}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;