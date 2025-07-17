import React, { useState } from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { Button } from '../atoms/Button';
import { Textarea } from '../atoms/Textarea';
import { Checkbox } from '../atoms/Checkbox';

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

export interface AddCustomerFormProps {
  onBack: () => void;
  onSubmit?: (data: any) => void;
  availableRoofers?: string[];
}

export const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ onBack, onSubmit, availableRoofers = [] }) => {
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
    sendWelcomeEmail: false,
    assignedRoofer: '',
  });
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', fullName: '', email: '', phone: '', role: '' }
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.customerName) newErrors.customerName = 'Customer name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (onSubmit) onSubmit({ ...formData, contacts });
    onBack();
  };

  return (
    <form className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl mx-auto" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Add Customer</h1>
          <p className="text-gray-600 mt-1">Create a new customer profile in the system</p>
        </div>
        <Button variant="outline" type="button" onClick={onBack}>
          Back to Customers List
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <Label htmlFor="customerName">Customer Name <span className="text-red-500">*</span></Label>
          <Input id="customerName" value={formData.customerName} onChange={e => handleInputChange('customerName', e.target.value)} className="mt-2" required />
          {errors.customerName && <div className="text-red-500 text-sm mt-1">{errors.customerName}</div>}
        </div>
        <div>
          <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
          <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="mt-2" required />
          {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
        </div>
        <div>
          <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
          <Input id="phone" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="mt-2" required />
          {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
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
          <Label>Customer Type</Label>
          <div className="flex space-x-6 mt-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="customerType" value="residential" checked={formData.customerType === 'residential'} onChange={() => handleInputChange('customerType', 'residential')} />
              <span>Residential</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="customerType" value="commercial" checked={formData.customerType === 'commercial'} onChange={() => handleInputChange('customerType', 'commercial')} />
              <span>Commercial</span>
            </label>
          </div>
        </div>
        <div>
          <Label htmlFor="taxId">Tax ID</Label>
          <Input id="taxId" value={formData.taxId} onChange={e => handleInputChange('taxId', e.target.value)} className="mt-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <Label>Preferred Contact Method</Label>
          <div className="flex space-x-6 mt-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="preferredContactMethod" value="email" checked={formData.preferredContactMethod === 'email'} onChange={() => handleInputChange('preferredContactMethod', 'email')} />
              <span>Email</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="preferredContactMethod" value="phone" checked={formData.preferredContactMethod === 'phone'} onChange={() => handleInputChange('preferredContactMethod', 'phone')} />
              <span>Phone</span>
            </label>
          </div>
        </div>
        <div>
          <Label htmlFor="assignedRoofer">Assigned Roofer</Label>
          <select
            id="assignedRoofer"
            value={formData.assignedRoofer}
            onChange={e => handleInputChange('assignedRoofer', e.target.value)}
            className="mt-2 border rounded px-2 py-1 w-full"
          >
            <option value="">None</option>
            {availableRoofers.map((roofer, idx) => (
              <option key={idx} value={roofer}>{roofer}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-6">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" value={formData.notes} onChange={e => handleInputChange('notes', e.target.value)} className="mt-2" />
      </div>
      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <Checkbox checked={formData.sendWelcomeEmail} onChange={e => handleInputChange('sendWelcomeEmail', e.target.checked)} />
          <span>Send welcome email to customer</span>
        </label>
      </div>
      <div className="mb-6">
        <Label>Contacts</Label>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex flex-col md:flex-row md:items-center gap-2 border p-2 rounded">
              <Input placeholder="Full Name" value={contact.fullName} onChange={e => handleContactChange(contact.id, 'fullName', e.target.value)} className="md:w-1/4" />
              <Input placeholder="Email" value={contact.email} onChange={e => handleContactChange(contact.id, 'email', e.target.value)} className="md:w-1/4" />
              <Input placeholder="Phone" value={contact.phone} onChange={e => handleContactChange(contact.id, 'phone', e.target.value)} className="md:w-1/4" />
              <Input placeholder="Role" value={contact.role} onChange={e => handleContactChange(contact.id, 'role', e.target.value)} className="md:w-1/4" />
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
        <Button type="submit" variant="default">Save Customer</Button>
      </div>
    </form>
  );
}; 