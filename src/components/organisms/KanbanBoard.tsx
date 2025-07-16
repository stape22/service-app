import React, { useState } from 'react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

export interface Job {
  id: string;
  title: string;
  type: 'estimate' | 'install' | 'repair' | 'cleaning';
  date: Date;
}

export interface JobsCalendarProps {
  jobs: Job[];
}

const getJobColor = (type: Job['type']) => {
  switch (type) {
    case 'repair':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'estimate':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'install':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'cleaning':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const JobsCalendar: React.FC<JobsCalendarProps> = ({ jobs }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      date: daysInPrevMonth - i,
      isCurrentMonth: false,
      isNextMonth: false,
      isPrevMonth: true,
    });
  }
  for (let date = 1; date <= daysInMonth; date++) {
    calendarDays.push({
      date,
      isCurrentMonth: true,
      isNextMonth: false,
      isPrevMonth: false,
    });
  }
  const remainingDays = 42 - calendarDays.length;
  for (let date = 1; date <= remainingDays; date++) {
    calendarDays.push({
      date,
      isCurrentMonth: false,
      isNextMonth: true,
      isPrevMonth: false,
    });
  }

  const getJobsForDate = (date: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return [];
    return jobs.filter(job =>
      job.date.getDate() === date &&
      job.date.getMonth() === currentMonth &&
      job.date.getFullYear() === currentYear
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const isToday = (date: number, isCurrentMonth: boolean) => {
    return isCurrentMonth &&
      date === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Calendar Navigation Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-sm"
          >
            Today
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
          >
            &#8592;
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('next')}
          >
            &#8594;
          </Button>
        </div>
      </div>
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-4 text-center font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          const dayJobs = getJobsForDate(day.date, day.isCurrentMonth);
          const isTodayDate = isToday(day.date, day.isCurrentMonth);
          return (
            <div
              key={index}
              className={`min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${
                !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
              } ${isTodayDate ? 'bg-blue-50 ring-2 ring-blue-200' : ''}`}
            >
              <div className="flex flex-col h-full">
                <span className={`text-sm mb-2 ${!day.isCurrentMonth ? 'text-gray-400' : ''}`}>{day.date}</span>
                <div className="flex flex-col gap-1">
                  {dayJobs.map(job => (
                    <Badge key={job.id} className={`w-full px-2 py-1 border ${getJobColor(job.type)}`} variant="secondary">
                      {job.title}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 