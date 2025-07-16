import React from 'react';
export type Job = {
    id: string;
    title: string;
    type: 'estimate' | 'install' | 'repair' | 'cleaning';
    date: Date;
};
export interface JobsCalendarProps {
    jobs: Job[];
}
export declare const JobsCalendar: React.FC<JobsCalendarProps>;
export default JobsCalendar;
