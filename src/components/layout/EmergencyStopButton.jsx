import React, { useContext } from 'react';
import { TractorContext } from '../../context/TractorContext';
import { LanguageContext } from '../../context/LanguageContext';
import Button from '../common/Button';

const EmergencyStopButton = ({ className, size = "normal" }) => {
  const { triggerEmergencyStop } = useContext(TractorContext);
  const { language } = useContext(LanguageContext);

  const translations = {
    stop: {
      en: 'STOP',
      hi: 'रुकें',
      mr: 'थांबा',
      te: 'ఆపండి',
    }
  };

  const handleEmergencyStop = () => {
    triggerEmergencyStop();
  };

  const sizeClasses = {
    normal: 'h-10 px-4 text-base',
    large: 'h-16 w-16 text-xl rounded-full shadow-lg'
  };

  return (
    <Button 
      onClick={handleEmergencyStop}
      className={`
        bg-red-600 hover:bg-red-700 text-white font-bold 
        ${sizeClasses[size]} ${className || ''}
      `}
    >
      {translations.stop[language]}
    </Button>
  );
};

export default EmergencyStopButton;