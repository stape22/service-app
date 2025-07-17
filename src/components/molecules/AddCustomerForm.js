import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { Button } from '../atoms/Button';
import { Textarea } from '../atoms/Textarea';
import { Checkbox } from '../atoms/Checkbox';
export const AddCustomerForm = ({ onBack, onSubmit, availableRoofers = [] }) => {
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
    const [contacts, setContacts] = useState([
        { id: '1', fullName: '', email: '', phone: '', role: '' }
    ]);
    const [errors, setErrors] = useState({});
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    const handleContactChange = (id, field, value) => {
        setContacts(prev => prev.map(contact => contact.id === id ? { ...contact, [field]: value } : contact));
    };
    const addContact = () => {
        const newContact = {
            id: Date.now().toString(),
            fullName: '',
            email: '',
            phone: '',
            role: ''
        };
        setContacts(prev => [...prev, newContact]);
    };
    const removeContact = (id) => {
        setContacts(prev => prev.filter(contact => contact.id !== id));
    };
    const validate = () => {
        const newErrors = {};
        if (!formData.customerName)
            newErrors.customerName = 'Customer name is required';
        if (!formData.email)
            newErrors.email = 'Email is required';
        if (!formData.phone)
            newErrors.phone = 'Phone is required';
        return newErrors;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (onSubmit)
            onSubmit({ ...formData, contacts });
        onBack();
    };
    return (_jsxs("form", { className: "bg-white rounded-lg border border-gray-200 p-6 max-w-3xl mx-auto", onSubmit: handleSubmit, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Add Customer" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Create a new customer profile in the system" })] }), _jsx(Button, { variant: "outline", type: "button", onClick: onBack, children: "Back to Customers List" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [_jsxs("div", { children: [_jsxs(Label, { htmlFor: "customerName", children: ["Customer Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "customerName", value: formData.customerName, onChange: e => handleInputChange('customerName', e.target.value), className: "mt-2", required: true }), errors.customerName && _jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.customerName })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "email", children: ["Email Address ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "email", type: "email", value: formData.email, onChange: e => handleInputChange('email', e.target.value), className: "mt-2", required: true }), errors.email && _jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.email })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "phone", children: ["Phone Number ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "phone", value: formData.phone, onChange: e => handleInputChange('phone', e.target.value), className: "mt-2", required: true }), errors.phone && _jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.phone })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { children: "Address" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { placeholder: "Street Address", value: formData.streetAddress, onChange: e => handleInputChange('streetAddress', e.target.value) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(Input, { placeholder: "City", value: formData.city, onChange: e => handleInputChange('city', e.target.value) }), _jsx(Input, { placeholder: "State", value: formData.state, onChange: e => handleInputChange('state', e.target.value) }), _jsx(Input, { placeholder: "Zip Code", value: formData.zipCode, onChange: e => handleInputChange('zipCode', e.target.value) })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-6", children: [_jsxs("div", { children: [_jsx(Label, { children: "Customer Type" }), _jsxs("div", { className: "flex space-x-6 mt-2", children: [_jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", name: "customerType", value: "residential", checked: formData.customerType === 'residential', onChange: () => handleInputChange('customerType', 'residential') }), _jsx("span", { children: "Residential" })] }), _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", name: "customerType", value: "commercial", checked: formData.customerType === 'commercial', onChange: () => handleInputChange('customerType', 'commercial') }), _jsx("span", { children: "Commercial" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "taxId", children: "Tax ID" }), _jsx(Input, { id: "taxId", value: formData.taxId, onChange: e => handleInputChange('taxId', e.target.value), className: "mt-2" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-6", children: [_jsxs("div", { children: [_jsx(Label, { children: "Preferred Contact Method" }), _jsxs("div", { className: "flex space-x-6 mt-2", children: [_jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", name: "preferredContactMethod", value: "email", checked: formData.preferredContactMethod === 'email', onChange: () => handleInputChange('preferredContactMethod', 'email') }), _jsx("span", { children: "Email" })] }), _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", name: "preferredContactMethod", value: "phone", checked: formData.preferredContactMethod === 'phone', onChange: () => handleInputChange('preferredContactMethod', 'phone') }), _jsx("span", { children: "Phone" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "assignedRoofer", children: "Assigned Roofer" }), _jsxs("select", { id: "assignedRoofer", value: formData.assignedRoofer, onChange: e => handleInputChange('assignedRoofer', e.target.value), className: "mt-2 border rounded px-2 py-1 w-full", children: [_jsx("option", { value: "", children: "None" }), availableRoofers.map((roofer, idx) => (_jsx("option", { value: roofer, children: roofer }, idx)))] })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { htmlFor: "notes", children: "Notes" }), _jsx(Textarea, { id: "notes", value: formData.notes, onChange: e => handleInputChange('notes', e.target.value), className: "mt-2" })] }), _jsx("div", { className: "mb-6", children: _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { checked: formData.sendWelcomeEmail, onChange: e => handleInputChange('sendWelcomeEmail', e.target.checked) }), _jsx("span", { children: "Send welcome email to customer" })] }) }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { children: "Contacts" }), _jsxs("div", { className: "space-y-4", children: [contacts.map((contact) => (_jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-2 border p-2 rounded", children: [_jsx(Input, { placeholder: "Full Name", value: contact.fullName, onChange: e => handleContactChange(contact.id, 'fullName', e.target.value), className: "md:w-1/4" }), _jsx(Input, { placeholder: "Email", value: contact.email, onChange: e => handleContactChange(contact.id, 'email', e.target.value), className: "md:w-1/4" }), _jsx(Input, { placeholder: "Phone", value: contact.phone, onChange: e => handleContactChange(contact.id, 'phone', e.target.value), className: "md:w-1/4" }), _jsx(Input, { placeholder: "Role", value: contact.role, onChange: e => handleContactChange(contact.id, 'role', e.target.value), className: "md:w-1/4" }), contacts.length > 1 && (_jsx(Button, { type: "button", variant: "danger", onClick: () => removeContact(contact.id), className: "md:ml-2", children: "Remove" }))] }, contact.id))), _jsx(Button, { type: "button", variant: "outline", onClick: addContact, children: "Add Contact" })] })] }), _jsxs("div", { className: "flex justify-end gap-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onBack, children: "Cancel" }), _jsx(Button, { type: "submit", variant: "default", children: "Save Customer" })] })] }));
};
