import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Trash2 } from "lucide-react";

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface AddRooferProps {
  onBack: () => void;
}

export function AddRoofer({ onBack }: AddRooferProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    availability: 'full-time',
    certifications: {
      licensed: false,
      insured: false,
      bonded: false
    },
    notes: '',
    sendWelcomeEmail: false
  });

  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', fullName: '', email: '', phone: '' }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCertificationChange = (cert: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      certifications: {
        ...prev.certifications,
        [cert]: checked
      }
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
      phone: ''
    };
    setContacts(prev => [...prev, newContact]);
  };

  const removeContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form data:', formData);
    console.log('Contacts:', contacts);
    onBack(); // Navigate back to roofers list
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="px-2 py-8 pb-24">
        <div className="max-w-full mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Add Roofer</h1>
              <p className="text-gray-600 mt-1">Create a new roofer profile in the system</p>
            </div>
            <Button variant="outline" onClick={onBack}>
              Back to Roofers List
            </Button>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
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

            {/* Availability and Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {/* Availability */}
              <div>
                <Label className="text-gray-700 mb-3 block">Availability</Label>
                <RadioGroup
                  value={formData.availability}
                  onValueChange={(value) => handleInputChange('availability', value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full-time" id="full-time" />
                    <Label htmlFor="full-time" className="text-gray-700 cursor-pointer">Full-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="part-time" id="part-time" />
                    <Label htmlFor="part-time" className="text-gray-700 cursor-pointer">Part-time</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Certifications */}
              <div>
                <Label className="text-gray-700 mb-3 block">Certifications</Label>
                <div className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="licensed"
                      checked={formData.certifications.licensed}
                      onCheckedChange={(checked) => handleCertificationChange('licensed', checked as boolean)}
                    />
                    <Label htmlFor="licensed" className="text-gray-700 cursor-pointer">Licensed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="insured"
                      checked={formData.certifications.insured}
                      onCheckedChange={(checked) => handleCertificationChange('insured', checked as boolean)}
                    />
                    <Label htmlFor="insured" className="text-gray-700 cursor-pointer">Insured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bonded"
                      checked={formData.certifications.bonded}
                      onCheckedChange={(checked) => handleCertificationChange('bonded', checked as boolean)}
                    />
                    <Label htmlFor="bonded" className="text-gray-700 cursor-pointer">Bonded</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <Label htmlFor="notes" className="text-gray-700 mb-2 block">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional information about this roofer..."
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
                Send welcome email with login credentials
              </Label>
            </div>
          </div>

          {/* Contacts Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gray-900">Contacts</h2>
              <Button onClick={addContact} className="bg-blue-600 hover:bg-blue-700">
                Add Contact
              </Button>
            </div>

            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={contact.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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
                  <div className="flex justify-end">
                    {contacts.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeContact(contact.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
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
            Add Roofer
          </Button>
        </div>
      </div>
    </div>
  );
}