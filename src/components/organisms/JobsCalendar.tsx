import React, { useState } from 'react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type Job = {
  id: string;
  title: string;
  type: 'estimate' | 'install' | 'repair' | 'cleaning';
  date: Date;
};

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
    <div className="rounded-lg border border-gray-200 overflow-hidden" role="application" aria-label="Jobs Calendar">
      {/* Calendar Navigation Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900" id="calendar-title">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-sm"
            aria-label="Go to today"
          >
            Today
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('next')}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50" role="rowgroup" aria-label="Days of the week">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-4 text-center font-medium text-gray-700 border-r border-gray-200 last:border-r-0" role="columnheader">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7" role="grid" aria-labelledby="calendar-title">
        {calendarDays.map((day, index) => {
          const dayJobs = getJobsForDate(day.date, day.isCurrentMonth);
          const isTodayDate = isToday(day.date, day.isCurrentMonth);
          const dayLabel = `${monthNames[currentMonth]} ${day.date}, ${currentYear}`;
          
          return (
            <div
              key={index}
              className={`min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${
                !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
              } ${isTodayDate ? 'bg-blue-50 ring-2 ring-blue-200' : ''}`}
              role="gridcell"
              aria-label={dayLabel}
              tabIndex={isTodayDate ? 0 : -1}
            >
              <div className="flex flex-col h-full">
                <span className={`text-sm mb-2 ${
                  !day.isCurrentMonth ? 'text-gray-400' : 
                  isTodayDate ? 'text-blue-700 font-semibold' : 'text-gray-900'
                }`}>
                  {day.date}
                  {isTodayDate && (
                    <span className="ml-1 text-xs bg-blue-600 text-white px-1 py-0.5 rounded" aria-label="Today">
                      Today
                    </span>
                  )}
                </span>
                <div className="flex-1 space-y-1">
                  {dayJobs.map((job) => (
                    <Badge
                      key={job.id}
                      variant="outline"
                      className={`text-xs px-2 py-1 block truncate ${getJobColor(job.type)}`}
                      aria-label={`${job.type} job: ${job.title}`}
                    >
                      {job.id} - {job.title}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Calendar Legend */}
      <div className="p-4 bg-gray-50 border-t border-gray-200" role="region" aria-label="Job type legend">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded" aria-hidden="true"></div>
            <span className="text-gray-700">Repair</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-indigo-100 border border-indigo-200 rounded" aria-hidden="true"></div>
            <span className="text-gray-700">Estimate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-100 border border-orange-200 rounded" aria-hidden="true"></div>
            <span className="text-gray-700">Install</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-100 border border-purple-200 rounded" aria-hidden="true"></div>
            <span className="text-gray-700">Cleaning</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsCalendar; 