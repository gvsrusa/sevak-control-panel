import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import TaskCard from '../components/common/TaskCard';
import { TractorContext } from '../context/TractorContext';
import { LanguageContext } from '../context/LanguageContext';

const Schedule = () => {
  const { allTasks, addTask, updateTask, deleteTask } = useContext(TractorContext);
  const { language } = useContext(LanguageContext);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewMode, setViewMode] = useState('upcoming'); // 'upcoming', 'completed', 'all'

  const translations = {
    schedule: {
      en: 'Schedule',
      hi: 'अनुसूची',
      mr: 'वेळापत्रक',
      te: 'షెడ్యూల్',
    },
    newTask: {
      en: 'New Task',
      hi: 'नया कार्य',
      mr: 'नवीन कार्य',
      te: 'కొత్త పని',
    },
    upcoming: {
      en: 'Upcoming',
      hi: 'आने वाले',
      mr: 'आगामी',
      te: 'రాబోయే',
    },
    completed: {
      en: 'Completed',
      hi: 'पूर्ण',
      mr: 'पूर्ण झालेले',
      te: 'పూర్తయింది',
    },
    all: {
      en: 'All',
      hi: 'सभी',
      mr: 'सर्व',
      te: 'అన్నీ',
    },
    noTasks: {
      en: 'No tasks found',
      hi: 'कोई कार्य नहीं मिला',
      mr: 'कार्ये सापडली नाहीत',
      te: 'పనులు కనుగొనబడలేదు',
    },
    createFirstTask: {
      en: 'Create your first task',
      hi: 'अपना पहला कार्य बनाएँ',
      mr: 'आपले पहिले कार्य तयार करा',
      te: 'మీ మొదటి పనిని సృష్టించండి',
    },
    taskDetails: {
      en: 'Task Details',
      hi: 'कार्य विवरण',
      mr: 'कार्य तपशील',
      te: 'పని వివరాలు',
    }
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setShowNewTaskModal(true);
  };

  const handleStartTask = (taskId) => {
    console.log('Starting task', taskId);
    // Implementation would update task status
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = allTasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setSelectedTask(taskToEdit);
      setShowNewTaskModal(true);
    }
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  // Filter tasks based on view mode
  const filteredTasks = allTasks.filter(task => {
    if (viewMode === 'upcoming') {
      return task.status === 'scheduled';
    } else if (viewMode === 'completed') {
      return task.status === 'completed';
    }
    return true; // for 'all' view
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {translations.schedule[language]}
        </h1>
        <div className="flex gap-3">
          {filteredTasks.length === 0 && (
            <Button 
              onClick={handleNewTask}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
            >
              {translations.createFirstTask[language]}
            </Button>
          )}
          <Button 
            onClick={handleNewTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
          >
            {translations.newTask[language]}
          </Button>
        </div>
      </div>
      
      {/* View mode tabs */}
      <div className="flex border-b border-gray-200">
        {['upcoming', 'completed', 'all'].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`py-3 px-6 font-medium ${
              viewMode === mode
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {translations[mode][language]}
          </button>
        ))}
      </div>
      
      {/* Task list */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
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
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 mb-4">{translations.noTasks[language]}</p>
          </div>
        )}
      </div>
      
      {/* New/Edit Task Modal - In a real implementation, this would be a separate component */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-medium mb-4">
              {selectedTask ? translations.taskDetails[language] : translations.newTask[language]}
            </h2>
            
            {/* Form would go here */}
            <div className="mt-6 flex justify-end space-x-3">
              <Button 
                onClick={() => setShowNewTaskModal(false)}
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3"
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;