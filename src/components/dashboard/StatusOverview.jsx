import React, { useContext } from 'react';
import BatteryIndicator from '../common/BatteryIndicator';
import StatusIndicator from '../common/StatusIndicator';
import Map from '../common/Map';
import { TractorContext } from '../../context/TractorContext';
import { LanguageContext } from '../../context/LanguageContext';

const StatusOverview = ({ className }) => {
  const { tractorStatus } = useContext(TractorContext);
  const { language } = useContext(LanguageContext);

  const translations = {
    status: {
      en: 'Status',
      hi: 'स्थिति',
      mr: 'स्थिती',
      te: 'స్థితి',
    },
    battery: {
      en: 'Battery',
      hi: 'बैटरी',
      mr: 'बॅटरी',
      te: 'బ్యాటరీ',
    },
    location: {
      en: 'Location',
      hi: 'स्थान',
      mr: 'स्थान',
      te: 'స్థానం',
    },
    operational: {
      en: 'Operational',
      hi: 'चालू',
      mr: 'कार्यरत',
      te: 'నిర్వహణలో',
    },
    standby: {
      en: 'Standby',
      hi: 'स्टैंडबाय',
      mr: 'स्टँडबाय',
      te: 'స్టాండ్‌బై',
    },
    error: {
      en: 'Error',
      hi: 'त्रुटि',
      mr: 'त्रुटी',
      te: 'లోపం',
    },
    offline: {
      en: 'Offline',
      hi: 'ऑफलाइन',
      mr: 'ऑफलाइन',
      te: 'ఆఫ్‌లైన్',
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
    },
    operation: {
      en: 'Operation',
      hi: 'ऑपरेशन',
      mr: 'ऑपरेशन',
      te: 'ఆపరేషన్',
    }
  };

  const getStatusTranslation = (status) => {
    return translations[status] ? translations[status][language] : status;
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className || ''}`}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        {translations.status[language]}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-4">
          {/* Status indicators */}
          <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500 mb-1">{translations.status[language]}</div>
              <StatusIndicator 
                status={tractorStatus.status} 
                label={getStatusTranslation(tractorStatus.status)} 
              />
            </div>
            
            {tractorStatus.operationMode && (
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">{translations.operation[language]}</div>
                <div className="font-medium">
                  {getStatusTranslation(tractorStatus.operationMode)}
                </div>
              </div>
            )}
          </div>

          {/* Battery status */}
          <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500 mb-1">{translations.battery[language]}</div>
              <div className="flex items-center">
                <BatteryIndicator 
                  level={tractorStatus.batteryLevel} 
                  isCharging={tractorStatus.isCharging}
                  estimatedRuntime={tractorStatus.estimatedRuntime}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Map visualization */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-500 mb-2">{translations.location[language]}</div>
          <Map className="h-40" />
        </div>
      </div>
    </div>
  );
};

export default StatusOverview;