// [REFERENCE-ONLY] This file is for Figma design reference. It may not build or run. See README/rules.md.
// import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

interface AddCustomerProps {
  onBack: () => void;
}

// Available roofers from the roofers list
const availableRoofers = [
  'Michael Rodriguez',
  'Sarah Johnson',
  'David Thompson',
  'Jennifer Martinez',
  'Robert Wilson'
];

export function AddCustomer({ onBack }: AddCustomerProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    customerType: 'residential',
    taxId: '',
    preferredContactMethod: 'email',
    notes: '',
    sendWelcomeEmail: false
  });

  const [assignedRoofer, setAssignedRoofer] = useState<string>('none');
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', fullName: '', email: '', phone: '', role: '' }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (id: string, field: string, value: string) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  const addContact = () => {
    const newContact: Contact = {
      id: Date.now().toString(),
      fullName: '',
      email: '',
      phone: '',
      role: ''
    };
    setContacts(prev => [...prev, newContact]);
  };

  const removeContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleSubmit = () => {
    // Handle form submission
    const finalAssignedRoofer = assignedRoofer === 'none' ? null : assignedRoofer;
    console.log('Form data:', formData);
    console.log('Assigned roofer:', finalAssignedRoofer);
    console.log('Contacts:', contacts);
    onBack(); // Navigate back to customers list
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="px-2 py-8 pb-24">
        <div className="max-w-full mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Add Customer</h1>
              <p className="text-gray-600 mt-1">Create a new customer profile in the system</p>
            </div>
            <Button variant="outline" onClick={onBack}>
              Back to Customers List
            </Button>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Customer Name */}
              <div>
                <Label htmlFor="customerName" className="text-gray-700">
                  Customer Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customerName"
                  placeholder="Enter customer name"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Email Address */}
              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phone" className="text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="mb-6">
              <Label className="text-gray-700 mb-3 block">Address</Label>
              <div className="space-y-4">
                <Input
                  placeholder="Street Address"
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                  <Input
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                  <Input
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Customer Type and Tax ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {/* Customer Type */}
              <div>
                <Label className="text-gray-700 mb-3 block">Customer Type</Label>
                <RadioGroup
                  value={formData.customerType}
                  onValueChange={(value) => handleInputChange('customerType', value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="residential" id="residential" />
                    <Label htmlFor="residential" className="text-gray-700 cursor-pointer">Residential</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="commercial" id="commercial" />
                    <Label htmlFor="commercial" className="text-gray-700 cursor-pointer">Commercial</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Tax ID */}
              <div>
                <Label htmlFor="taxId" className="text-gray-700 mb-3 block">
                  Tax ID {formData.customerType === 'commercial' && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id="taxId"
                  placeholder="Enter tax ID number"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                />
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div className="mb-6">
              <Label className="text-gray-700 mb-3 block">Preferred Contact Method</Label>
              <RadioGroup
                value={formData.preferredContactMethod}
                onValueChange={(value) => handleInputChange('preferredContactMethod', value)}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="contact-email" />
                  <Label htmlFor="contact-email" className="text-gray-700 cursor-pointer">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="contact-phone" />
                  <Label htmlFor="contact-phone" className="text-gray-700 cursor-pointer">Phone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="contact-text" />
                  <Label htmlFor="contact-text" className="text-gray-700 cursor-pointer">Text Message</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Assign Roofer Section */}
            <div className="mb-6">
              <Label className="text-gray-700 mb-3 block">Assign Roofer</Label>
              <Select value={assignedRoofer} onValueChange={setAssignedRoofer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a roofer (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No roofer assigned</SelectItem>
                  {availableRoofers.map((roofer) => (
                    <SelectItem key={roofer} value={roofer}>
                      {roofer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <Label htmlFor="notes" className="text-gray-700 mb-2 block">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional information about this customer..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Send Welcome Email */}
            <div className="flex items-center space-x-2 mb-6">
              <Checkbox
                id="welcomeEmail"
                checked={formData.sendWelcomeEmail}
                onCheckedChange={(checked) => handleInputChange('sendWelcomeEmail', checked as boolean)}
              />
              <Label htmlFor="welcomeEmail" className="text-gray-700 cursor-pointer">
                Send welcome email with customer portal access
              </Label>
            </div>
          </div>

          {/* Contacts Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gray-900">Contact Persons</h2>
              <Button onClick={addContact} className="bg-blue-600 hover:bg-blue-700">
                Add Contact
              </Button>
            </div>

            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={contact.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  <div>
                    <Label className="text-gray-700 mb-2 block">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Enter full name"
                      value={contact.fullName}
                      onChange={(e) => handleContactChange(contact.id, 'fullName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 mb-2 block">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={contact.email}
                      onChange={(e) => handleContactChange(contact.id, 'email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 mb-2 block">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="(555) 123-4567"
                      value={contact.phone}
                      onChange={(e) => handleContactChange(contact.id, 'phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 mb-2 block">Role</Label>
                    <Input
                      placeholder="e.g., Manager, Owner"
                      value={contact.role}
                      onChange={(e) => handleContactChange(contact.id, 'role', e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    {contacts.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeContact(contact.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {/* <Trash2 className="w-4 h-4" /> */}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Footer with Form Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-4">
        <div className="max-w-full mx-auto flex justify-end space-x-4">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Add Customer
          </Button>
        </div>
      </div>
    </div>
  );
}