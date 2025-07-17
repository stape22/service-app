import React from 'react';
export interface JobData {
    id: string;
    date: string;
    jobType: string;
    status: 'scheduled' | 'to-schedule' | 'completed' | 'in-progress';
    roofer: string;
    address: string;
    customer: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    estimatedCost?: number;
}
interface JobsTableProps {
    onEditJob?: (jobId: string) => void;
    onDeleteJob?: (jobId: string) => void;
    jobs?: JobData[];
}
export declare const JobsTable: React.FC<JobsTableProps>;
export {};
