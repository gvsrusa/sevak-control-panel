import React from 'react';
import EmergencyStopButton from './EmergencyStopButton';

const PageContainer = ({ children }) => {
  return (
    <main className="flex-1 p-4 md:p-6 relative min-h-screen">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
      <div className="fixed bottom-6 right-6 md:hidden">
        <EmergencyStopButton size="large" />
      </div>
    </main>
  );
};

export default PageContainer;