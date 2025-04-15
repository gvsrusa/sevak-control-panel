import React, { useContext, useState } from 'react';
import ControlPad from '../components/common/ControlPad';
import BatteryIndicator from '../components/common/BatteryIndicator';
import StatusIndicator from '../components/common/StatusIndicator';
import OperationToggle from '../components/common/OperationToggle';
import Map from '../components/common/Map';
import EmergencyStopButton from '../components/layout/EmergencyStopButton';
import { TractorContext } from '../context/TractorContext';
import { LanguageContext } from '../context/LanguageContext';
import { OfflineContext } from '../context/OfflineContext';

const Control = () => {
  const { tractorStatus, sendDirectionCommand, sendSpeedCommand } = useContext(TractorContext);
  const { language } = useContext(LanguageContext);
  const { isOffline } = useContext(OfflineContext);
  const [activeTab, setActiveTab] = useState('manual'); // 'manual' or 'autonomous'

  const translations = {
    controlCenter: {
      en: 'Control Center',
      hi: 'नियंत्रण केंद्र',
      mr: 'नियंत्रण केंद्र',
      te: 'నియంత్రణ కేంద్రం',
    },
    manualControl: {
      en: 'Manual Control',
      hi: 'मैनुअल नियंत्रण',
      mr: 'मॅन्युअल नियंत्रण',
      te: 'మాన్యువల్ నియంత్రణ',
    },
    autonomousMode: {
      en: 'Autonomous Mode',
      hi: 'स्वायत्त मोड',
      mr: 'स्वायत्त मोड',
      te: 'స్వయంప్రతిపత్తి మోడ్',
    },
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
    offlineWarning: {
      en: 'Limited functionality in offline mode',
      hi: 'ऑफ़लाइन मोड में सीमित कार्यक्षमता',
      mr: 'ऑफलाइन मोडमध्ये मर्यादित कार्यक्षमता',
      te: 'ఆఫ్‌లైన్ మోడ్‌లో పరిమిత కార్యాచరణ',
    }
  };

  const getStatusTranslation = (status) => {
    return translations[status] ? translations[status][language] : status;
  };

  const handleDirectionChange = (direction) => {
    sendDirectionCommand(direction);
  };

  const handleSpeedChange = (speed) => {
    sendSpeedCommand(speed);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        {translations.controlCenter[language]}
      </h1>
      
      {/* Tab navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('manual')}
          className={`py-2 px-4 font-medium ${
            activeTab === 'manual'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {translations.manualControl[language]}
        </button>
        <button
          onClick={() => setActiveTab('autonomous')}
          className={`py-2 px-4 font-medium ${
            activeTab === 'autonomous'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {translations.autonomousMode[language]}
        </button>
      </div>
      
      {/* Status indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-500 mb-2">{translations.status[language]}</div>
          <StatusIndicator 
            status={tractorStatus.status} 
            label={getStatusTranslation(tractorStatus.status)} 
          />
          
          {isOffline && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-100 rounded text-xs text-yellow-700">
              {translations.offlineWarning[language]}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-500 mb-2">{translations.battery[language]}</div>
          <div className="flex justify-center">
            <BatteryIndicator 
              level={tractorStatus.batteryLevel} 
              isCharging={tractorStatus.isCharging}
              estimatedRuntime={tractorStatus.estimatedRuntime}
            />
          </div>
        </div>
        
        <div className="md:row-span-2 bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-500 mb-2">{translations.location[language]}</div>
          <Map className="h-52" />
        </div>
      </div>
      
      {/* Control Panel */}
      {activeTab === 'manual' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <ControlPad 
              onDirectionChange={handleDirectionChange}
              onSpeedChange={handleSpeedChange}
              disabled={isOffline || tractorStatus.status === 'error'}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <OperationToggle />
          </div>
          
          <div className="md:col-span-2 flex justify-center mt-2">
            <EmergencyStopButton className="h-16 w-40 text-lg" />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-4">
          {/* Autonomous mode controls would go here */}
          <div className="text-center py-12 text-gray-500">
            Autonomous mode functionality placeholder.
            <div className="mt-4">
              <EmergencyStopButton className="h-16 w-40 text-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Control;