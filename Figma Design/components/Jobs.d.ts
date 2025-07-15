export interface JobData {
    id: number;
    jobNumber: string;
    customerName: string;
    jobType: 'estimate' | 'install' | 'repair' | 'cleaning';
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    scheduledDate: string;
    estimatedCost: number;
    description: string;
}
interface JobsProps {
    onAddJob: () => void;
    onEditJob: (job: JobData) => void;
}
export declare function Jobs({ onAddJob, onEditJob }: JobsProps): import("react/jsx-runtime").JSX.Element;
export {};
