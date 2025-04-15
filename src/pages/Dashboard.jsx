import React, { useContext } from 'react';
import StatusOverview from '../components/dashboard/StatusOverview';
import QuickActions from '../components/dashboard/QuickActions';
import TaskCard from '../components/common/TaskCard';
import { TractorContext } from '../context/TractorContext';
import { LanguageContext } from '../context/LanguageContext';

const Dashboard = () => {
  const { upcomingTasks } = useContext(TractorContext);
  const { language } = useContext(LanguageContext);

  const translations = {
    dashboard: {
      en: 'Dashboard',
      hi: 'डैशबोर्ड',
      mr: 'डॅशबोर्ड',
      te: 'డాష్‌బోర్డ్',
    },
    upcomingTasks: {
      en: 'Upcoming Tasks',
      hi: 'आने वाले कार्य',
      mr: 'येणारी कार्ये',
      te: 'రాబోయే పనులు',
    },
    viewAll: {
      en: 'View All',
      hi: 'सभी देखें',
      mr: 'सर्व पहा',
      te: 'అన్నీ చూడండి',
    },
    noTasks: {
      en: 'No upcoming tasks',
      hi: 'कोई आने वाला कार्य नहीं',
      mr: 'कोणतीही येणारी कार्ये नाहीत',
      te: 'రాబోయే పనులు లేవు',
    }
  };

  const handleStartTask = (taskId) => {
    console.log('Starting task', taskId);
    // Implementation would call the appropriate service
  };

  const handleEditTask = (taskId) => {
    console.log('Editing task', taskId);
    // Implementation would navigate to edit page with task ID
  };

  const handleDeleteTask = (taskId) => {
    console.log('Deleting task', taskId);
    // Implementation would call the appropriate service
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        {translations.dashboard[language]}
      </h1>
      
      <StatusOverview />
      
      <QuickActions />
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            {translations.upcomingTasks[language]}
          </h2>
          <a href="/schedule" className="text-blue-600 text-sm hover:text-blue-800">
            {translations.viewAll[language]}
          </a>
        </div>
        
        <div className="space-y-4">
          {upcomingTasks && upcomingTasks.length > 0 ? (
            upcomingTasks.slice(0, 3).map(task => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                type={task.type}
                status={task.status}
                scheduledTime={task.scheduledTime}
                duration={task.duration}
                recurring={task.recurring}
                onStart={handleStartTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {translations.noTasks[language]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;