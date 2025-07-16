import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { Button, Input, Label, Select, RadioGroup, Textarea, Popover, PopoverTrigger, PopoverContent, Calendar, Checkbox } from "../atoms";
import { format } from "date-fns";
const availableCustomers = [
    { name: 'John Smith', assignedRoofer: 'Michael Rodriguez', address: '123 Main Street, Springfield, IL 62701' },
    { name: 'ABC Corporation', assignedRoofer: 'Sarah Johnson', address: '456 Business Ave, Chicago, IL 60601' },
    { name: 'Maria Garcia', assignedRoofer: 'David Thompson', address: '789 Oak Drive, Peoria, IL 61602' },
    { name: 'Tech Solutions Inc.', assignedRoofer: null, address: '321 Corporate Blvd, Rockford, IL 61101' },
    { name: 'Robert Johnson', assignedRoofer: 'Jennifer Martinez', address: '654 Pine Street, Decatur, IL 62521' }
];
export const AddJobForm = ({ onBack, initialJob, onSubmit }) => {
    const [formData, setFormData] = useState(initialJob?.formData || {
        jobNumber: '',
        customer: '',
        jobType: 'repair',
        status: 'scheduled',
        priority: 'medium',
        estimatedCost: '',
        description: '',
        notes: '',
    });
    const [scheduledDate, setScheduledDate] = useState(initialJob?.scheduledDate ?? null);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [roofingSpecs, setRoofingSpecs] = useState(initialJob?.roofingSpecs || {
        gutterTotalFootage: '',
        gutterType: '',
        gutterColor: '',
        gutterSpecialtyItems: '',
        downspoutSize: '',
        leafGuardSize: '',
        leafGuardTotalFootage: '',
        leafGuardType: '',
        storyOptions: [],
        crewCount: '',
        timeFrame: '',
    });
    // Generate next job number (simplified for demo)
    const generateJobNumber = () => {
        const currentYear = new Date().getFullYear();
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `JOB-${currentYear}-${randomNum}`;
    };
    // Auto-generate job number if empty and not in edit mode
    useEffect(() => {
        if (!formData.jobNumber && !initialJob) {
            setFormData(prev => ({ ...prev, jobNumber: generateJobNumber() }));
        }
        // eslint-disable-next-line
    }, [initialJob]);
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    const handleRoofingSpecChange = (field, value) => {
        setRoofingSpecs(prev => ({ ...prev, [field]: value }));
    };
    const handleStoryOptionChange = (option, checked) => {
        setRoofingSpecs(prev => ({
            ...prev,
            storyOptions: checked
                ? [...prev.storyOptions, option]
                : prev.storyOptions.filter(s => s !== option),
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const jobData = {
            formData,
            scheduledDate,
            roofingSpecs,
        };
        if (onSubmit) {
            onSubmit(jobData);
        }
        else if (onBack) {
            // For MVP, just log the data
            // eslint-disable-next-line no-console
            console.log('Job data:', jobData);
            onBack();
        }
    };
    const selectedCustomer = availableCustomers.find(c => c.name === formData.customer);
    const assignedRoofer = selectedCustomer?.assignedRoofer;
    const customerAddress = selectedCustomer?.address;
    return (_jsxs("form", { className: "bg-white rounded-lg border border-gray-200 p-6 max-w-2xl mx-auto", onSubmit: handleSubmit, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: initialJob ? 'Edit Job' : 'Add Job' }), _jsx("p", { className: "text-gray-600 mt-1", children: initialJob ? 'Edit job details and save changes' : 'Create a new roofing job in the system' })] }), _jsx(Button, { variant: "outline", type: "button", onClick: onBack, children: "Back to Jobs List" })] }), _jsxs("div", { className: "mb-6 grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs(Label, { htmlFor: "jobNumber", className: "text-gray-700", children: ["Job Number ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "jobNumber", placeholder: "Auto-generated", value: formData.jobNumber, onChange: e => handleInputChange('jobNumber', e.target.value), className: "mt-2" })] }), _jsxs("div", { children: [_jsxs(Label, { className: "text-gray-700 mb-2 block", children: ["Customer ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Select, { value: formData.customer, onChange: e => handleInputChange('customer', e.target.value), options: availableCustomers.map(customer => ({ label: customer.name, value: customer.name })) })] })] }), formData.customer && customerAddress && (_jsxs("div", { className: "mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200", children: [_jsx(Label, { className: "text-gray-700 mb-2 block", children: "Job Location" }), _jsx("p", { className: "text-sm text-gray-800", children: customerAddress }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Job will be performed at customer's address" })] })), formData.customer && (_jsxs("div", { className: "mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200", children: [_jsx(Label, { className: "text-gray-700 mb-2 block", children: "Assigned Roofer" }), _jsx("p", { className: "text-sm text-gray-600", children: assignedRoofer ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "font-medium text-blue-800", children: assignedRoofer }), " is assigned to this customer"] })) : (_jsx("span", { className: "text-amber-600", children: "No roofer is currently assigned to this customer. Please assign a roofer to the customer first." })) })] })), _jsx("div", { className: "mb-6", children: _jsx(RadioGroup, { label: "Job Type", value: formData.jobType, onChange: value => handleInputChange('jobType', value), options: [
                        { label: "Estimate", value: "estimate" },
                        { label: "Install", value: "install" },
                        { label: "Repair", value: "repair" },
                    ] }) }), _jsx("div", { className: "mb-6", children: _jsx(RadioGroup, { label: "Status", value: formData.status, onChange: value => handleInputChange('status', value), options: [
                        { label: "Scheduled", value: "scheduled" },
                        { label: "In Progress", value: "in-progress" },
                        { label: "Completed", value: "completed" },
                        { label: "Cancelled", value: "cancelled" },
                    ] }) }), _jsx("div", { className: "mb-6", children: _jsx(RadioGroup, { label: "Priority", value: formData.priority, onChange: value => handleInputChange('priority', value), options: [
                        { label: "Low", value: "low" },
                        { label: "Medium", value: "medium" },
                        { label: "High", value: "high" },
                    ] }) }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { htmlFor: "estimatedCost", className: "text-gray-700", children: "Estimated Cost" }), _jsx(Input, { id: "estimatedCost", type: "number", placeholder: "Enter estimated cost", value: formData.estimatedCost, onChange: e => handleInputChange('estimatedCost', e.target.value), className: "mt-2" })] }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { htmlFor: "description", className: "text-gray-700", children: "Description" }), _jsx(Textarea, { id: "description", placeholder: "Enter job description", value: formData.description, onChange: e => handleInputChange('description', e.target.value), className: "mt-2" })] }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { htmlFor: "notes", className: "text-gray-700", children: "Notes" }), _jsx(Textarea, { id: "notes", placeholder: "Additional notes (optional)", value: formData.notes, onChange: e => handleInputChange('notes', e.target.value), className: "mt-2" })] }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { className: "text-gray-700 mb-2 block", children: "Scheduled Date" }), _jsxs(Popover, { open: calendarOpen, onOpenChange: setCalendarOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { type: "button", variant: "outline", className: "w-full justify-start text-left font-normal " + (!scheduledDate ? "text-muted-foreground" : ""), children: scheduledDate ? format(scheduledDate, "PPP") : "Pick a date" }) }), _jsx(PopoverContent, { className: "p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: scheduledDate ?? undefined, onSelect: date => {
                                        setScheduledDate(date ?? null);
                                        setCalendarOpen(false);
                                    }, initialFocus: true }) })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Roofing Specs" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "gutterTotalFootage", children: "Gutter Total Footage" }), _jsx(Input, { id: "gutterTotalFootage", value: roofingSpecs.gutterTotalFootage, onChange: e => handleRoofingSpecChange('gutterTotalFootage', e.target.value), placeholder: "e.g. 120", className: "mt-2" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "gutterType", children: "Gutter Type" }), _jsx(Input, { id: "gutterType", value: roofingSpecs.gutterType, onChange: e => handleRoofingSpecChange('gutterType', e.target.value), placeholder: "e.g. K-style", className: "mt-2" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "gutterColor", children: "Gutter Color" }), _jsx(Input, { id: "gutterColor", value: roofingSpecs.gutterColor, onChange: e => handleRoofingSpecChange('gutterColor', e.target.value), placeholder: "e.g. White", className: "mt-2" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "gutterSpecialtyItems", children: "Gutter Specialty Items" }), _jsx(Input, { id: "gutterSpecialtyItems", value: roofingSpecs.gutterSpecialtyItems, onChange: e => handleRoofingSpecChange('gutterSpecialtyItems', e.target.value), placeholder: "e.g. Splash blocks", className: "mt-2" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "downspoutSize", children: "Downspout Size" }), _jsx(Input, { id: "downspoutSize", value: roofingSpecs.downspoutSize, onChange: e => handleRoofingSpecChange('downspoutSize', e.target.value), placeholder: "e.g. 2x3", className: "mt-2" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "leafGuardSize", children: "Leaf Guard Size" }), _jsx(Input, { id: "leafGuardSize", value: roofingSpecs.leafGuardSize, onChange: e => handleRoofingSpecChange('leafGuardSize', e.target.value), placeholder: "e.g. 5-inch", className: "mt-2" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "leafGuardTotalFootage", children: "Leaf Guard Total Footage" }), _jsx(Input, { id: "leafGuardTotalFootage", value: roofingSpecs.leafGuardTotalFootage, onChange: e => handleRoofingSpecChange('leafGuardTotalFootage', e.target.value), placeholder: "e.g. 80", className: "mt-2" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "leafGuardType", children: "Leaf Guard Type" }), _jsx(Input, { id: "leafGuardType", value: roofingSpecs.leafGuardType, onChange: e => handleRoofingSpecChange('leafGuardType', e.target.value), placeholder: "e.g. Mesh", className: "mt-2" })] })] }), _jsxs("div", { className: "mt-4", children: [_jsx(Label, { className: "block mb-2", children: "Stories" }), _jsx("div", { className: "flex gap-4", children: ['1', '2', '3+'].map(option => (_jsxs("label", { className: "flex items-center gap-2", children: [_jsx(Checkbox, { checked: roofingSpecs.storyOptions.includes(option), onChange: e => handleStoryOptionChange(option, e.target.checked) }), _jsxs("span", { children: [option, " Story"] })] }, option))) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "crewCount", children: "Crew Count" }), _jsx(Input, { id: "crewCount", value: roofingSpecs.crewCount, onChange: e => handleRoofingSpecChange('crewCount', e.target.value), placeholder: "e.g. 4", className: "mt-2" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "timeFrame", children: "Time Frame" }), _jsx(Input, { id: "timeFrame", value: roofingSpecs.timeFrame, onChange: e => handleRoofingSpecChange('timeFrame', e.target.value), placeholder: "e.g. 2 days", className: "mt-2" })] })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Drawing" }), _jsx("div", { className: "p-6 border border-dashed border-gray-300 rounded bg-gray-50 text-gray-400 text-center", children: "Drawing feature coming soon (post-MVP)" })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Photos" }), _jsx("div", { className: "p-6 border border-dashed border-gray-300 rounded bg-gray-50 text-gray-400 text-center", children: "Photo upload feature coming soon (post-MVP)" })] }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "submit", variant: "default", children: "Save Job" }) })] }));
};
export default AddJobForm;
