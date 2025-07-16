import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
const getJobColor = (type) => {
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
export const JobsCalendar = ({ jobs }) => {
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
    const getJobsForDate = (date, isCurrentMonth) => {
        if (!isCurrentMonth)
            return [];
        return jobs.filter(job => job.date.getDate() === date &&
            job.date.getMonth() === currentMonth &&
            job.date.getFullYear() === currentYear);
    };
    const navigateMonth = (direction) => {
        if (direction === 'prev') {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
            }
            else {
                setCurrentMonth(currentMonth - 1);
            }
        }
        else {
            if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
            }
            else {
                setCurrentMonth(currentMonth + 1);
            }
        }
    };
    const goToToday = () => {
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
    };
    const isToday = (date, isCurrentMonth) => {
        return isCurrentMonth &&
            date === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();
    };
    return (_jsxs("div", { className: "rounded-lg border border-gray-200 overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("h2", { className: "text-xl font-semibold text-gray-900", children: [monthNames[currentMonth], " ", currentYear] }), _jsx(Button, { variant: "outline", size: "sm", onClick: goToToday, className: "text-sm", children: "Today" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => navigateMonth('prev'), children: "\u2190" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => navigateMonth('next'), children: "\u2192" })] })] }), _jsx("div", { className: "grid grid-cols-7 border-b border-gray-200 bg-gray-50", children: daysOfWeek.map((day) => (_jsx("div", { className: "p-4 text-center font-medium text-gray-700 border-r border-gray-200 last:border-r-0", children: day }, day))) }), _jsx("div", { className: "grid grid-cols-7", children: calendarDays.map((day, index) => {
                    const dayJobs = getJobsForDate(day.date, day.isCurrentMonth);
                    const isTodayDate = isToday(day.date, day.isCurrentMonth);
                    return (_jsx("div", { className: `min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'} ${isTodayDate ? 'bg-blue-50 ring-2 ring-blue-200' : ''}`, children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsx("span", { className: `text-sm mb-2 ${!day.isCurrentMonth ? 'text-gray-400' : ''}`, children: day.date }), _jsx("div", { className: "flex flex-col gap-1", children: dayJobs.map(job => (_jsx(Badge, { className: `w-full px-2 py-1 border ${getJobColor(job.type)}`, variant: "secondary", children: job.title }, job.id))) })] }) }, index));
                }) })] }));
};
export default JobsCalendar;
