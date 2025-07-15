import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// [REFERENCE-ONLY] This file is for Figma design reference. It may not build or run. See README/rules.md.
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
const jobs = [
    { id: '#318', title: 'Roof Repair', type: 'repair', date: 11, month: 6, year: 2025 }, // July 11, 2025 (current day)
    { id: '#319', title: 'Inspection', type: 'estimate', date: 15, month: 6, year: 2025 }, // July 15, 2025
    { id: '#320', title: 'Installation', type: 'install', date: 22, month: 6, year: 2025 }, // July 22, 2025
    { id: '#321', title: 'Cleaning', type: 'cleaning', date: 8, month: 6, year: 2025 }, // July 8, 2025
    { id: '#322', title: 'Repair', type: 'repair', date: 25, month: 6, year: 2025 }, // July 25, 2025
    { id: '#323', title: 'Inspection', type: 'estimate', date: 5, month: 7, year: 2025 }, // August 5, 2025
    { id: '#324', title: 'Installation', type: 'install', date: 12, month: 7, year: 2025 }, // August 12, 2025
    { id: '#325', title: 'Cleaning', type: 'cleaning', date: 18, month: 7, year: 2025 }, // August 18, 2025
    { id: '#326', title: 'Repair', type: 'repair', date: 3, month: 8, year: 2025 }, // September 3, 2025
    { id: '#327', title: 'Inspection', type: 'estimate', date: 10, month: 8, year: 2025 }, // September 10, 2025
    { id: '#328', title: 'Installation', type: 'install', date: 20, month: 8, year: 2025 }, // September 20, 2025
];
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
export function JobsCalendar() {
    // Initialize with July 2025 as current month
    const [currentMonth, setCurrentMonth] = useState(6); // July is month 6 (0-based)
    const [currentYear, setCurrentYear] = useState(2025);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // Today's date - July 11, 2025
    const today = new Date(2025, 6, 11); // July 11, 2025
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    // Create calendar grid
    const calendarDays = [];
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        calendarDays.push({
            date: daysInPrevMonth - i,
            isCurrentMonth: false,
            isNextMonth: false,
            isPrevMonth: true,
        });
    }
    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
        calendarDays.push({
            date,
            isCurrentMonth: true,
            isNextMonth: false,
            isPrevMonth: false,
        });
    }
    // Next month days to fill the grid
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
        return jobs.filter(job => job.date === date &&
            job.month === currentMonth &&
            job.year === currentYear);
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
        setCurrentMonth(todayMonth);
        setCurrentYear(todayYear);
    };
    const isToday = (date, isCurrentMonth) => {
        return isCurrentMonth &&
            date === todayDate &&
            currentMonth === todayMonth &&
            currentYear === todayYear;
    };
    return (_jsxs("div", { className: "rounded-lg border border-gray-200 overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("h2", { className: "text-xl font-semibold text-gray-900", children: [monthNames[currentMonth], " ", currentYear] }), _jsx(Button, { variant: "outline", size: "sm", onClick: goToToday, className: "text-sm", children: "Today" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => navigateMonth('prev'), disabled: currentYear === 2025 && currentMonth === 6 }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => navigateMonth('next') })] })] }), _jsx("div", { className: "grid grid-cols-7 border-b border-gray-200 bg-gray-50", children: daysOfWeek.map((day) => (_jsx("div", { className: "p-4 text-center font-medium text-gray-700 border-r border-gray-200 last:border-r-0", children: day }, day))) }), _jsx("div", { className: "grid grid-cols-7", children: calendarDays.map((day, index) => {
                    const dayJobs = getJobsForDate(day.date, day.isCurrentMonth);
                    const isTodayDate = isToday(day.date, day.isCurrentMonth);
                    return (_jsx("div", { className: `min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'} ${isTodayDate ? 'bg-blue-50 ring-2 ring-blue-200' : ''}`, children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("span", { className: `text-sm mb-2 ${!day.isCurrentMonth ? 'text-gray-400' :
                                        isTodayDate ? 'text-blue-700 font-semibold' : 'text-gray-900'}`, children: [day.date, isTodayDate && (_jsx("span", { className: "ml-1 text-xs bg-blue-600 text-white px-1 py-0.5 rounded", children: "Today" }))] }), _jsx("div", { className: "flex-1 space-y-1", children: dayJobs.map((job) => (_jsxs(Badge, { variant: "outline", className: `text-xs px-2 py-1 block truncate ${getJobColor(job.type)}`, children: [job.id, " - ", job.title] }, job.id))) })] }) }, index));
                }) }), _jsx("div", { className: "p-4 bg-gray-50 border-t border-gray-200", children: _jsxs("div", { className: "flex items-center space-x-6 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 bg-blue-100 border border-blue-200 rounded" }), _jsx("span", { className: "text-gray-700", children: "Repair" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 bg-indigo-100 border border-indigo-200 rounded" }), _jsx("span", { className: "text-gray-700", children: "Estimate" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 bg-orange-100 border border-orange-200 rounded" }), _jsx("span", { className: "text-gray-700", children: "Install" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 bg-purple-100 border border-purple-200 rounded" }), _jsx("span", { className: "text-gray-700", children: "Cleaning" })] })] }) })] }));
}
