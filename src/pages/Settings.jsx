import React, { useState, useContext } from 'react';
import Button from '../components/common/Button';
import { LanguageContext } from '../context/LanguageContext';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { user, updateProfile } = useContext(AuthContext);
  
  // Local state for form fields
  const [name, setName] = useState(user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [notificationsEnabled, setNotificationsEnabled] = useState(user?.preferences?.notifications || false);
  
  const translations = {
    settings: {
      en: 'Settings',
      hi: 'सेटिंग्स',
      mr: 'सेटिंग्ज',
      te: 'సెట్టింగులు',
    },
    profile: {
      en: 'Profile',
      hi: 'प्रोफाइल',
      mr: 'प्रोफाइल',
      te: 'ప్రొఫైల్',
    },
    name: {
      en: 'Name',
      hi: 'नाम',
      mr: 'नाव',
      te: 'పేరు',
    },
    phoneNumber: {
      en: 'Phone Number',
      hi: 'फोन नंबर',
      mr: 'फोन नंबर',
      te: 'ఫోన్ నంబర్',
    },
    language: {
      en: 'Language',
      hi: 'भाषा',
      mr: 'भाषा',
      te: 'భాష',
    },
    notifications: {
      en: 'Notifications',
      hi: 'सूचनाएं',
      mr: 'सूचना',
      te: 'నోటిఫికేషన్లు',
    },
    enableNotifications: {
      en: 'Enable notifications',
      hi: 'सूचनाएं सक्षम करें',
      mr: 'सूचना सक्षम करा',
      te: 'నోటిఫికేషన్లను ప్రారంభించండి',
    },
    english: {
      en: 'English',
      hi: 'अंग्रेज़ी',
      mr: 'इंग्रजी',
      te: 'ఇంగ్లీష్',
    },
    hindi: {
      en: 'Hindi',
      hi: 'हिंदी',
      mr: 'हिंदी',
      te: 'హిందీ',
    },
    marathi: {
      en: 'Marathi',
      hi: 'मराठी',
      mr: 'मराठी',
      te: 'మరాఠీ',
    },
    telugu: {
      en: 'Telugu',
      hi: 'तेलुगु',
      mr: 'तेलुगू',
      te: 'తెలుగు',
    },
    save: {
      en: 'Save Changes',
      hi: 'परिवर्तन सहेजें',
      mr: 'बदल जतन करा',
      te: 'మార్పులను సేవ్ చేయండి',
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSaveChanges = () => {
    // Update language context
    setLanguage(selectedLanguage);
    
    // Update user profile
    updateProfile({
      name,
      phoneNumber,
      preferences: {
        notifications: notificationsEnabled,
        language: selectedLanguage,
      }
    });
  };

  const languageOptions = [
    { value: 'en', label: translations.english },
    { value: 'hi', label: translations.hindi },
    { value: 'mr', label: translations.marathi },
    { value: 'te', label: translations.telugu },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        {translations.settings[language]}
      </h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          {translations.profile[language]}
        </h2>
        
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {translations.name[language]}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {translations.phoneNumber[language]}
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          {translations.language[language]}
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {languageOptions.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                id={`language-${option.value}`}
                name="language"
                type="radio"
                value={option.value}
                checked={selectedLanguage === option.value}
                onChange={handleLanguageChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`language-${option.value}`} className="ml-3 block text-sm font-medium text-gray-700">
                {option.label[language]}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          {translations.notifications[language]}
        </h2>
        
        <div className="flex items-center">
          <input
            id="notifications"
            name="notifications"
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
          />
          <label htmlFor="notifications" className="ml-3 block text-sm font-medium text-gray-700">
            {translations.enableNotifications[language]}
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveChanges}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          {translations.save[language]}
        </Button>
      </div>
    </div>
  );
};

export default Settings;