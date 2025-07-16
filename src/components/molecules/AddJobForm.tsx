import React, { useState, useEffect } from "react";
import { Button, Input, Label, Select, RadioGroup, Textarea, Popover, PopoverTrigger, PopoverContent, Calendar, Checkbox } from "../atoms";
import { format } from "date-fns";

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
  onSubmit?: (job: { formData: JobFormData; scheduledDate: Date | null; roofingSpecs: RoofingSpecsData }) => void;
}

const availableCustomers = [
  { name: 'John Smith', assignedRoofer: 'Michael Rodriguez', address: '123 Main Street, Springfield, IL 62701' },
  { name: 'ABC Corporation', assignedRoofer: 'Sarah Johnson', address: '456 Business Ave, Chicago, IL 60601' },
  { name: 'Maria Garcia', assignedRoofer: 'David Thompson', address: '789 Oak Drive, Peoria, IL 61602' },
  { name: 'Tech Solutions Inc.', assignedRoofer: null, address: '321 Corporate Blvd, Rockford, IL 61101' },
  { name: 'Robert Johnson', assignedRoofer: 'Jennifer Martinez', address: '654 Pine Street, Decatur, IL 62521' }
];

export const AddJobForm: React.FC<AddJobFormProps> = ({ onBack, initialJob, onSubmit }) => {
  const [formData, setFormData] = useState<JobFormData>(
    initialJob?.formData || {
      jobNumber: '',
      customer: '',
      jobType: 'repair',
      status: 'scheduled',
      priority: 'medium',
      estimatedCost: '',
      description: '',
      notes: '',
    }
  );
  const [scheduledDate, setScheduledDate] = useState<Date | null>(initialJob?.scheduledDate ?? null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [roofingSpecs, setRoofingSpecs] = useState<RoofingSpecsData>(
    initialJob?.roofingSpecs || {
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
    }
  );

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

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoofingSpecChange = (field: keyof RoofingSpecsData, value: string) => {
    setRoofingSpecs(prev => ({ ...prev, [field]: value }));
  };

  const handleStoryOptionChange = (option: string, checked: boolean) => {
    setRoofingSpecs(prev => ({
      ...prev,
      storyOptions: checked
        ? [...prev.storyOptions, option]
        : prev.storyOptions.filter(s => s !== option),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const jobData = {
      formData,
      scheduledDate,
      roofingSpecs,
    };
    if (onSubmit) {
      onSubmit(jobData);
    } else if (onBack) {
      // For MVP, just log the data
      // eslint-disable-next-line no-console
      console.log('Job data:', jobData);
      onBack();
    }
  };

  const selectedCustomer = availableCustomers.find(c => c.name === formData.customer);
  const assignedRoofer = selectedCustomer?.assignedRoofer;
  const customerAddress = selectedCustomer?.address;

  return (
    <form className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl mx-auto" onSubmit={handleSubmit}>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{initialJob ? 'Edit Job' : 'Add Job'}</h1>
          <p className="text-gray-600 mt-1">{initialJob ? 'Edit job details and save changes' : 'Create a new roofing job in the system'}</p>
        </div>
        <Button variant="outline" type="button" onClick={onBack}>
          Back to Jobs List
        </Button>
      </div>

      {/* Basic Job Information */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Number */}
        <div>
          <Label htmlFor="jobNumber" className="text-gray-700">
            Job Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="jobNumber"
            placeholder="Auto-generated"
            value={formData.jobNumber}
            onChange={e => handleInputChange('jobNumber', e.target.value)}
            className="mt-2"
          />
        </div>
        {/* Customer */}
        <div>
          <Label className="text-gray-700 mb-2 block">
            Customer <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.customer}
            onChange={e => handleInputChange('customer', e.target.value)}
            options={availableCustomers.map(customer => ({ label: customer.name, value: customer.name }))}
          />
        </div>
      </div>

      {/* Show Customer Address */}
      {formData.customer && customerAddress && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <Label className="text-gray-700 mb-2 block">Job Location</Label>
          <p className="text-sm text-gray-800">{customerAddress}</p>
          <p className="text-xs text-gray-500 mt-1">Job will be performed at customer's address</p>
        </div>
      )}

      {/* Show Assigned Roofer Info */}
      {formData.customer && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Label className="text-gray-700 mb-2 block">Assigned Roofer</Label>
          <p className="text-sm text-gray-600">
            {assignedRoofer ? (
              <>
                <span className="font-medium text-blue-800">{assignedRoofer}</span> is assigned to this customer
              </>
            ) : (
              <span className="text-amber-600">No roofer is currently assigned to this customer. Please assign a roofer to the customer first.</span>
            )}
          </p>
        </div>
      )}

      {/* Job Type */}
      <div className="mb-6">
        <RadioGroup
          label="Job Type"
          value={formData.jobType}
          onChange={value => handleInputChange('jobType', value)}
          options={[
            { label: "Estimate", value: "estimate" },
            { label: "Install", value: "install" },
            { label: "Repair", value: "repair" },
          ]}
        />
      </div>

      {/* Status */}
      <div className="mb-6">
        <RadioGroup
          label="Status"
          value={formData.status}
          onChange={value => handleInputChange('status', value)}
          options={[
            { label: "Scheduled", value: "scheduled" },
            { label: "In Progress", value: "in-progress" },
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
          ]}
        />
      </div>

      {/* Priority */}
      <div className="mb-6">
        <RadioGroup
          label="Priority"
          value={formData.priority}
          onChange={value => handleInputChange('priority', value)}
          options={[
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ]}
        />
      </div>

      {/* Estimated Cost */}
      <div className="mb-6">
        <Label htmlFor="estimatedCost" className="text-gray-700">
          Estimated Cost
        </Label>
        <Input
          id="estimatedCost"
          type="number"
          placeholder="Enter estimated cost"
          value={formData.estimatedCost}
          onChange={e => handleInputChange('estimatedCost', e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <Label htmlFor="description" className="text-gray-700">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Enter job description"
          value={formData.description}
          onChange={e => handleInputChange('description', e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Notes */}
      <div className="mb-6">
        <Label htmlFor="notes" className="text-gray-700">
          Notes
        </Label>
        <Textarea
          id="notes"
          placeholder="Additional notes (optional)"
          value={formData.notes}
          onChange={e => handleInputChange('notes', e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Scheduled Date */}
      <div className="mb-6">
        <Label className="text-gray-700 mb-2 block">Scheduled Date</Label>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={"w-full justify-start text-left font-normal " + (!scheduledDate ? "text-muted-foreground" : "")}
            >
              {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Calendar
              mode="single"
              selected={scheduledDate ?? undefined}
              onSelect={date => {
                setScheduledDate(date ?? null);
                setCalendarOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Roofing Specs (MVP) */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Roofing Specs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="gutterTotalFootage">Gutter Total Footage</Label>
            <Input
              id="gutterTotalFootage"
              value={roofingSpecs.gutterTotalFootage}
              onChange={e => handleRoofingSpecChange('gutterTotalFootage', e.target.value)}
              placeholder="e.g. 120"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="gutterType">Gutter Type</Label>
            <Input
              id="gutterType"
              value={roofingSpecs.gutterType}
              onChange={e => handleRoofingSpecChange('gutterType', e.target.value)}
              placeholder="e.g. K-style"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="gutterColor">Gutter Color</Label>
            <Input
              id="gutterColor"
              value={roofingSpecs.gutterColor}
              onChange={e => handleRoofingSpecChange('gutterColor', e.target.value)}
              placeholder="e.g. White"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="gutterSpecialtyItems">Gutter Specialty Items</Label>
            <Input
              id="gutterSpecialtyItems"
              value={roofingSpecs.gutterSpecialtyItems}
              onChange={e => handleRoofingSpecChange('gutterSpecialtyItems', e.target.value)}
              placeholder="e.g. Splash blocks"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="downspoutSize">Downspout Size</Label>
            <Input
              id="downspoutSize"
              value={roofingSpecs.downspoutSize}
              onChange={e => handleRoofingSpecChange('downspoutSize', e.target.value)}
              placeholder="e.g. 2x3"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="leafGuardSize">Leaf Guard Size</Label>
            <Input
              id="leafGuardSize"
              value={roofingSpecs.leafGuardSize}
              onChange={e => handleRoofingSpecChange('leafGuardSize', e.target.value)}
              placeholder="e.g. 5-inch"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="leafGuardTotalFootage">Leaf Guard Total Footage</Label>
            <Input
              id="leafGuardTotalFootage"
              value={roofingSpecs.leafGuardTotalFootage}
              onChange={e => handleRoofingSpecChange('leafGuardTotalFootage', e.target.value)}
              placeholder="e.g. 80"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="leafGuardType">Leaf Guard Type</Label>
            <Input
              id="leafGuardType"
              value={roofingSpecs.leafGuardType}
              onChange={e => handleRoofingSpecChange('leafGuardType', e.target.value)}
              placeholder="e.g. Mesh"
              className="mt-2"
            />
          </div>
        </div>
        <div className="mt-4">
          <Label className="block mb-2">Stories</Label>
          <div className="flex gap-4">
            {['1', '2', '3+'].map(option => (
              <label key={option} className="flex items-center gap-2">
                <Checkbox
                  checked={roofingSpecs.storyOptions.includes(option)}
                  onChange={e => handleStoryOptionChange(option, (e.target as HTMLInputElement).checked)}
                />
                <span>{option} Story</span>
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="crewCount">Crew Count</Label>
            <Input
              id="crewCount"
              value={roofingSpecs.crewCount}
              onChange={e => handleRoofingSpecChange('crewCount', e.target.value)}
              placeholder="e.g. 4"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="timeFrame">Time Frame</Label>
            <Input
              id="timeFrame"
              value={roofingSpecs.timeFrame}
              onChange={e => handleRoofingSpecChange('timeFrame', e.target.value)}
              placeholder="e.g. 2 days"
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* DrawingCanvas Placeholder (MVP) */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Drawing</h2>
        <div className="p-6 border border-dashed border-gray-300 rounded bg-gray-50 text-gray-400 text-center">
          Drawing feature coming soon (post-MVP)
        </div>
      </div>

      {/* PhotoUpload Placeholder (MVP) */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Photos</h2>
        <div className="p-6 border border-dashed border-gray-300 rounded bg-gray-50 text-gray-400 text-center">
          Photo upload feature coming soon (post-MVP)
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" variant="default">
          Save Job
        </Button>
      </div>
    </form>
  );
};
export default AddJobForm; 