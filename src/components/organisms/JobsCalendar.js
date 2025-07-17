import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    return (_jsxs("div", { className: "rounded-lg border border-gray-200 overflow-hidden", role: "application", "aria-label": "Jobs Calendar", children: [_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("h2", { className: "text-xl font-semibold text-gray-900", id: "calendar-title", children: [monthNames[currentMonth], " ", currentYear] }), _jsx(Button, { variant: "outline", size: "sm", onClick: goToToday, className: "text-sm", "aria-label": "Go to today", children: "Today" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => navigateMonth('prev'), "aria-label": "Previous month", children: _jsx(ChevronLeft, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => navigateMonth('next'), "aria-label": "Next month", children: _jsx(ChevronRight, { className: "h-4 w-4" }) })] })] }), _jsx("div", { className: "grid grid-cols-7 border-b border-gray-200 bg-gray-50", role: "rowgroup", "aria-label": "Days of the week", children: daysOfWeek.map((day) => (_jsx("div", { className: "p-4 text-center font-medium text-gray-700 border-r border-gray-200 last:border-r-0", role: "columnheader", children: day }, day))) }), _jsx("div", { className: "grid grid-cols-7", role: "grid", "aria-labelledby": "calendar-title", children: calendarDays.map((day, index) => {
                    const dayJobs = getJobsForDate(day.date, day.isCurrentMonth);
                    const isTodayDate = isToday(day.date, day.isCurrentMonth);
                    const dayLabel = `${monthNames[currentMonth]} ${day.date}, ${currentYear}`;
                    return (_jsx("div", { className: `min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'} ${isTodayDate ? 'bg-blue-50 ring-2 ring-blue-200' : ''}`, role: "gridcell", "aria-label": dayLabel, tabIndex: isTodayDate ? 0 : -1, children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("span", { className: `text-sm mb-2 ${!day.isCurrentMonth ? 'text-gray-400' :
                                        isTodayDate ? 'text-blue-700 font-semibold' : 'text-gray-900'}`, children: [day.date, isTodayDate && (_jsx("span", { className: "ml-1 text-xs bg-blue-600 text-white px-1 py-0.5 rounded", "aria-label": "Today", children: "Today" }))] }), _jsx("div", { className: "flex-1 space-y-1", children: dayJobs.map((job) => (_jsxs(Badge, { variant: "outline", className: `text-xs px-2 py-1 block truncate ${getJobColor(job.type)}`, "aria-label": `${job.type} job: ${job.title}`, children: [job.id, " - ", job.title] }, job.id))) })] }) }, index));
                }) }), _jsx("div", { className: "p-4 bg-gray-50 border-t border-gray-200", role: "region", "aria-label": "Job type legend", children: _jsxs("div", { className: "flex items-center space-x-6 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 bg-blue-100 border border-blue-200 rounded", "aria-hidden": "true" }), _jsx("span", { className: "text-gray-700", children: "Repair" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 bg-indigo-100 border border-indigo-200 rounded", "aria-hidden": "true" }), _jsx("span", { className: "text-gray-700", children: "Estimate" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 bg-orange-100 border border-orange-200 rounded", "aria-hidden": "true" }), _jsx("span", { className: "text-gray-700", children: "Install" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 bg-purple-100 border border-purple-200 rounded", "aria-hidden": "true" }), _jsx("span", { className: "text-gray-700", children: "Cleaning" })] })] }) })] }));
};
export default JobsCalendar;
