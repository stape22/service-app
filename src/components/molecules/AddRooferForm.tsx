import React, { useState } from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { Button } from '../atoms/Button';
import { Checkbox } from '../atoms/Checkbox';
import { Textarea } from '../atoms/Textarea';

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface AddRooferFormProps {
  onBack: () => void;
  onSubmit?: (data: any) => void;
}

export const AddRooferForm: React.FC<AddRooferFormProps> = ({ onBack, onSubmit }) => {
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

  const handleInputChange = (field: string, value: string | boolean) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ ...formData, contacts });
    onBack();
  };

  return (
    <form className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl mx-auto" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Add Roofer</h1>
          <p className="text-gray-600 mt-1">Create a new roofer profile in the system</p>
        </div>
        <Button variant="outline" type="button" onClick={onBack}>
          Back to Roofers List
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
          <Input id="fullName" value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} className="mt-2" required />
        </div>
        <div>
          <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
          <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="mt-2" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
          <Input id="phone" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="mt-2" required />
        </div>
      </div>
      <div className="mb-6">
        <Label>Address</Label>
        <div className="space-y-4">
          <Input placeholder="Street Address" value={formData.streetAddress} onChange={e => handleInputChange('streetAddress', e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="City" value={formData.city} onChange={e => handleInputChange('city', e.target.value)} />
            <Input placeholder="State" value={formData.state} onChange={e => handleInputChange('state', e.target.value)} />
            <Input placeholder="Zip Code" value={formData.zipCode} onChange={e => handleInputChange('zipCode', e.target.value)} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <Label>Availability</Label>
          <div className="flex space-x-6 mt-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="availability" value="full-time" checked={formData.availability === 'full-time'} onChange={() => handleInputChange('availability', 'full-time')} />
              <span>Full-time</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="availability" value="part-time" checked={formData.availability === 'part-time'} onChange={() => handleInputChange('availability', 'part-time')} />
              <span>Part-time</span>
            </label>
          </div>
        </div>
        <div>
          <Label>Certifications</Label>
          <div className="flex space-x-6 mt-2">
            <label className="flex items-center space-x-2">
              <Checkbox checked={formData.certifications.licensed} onChange={e => handleCertificationChange('licensed', e.target.checked)} />
              <span>Licensed</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox checked={formData.certifications.insured} onChange={e => handleCertificationChange('insured', e.target.checked)} />
              <span>Insured</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox checked={formData.certifications.bonded} onChange={e => handleCertificationChange('bonded', e.target.checked)} />
              <span>Bonded</span>
            </label>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" value={formData.notes} onChange={e => handleInputChange('notes', e.target.value)} className="mt-2" />
      </div>
      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <Checkbox checked={formData.sendWelcomeEmail} onChange={e => handleInputChange('sendWelcomeEmail', e.target.checked)} />
          <span>Send welcome email to roofer</span>
        </label>
      </div>
      <div className="mb-6">
        <Label>Contacts</Label>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex flex-col md:flex-row md:items-center gap-2 border p-2 rounded">
              <Input placeholder="Full Name" value={contact.fullName} onChange={e => handleContactChange(contact.id, 'fullName', e.target.value)} className="md:w-1/3" />
              <Input placeholder="Email" value={contact.email} onChange={e => handleContactChange(contact.id, 'email', e.target.value)} className="md:w-1/3" />
              <Input placeholder="Phone" value={contact.phone} onChange={e => handleContactChange(contact.id, 'phone', e.target.value)} className="md:w-1/3" />
              {contacts.length > 1 && (
                <Button type="button" variant="danger" onClick={() => removeContact(contact.id)} className="md:ml-2">Remove</Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addContact}>Add Contact</Button>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onBack}>Cancel</Button>
        <Button type="submit" variant="default">Save Roofer</Button>
      </div>
    </form>
  );
}; 