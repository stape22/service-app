import React from "react";
interface JobFormData {
    jobNumber: string;
    customer: string;
    jobType: string;
    status: string;
    priority: string;
    estimatedCost: string;
    description: string;
    notes: string;
}
interface RoofingSpecsData {
    gutterTotalFootage: string;
    gutterType: string;
    gutterColor: string;
    gutterSpecialtyItems: string;
    downspoutSize: string;
    leafGuardSize: string;
    leafGuardTotalFootage: string;
    leafGuardType: string;
    storyOptions: string[];
    crewCount: string;
    timeFrame: string;
}
interface AddJobFormProps {
    onBack: () => void;
    initialJob?: {
        formData: JobFormData;
        scheduledDate: Date | null;
        roofingSpecs: RoofingSpecsData;
    };
    onSubmit?: (job: {
        formData: JobFormData;
        scheduledDate: Date | null;
        roofingSpecs: RoofingSpecsData;
    }) => void;
}
export declare const AddJobForm: React.FC<AddJobFormProps>;
export default AddJobForm;
