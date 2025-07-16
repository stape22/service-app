import React from 'react';
export interface Job {
    id: string;
    title: string;
    type: 'estimate' | 'install' | 'repair' | 'cleaning';
    date: Date;
}
export interface JobsCalendarProps {
    jobs: Job[];
}
export declare const JobsCalendar: React.FC<JobsCalendarProps>;
