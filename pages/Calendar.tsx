import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Task } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from '../components/icons/Icons';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks] = useLocalStorage<Task[]>('tasks', []);

  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endOfMonth.getDay()));

  const calendarDays = [];
  let date = new Date(startDate);
  while (date <= endDate) {
    calendarDays.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const getTasksForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return tasks.filter(task => task.date === dateString);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="p-4 sm:p-0 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#ccd6f6]">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h1>
        <div className="flex items-center space-x-2">
          <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-[#112240] transition-colors">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-[#112240] transition-colors">
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-xs sm:text-sm font-semibold text-[#8892b0] pb-2 border-b-2 border-[#112240]">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => {
          const tasksOnDay = getTasksForDate(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          return (
            <div
              key={index}
              className={`relative h-24 sm:h-32 bg-[#112240] rounded-md p-2 flex flex-col transition-all duration-300 ${isCurrentMonth ? 'opacity-100' : 'opacity-40'}`}
            >
              <span className={`text-xs sm:text-sm font-semibold ${isToday(day) ? 'text-white bg-[#0a192f] rounded-full h-6 w-6 flex items-center justify-center' : 'text-[#8892b0]'}`}>
                {day.getDate()}
              </span>
              <div className="mt-1 overflow-y-auto text-xs space-y-1">
                {tasksOnDay.map(task => (
                  <div key={task.id} className="bg-[#0a192f] p-1 rounded text-[#ccd6f6] truncate">
                    {task.text}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}