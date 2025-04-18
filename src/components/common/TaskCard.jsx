import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import Button from './Button';

const TaskCard = ({
  id,
  title,
  type,
  status,
  scheduledTime,
  duration,
  recurring,
  onStart,
  onEdit,
  onDelete,
  className
}) => {
  const { language } = useContext(LanguageContext);

  const translations = {
    start: {
      en: 'Start',
      hi: 'शुरू करें',
      mr: 'सुरू करा',
      te: 'ప్రారంభించు',
    },
    edit: {
      en: 'Edit',
      hi: 'संपादित करें',
      mr: 'संपादित करा',
      te: 'సవరించు',
    },
    scheduled: {
      en: 'Scheduled',
      hi: 'अनुसूचित',
      mr: 'नियोजित',
      te: 'షెడ్యూల్',
    },
    inProgress: {
      en: 'In Progress',
      hi: 'प्रगति में',
      mr: 'प्रगतीपथावर',
      te: 'ప్రగతిలో',
    },
    completed: {
      en: 'Completed',
      hi: 'पूर्ण',
      mr: 'पूर्ण झाले',
      te: 'పూర్తయింది',
    },
    cancelled: {
      en: 'Cancelled',
      hi: 'रद्द',
      mr: 'रद्द',
      te: 'రద్దు',
    },
    daily: {
      en: 'Daily',
      hi: 'दैनिक',
      mr: 'दैनंदिन',
      te: 'రోజువారీ',
    },
    weekly: {
      en: 'Weekly',
      hi: 'साप्ताहिक',
      mr: 'साप्ताहिक',
      te: 'వారానికి',
    },
  };

  // Task type icons
  const typeIcons = {
    cutting: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z',
    loading: 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4',
    transport: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
  };

  // Status configurations
  const statusConfig = {
    scheduled: { color: 'blue', textColor: 'text-blue-700', bgColor: 'bg-blue-100' },
    inProgress: { color: 'green', textColor: 'text-green-700', bgColor: 'bg-green-100' },
    completed: { color: 'gray', textColor: 'text-gray-700', bgColor: 'bg-gray-100' },
    cancelled: { color: 'red', textColor: 'text-red-700', bgColor: 'bg-red-100' },
  };

  const currentStatus = statusConfig[status] || statusConfig.scheduled;

  // Format time from Date object or timestamp
  const formatTime = (time) => {
    if (!time) return '';
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date from Date object or timestamp
  const formatDate = (time) => {
    if (!time) return '';
    const date = new Date(time);
    return date.toLocaleDateString();
  };

  return (
    <div className={`border rounded-lg overflow-hidden bg-white ${className || ''}`}>
      <div className={`px-4 py-3 flex justify-between items-center ${currentStatus.bgColor}`}>
        <div className="flex items-center">
          <div className={`p-1.5 rounded-full ${currentStatus.bgColor} mr-2`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentStatus.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={typeIcons[type] || typeIcons.cutting} />
            </svg>
          </div>
          <span className="font-medium">{title}</span>
        </div>
        <span className={`text-sm font-medium ${currentStatus.textColor} rounded-full px-2 py-1`}>
          {translations[status][language]}
        </span>
      </div>
      
      <div className="px-4 py-3 border-b">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-600">{formatDate(scheduledTime)}</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600">{formatTime(scheduledTime)}</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600">{duration} min</span>
          </div>

          {recurring && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-gray-600">{translations[recurring][language]}</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-2 flex justify-end gap-2">
        {status === 'scheduled' && (
          <Button 
            onClick={() => onStart(id)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4"
          >
            {translations.start[language]}
          </Button>
        )}
        
        <Button 
          onClick={() => onEdit(id)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-2 px-4"
        >
          {translations.edit[language]}
        </Button>
        
        <Button 
          onClick={() => onDelete(id)}
          className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-sm py-2 px-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;