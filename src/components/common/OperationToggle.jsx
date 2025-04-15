import React, { useContext } from 'react';
import { TractorContext } from '../../context/TractorContext';
import { LanguageContext } from '../../context/LanguageContext';
import Button from './Button';

const OperationToggle = ({ className }) => {
  const { operationMode, toggleOperation } = useContext(TractorContext);
  const { language } = useContext(LanguageContext);

  const translations = {
    operations: {
      en: 'Operations',
      hi: 'संचालन',
      mr: 'कार्ये',
      te: 'కార్యాచరణలు',
    },
    cutting: {
      en: 'Cutting',
      hi: 'कटाई',
      mr: 'कापणी',
      te: 'కట్టింగ్',
    },
    loading: {
      en: 'Loading',
      hi: 'लोडिंग',
      mr: 'लोडिंग',
      te: 'లోడింగ్',
    },
    transport: {
      en: 'Transport',
      hi: 'परिवहन',
      mr: 'वाहतूक',
      te: 'రవాణా',
    }
  };

  const operations = [
    { id: 'cutting', icon: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z' },
    { id: 'loading', icon: 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4' },
    { id: 'transport', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' },
  ];

  return (
    <div className={`${className || ''}`}>
      <h3 className="font-medium text-gray-700 mb-3">
        {translations.operations[language]}
      </h3>
      
      <div className="grid grid-cols-3 gap-2">
        {operations.map((op) => (
          <button
            key={op.id}
            onClick={() => toggleOperation(op.id)}
            className={`
              p-3 border rounded-lg flex flex-col items-center justify-center
              ${operationMode === op.id 
                ? 'bg-blue-100 border-blue-500 text-blue-800' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }
              transition-colors duration-150
            `}
            aria-pressed={operationMode === op.id}
          >
            <div className={`
              p-2 rounded-full mb-1
              ${operationMode === op.id ? 'bg-blue-200' : 'bg-gray-100'}
            `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={op.icon} />
              </svg>
            </div>
            <span className="text-xs font-medium mt-1">
              {translations[op.id][language]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OperationToggle;