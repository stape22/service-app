// [REFERENCE-ONLY] This file is for Figma design reference. It may not build or run. See README/rules.md.
// import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { DrawingCanvas } from "./DrawingCanvas";
import { PhotoUpload } from "./PhotoUpload";

interface AddJobProps {
  onBack: () => void;
}

interface PhotoData {
  id: string;
  file: File;
  url: string;
  category: 'before' | 'after';
  filename: string;
  size: number;
  uploadDate: string;
  description?: string;
}

// Available customers from the customers list with their addresses
const availableCustomers = [
  { name: 'John Smith', assignedRoofer: 'Michael Rodriguez', address: '123 Main Street, Springfield, IL 62701' },
  { name: 'ABC Corporation', assignedRoofer: 'Sarah Johnson', address: '456 Business Ave, Chicago, IL 60601' },
  { name: 'Maria Garcia', assignedRoofer: 'David Thompson', address: '789 Oak Drive, Peoria, IL 61602' },
  { name: 'Tech Solutions Inc.', assignedRoofer: null, address: '321 Corporate Blvd, Rockford, IL 61101' },
  { name: 'Robert Johnson', assignedRoofer: 'Jennifer Martinez', address: '654 Pine Street, Decatur, IL 62521' }
];

export function AddJob({ onBack }: AddJobProps) {
  const [formData, setFormData] = useState({
    jobNumber: '',
    customer: '',
    jobType: 'repair',
    status: 'scheduled',
    priority: 'medium',
    estimatedCost: '',
    description: '',
    notes: ''
  });

  // Roofing specification fields
  const [roofingSpecs, setRoofingSpecs] = useState({
    // Gutters
    gutterTotalFootage: '',
    gutterType: '',
    gutterColor: '',
    gutterSpecialtyItems: '',
    
    // Downspouts
    downspoutSize1: '',
    downspout1S1: '',
    downspout2S1: '',
    downspout3S1: '',
    downspoutSize2: '',
    downspout1S2: '',
    downspout2S2: '',
    downspout3S2: '',
    
    // Leaf Guard
    leafGuardSize: '',
    leafGuardTotalFootage: '',
    leafGuardType: '',
    
    // Details
    storyOptions: [] as string[],
    crewCount: '',
    timeFrame: ''
  });

  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [jobDrawing, setJobDrawing] = useState<string>('');
  const [jobPhotos, setJobPhotos] = useState<PhotoData[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRoofingSpecChange = (field: string, value: string) => {
    setRoofingSpecs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStoryOptionChange = (story: string, checked: boolean) => {
    setRoofingSpecs(prev => ({
      ...prev,
      storyOptions: checked 
        ? [...prev.storyOptions, story]
        : prev.storyOptions.filter(s => s !== story)
    }));
  };

  const handleDrawingSave = (drawing: string) => {
    setJobDrawing(drawing);
  };

  const handlePhotosChange = (photos: PhotoData[]) => {
    setJobPhotos(photos);
  };

  const handleSubmit = () => {
    // Handle form submission
    const jobData = {
      ...formData,
      scheduledDate: scheduledDate?.toISOString().split('T')[0] || '',
      estimatedCost: parseFloat(formData.estimatedCost) || 0,
      roofingSpecs,
      drawing: jobDrawing,
      photos: jobPhotos
    };
    console.log('Job data:', jobData);
    onBack(); // Navigate back to jobs list
  };

  // Generate next job number (simplified for demo)
  const generateJobNumber = () => {
    const currentYear = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `JOB-${currentYear}-${randomNum}`;
  };

  // Auto-generate job number if empty
  if (!formData.jobNumber) {
    setFormData(prev => ({ ...prev, jobNumber: generateJobNumber() }));
  }

  // Get selected customer details
  const selectedCustomer = availableCustomers.find(c => c.name === formData.customer);
  const assignedRoofer = selectedCustomer?.assignedRoofer;
  const customerAddress = selectedCustomer?.address;

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="px-6 lg:px-8 py-8 pb-24">
        <div className="max-w-full mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Add Job</h1>
              <p className="text-gray-600 mt-1">Create a new roofing job in the system</p>
            </div>
            <Button variant="outline" onClick={onBack}>
              Back to Jobs List
            </Button>
          </div>

          {/* Basic Job Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Job Number */}
              <div>
                <Label htmlFor="jobNumber" className="text-gray-700">
                  Job Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="jobNumber"
                  placeholder="Auto-generated"
                  value={formData.jobNumber}
                  onChange={(e) => handleInputChange('jobNumber', e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Customer */}
              <div>
                <Label className="text-gray-700 mb-2 block">
                  Customer <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.customer} onValueChange={(value) => handleInputChange('customer', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCustomers.map((customer) => (
                      <SelectItem key={customer.name} value={customer.name}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

            {/* Job Type, Status, Priority */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              {/* Job Type */}
              <div>
                <Label className="text-gray-700 mb-3 block">Job Type</Label>
                <RadioGroup
                  value={formData.jobType}
                  onValueChange={(value) => handleInputChange('jobType', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="estimate" id="estimate" />
                    <Label htmlFor="estimate" className="text-gray-700 cursor-pointer">Estimate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="install" id="install" />
                    <Label htmlFor="install" className="text-gray-700 cursor-pointer">Install</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="repair" id="repair" />
                    <Label htmlFor="repair" className="text-gray-700 cursor-pointer">Repair</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cleaning" id="cleaning" />
                    <Label htmlFor="cleaning" className="text-gray-700 cursor-pointer">Cleaning</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Status */}
              <div>
                <Label className="text-gray-700 mb-3 block">Status</Label>
                <RadioGroup
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled" className="text-gray-700 cursor-pointer">Scheduled</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-progress" id="in-progress" />
                    <Label htmlFor="in-progress" className="text-gray-700 cursor-pointer">In Progress</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="completed" id="completed" />
                    <Label htmlFor="completed" className="text-gray-700 cursor-pointer">Completed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cancelled" id="cancelled" />
                    <Label htmlFor="cancelled" className="text-gray-700 cursor-pointer">Cancelled</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Priority */}
              <div>
                <Label className="text-gray-700 mb-3 block">Priority</Label>
                <RadioGroup
                  value={formData.priority}
                  onValueChange={(value) => handleInputChange('priority', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low" className="text-gray-700 cursor-pointer">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="text-gray-700 cursor-pointer">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high" className="text-gray-700 cursor-pointer">High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent" className="text-gray-700 cursor-pointer">Urgent</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Scheduled Date and Estimated Cost */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Scheduled Date */}
              <div>
                <Label className="text-gray-700 mb-2 block">
                  Scheduled Date <span className="text-red-500">*</span>
                </Label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                      {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={(date) => {
                        setScheduledDate(date);
                        setIsCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Estimated Cost */}
              <div>
                <Label htmlFor="estimatedCost" className="text-gray-700 mb-2 block">
                  Estimated Cost <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="estimatedCost"
                    type="number"
                    placeholder="0.00"
                    value={formData.estimatedCost}
                    onChange={(e) => handleInputChange('estimatedCost', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <Label htmlFor="description" className="text-gray-700 mb-2 block">
                Job Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the work to be performed..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Notes */}
            <div className="mb-6">
              <Label htmlFor="notes" className="text-gray-700 mb-2 block">Internal Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any internal notes or special instructions..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Roofing Specifications */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Roofing Specifications</h2>
            
            {/* Gutters Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 underline">Gutters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="gutterTotalFootage" className="text-gray-700">Total Footage</Label>
                  <Input
                    id="gutterTotalFootage"
                    placeholder="e.g., 400'"
                    value={roofingSpecs.gutterTotalFootage}
                    onChange={(e) => handleRoofingSpecChange('gutterTotalFootage', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="gutterType" className="text-gray-700">Type</Label>
                  <Input
                    id="gutterType"
                    placeholder="e.g., 6''"
                    value={roofingSpecs.gutterType}
                    onChange={(e) => handleRoofingSpecChange('gutterType', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="gutterColor" className="text-gray-700">Color</Label>
                  <Input
                    id="gutterColor"
                    placeholder="e.g., Buckskin → Current By H/O"
                    value={roofingSpecs.gutterColor}
                    onChange={(e) => handleRoofingSpecChange('gutterColor', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="gutterSpecialtyItems" className="text-gray-700">Specialty Items</Label>
                  <Input
                    id="gutterSpecialtyItems"
                    placeholder="e.g., T-STRAPS"
                    value={roofingSpecs.gutterSpecialtyItems}
                    onChange={(e) => handleRoofingSpecChange('gutterSpecialtyItems', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Downspouts Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 underline">Downspouts</h3>
              
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <Label htmlFor="downspoutSize1" className="text-gray-700">Size</Label>
                  <Input
                    id="downspoutSize1"
                    placeholder="e.g., 3x4"
                    value={roofingSpecs.downspoutSize1}
                    onChange={(e) => handleRoofingSpecChange('downspoutSize1', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="downspout1S1" className="text-gray-700">1S</Label>
                  <Input
                    id="downspout1S1"
                    placeholder="0"
                    value={roofingSpecs.downspout1S1}
                    onChange={(e) => handleRoofingSpecChange('downspout1S1', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="downspout2S1" className="text-gray-700">2S</Label>
                  <Input
                    id="downspout2S1"
                    placeholder="0"
                    value={roofingSpecs.downspout2S1}
                    onChange={(e) => handleRoofingSpecChange('downspout2S1', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="downspout3S1" className="text-gray-700">3S</Label>
                  <Input
                    id="downspout3S1"
                    placeholder="0"
                    value={roofingSpecs.downspout3S1}
                    onChange={(e) => handleRoofingSpecChange('downspout3S1', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="downspoutSize2" className="text-gray-700">Size</Label>
                  <Input
                    id="downspoutSize2"
                    placeholder="Size"
                    value={roofingSpecs.downspoutSize2}
                    onChange={(e) => handleRoofingSpecChange('downspoutSize2', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="downspout1S2" className="text-gray-700">1S</Label>
                  <Input
                    id="downspout1S2"
                    placeholder="0"
                    value={roofingSpecs.downspout1S2}
                    onChange={(e) => handleRoofingSpecChange('downspout1S2', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="downspout2S2" className="text-gray-700">2S</Label>
                  <Input
                    id="downspout2S2"
                    placeholder="0"
                    value={roofingSpecs.downspout2S2}
                    onChange={(e) => handleRoofingSpecChange('downspout2S2', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="downspout3S2" className="text-gray-700">3S</Label>
                  <Input
                    id="downspout3S2"
                    placeholder="0"
                    value={roofingSpecs.downspout3S2}
                    onChange={(e) => handleRoofingSpecChange('downspout3S2', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Leaf Guard Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 underline">Leaf Guard</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="leafGuardSize" className="text-gray-700">Size</Label>
                  <Input
                    id="leafGuardSize"
                    placeholder="e.g., 6''"
                    value={roofingSpecs.leafGuardSize}
                    onChange={(e) => handleRoofingSpecChange('leafGuardSize', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="leafGuardTotalFootage" className="text-gray-700">Total Footage</Label>
                  <Input
                    id="leafGuardTotalFootage"
                    placeholder="e.g., 400'"
                    value={roofingSpecs.leafGuardTotalFootage}
                    onChange={(e) => handleRoofingSpecChange('leafGuardTotalFootage', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="leafGuardType" className="text-gray-700">Type</Label>
                  <Input
                    id="leafGuardType"
                    placeholder="e.g., Roll"
                    value={roofingSpecs.leafGuardType}
                    onChange={(e) => handleRoofingSpecChange('leafGuardType', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 underline">Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Story Options */}
                <div>
                  <Label className="text-gray-700 mb-3 block">Building Stories</Label>
                  <div className="space-y-2">
                    {['1 Story', '2 Story', '3 Story'].map((story) => (
                      <div key={story} className="flex items-center space-x-2">
                        <Checkbox
                          id={story.replace(' ', '')}
                          checked={roofingSpecs.storyOptions.includes(story)}
                          onCheckedChange={(checked) => handleStoryOptionChange(story, checked as boolean)}
                        />
                        <Label htmlFor={story.replace(' ', '')} className="text-gray-700 cursor-pointer">
                          {story}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Crew and Time Frame */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="crewCount" className="text-gray-700"># of Crew</Label>
                    <Input
                      id="crewCount"
                      placeholder="Number of crew members"
                      value={roofingSpecs.crewCount}
                      onChange={(e) => handleRoofingSpecChange('crewCount', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeFrame" className="text-gray-700">Time Frame</Label>
                    <Input
                      id="timeFrame"
                      placeholder="Expected completion time"
                      value={roofingSpecs.timeFrame}
                      onChange={(e) => handleRoofingSpecChange('timeFrame', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="mb-6">
            <PhotoUpload onPhotosChange={handlePhotosChange} />
          </div>

          {/* Drawing & Notes Section */}
          <div className="mb-6">
            <DrawingCanvas onSave={handleDrawingSave} />
          </div>
        </div>
      </main>

      {/* Fixed Footer with Form Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 lg:px-8 py-4">
        <div className="max-w-full mx-auto flex justify-end space-x-4">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Create Job
          </Button>
        </div>
      </div>
    </div>
  );
}