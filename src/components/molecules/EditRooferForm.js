import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { Button } from '../atoms/Button';
import { Checkbox } from '../atoms/Checkbox';
import { Textarea } from '../atoms/Textarea';
export const EditRooferForm = ({ roofer, onBack, onSubmit, onDelete }) => {
    // Parse address into components (simple split for demo)
    const addressParts = roofer.address.split(', ');
    const streetAddress = addressParts[0] || '';
    const [formData, setFormData] = useState({
        fullName: roofer.fullName,
        email: roofer.email,
        phone: roofer.phone,
        streetAddress: streetAddress,
        city: '',
        state: '',
        zipCode: '',
        availability: roofer.availability,
        certifications: {
            licensed: roofer.certifications.includes('Licensed'),
            insured: roofer.certifications.includes('Insured'),
            bonded: roofer.certifications.includes('Bonded')
        },
        notes: '',
        sendWelcomeEmail: false
    });
    const [contacts, setContacts] = useState([
        { id: '1', fullName: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543' }
    ]);
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const handleCertificationChange = (cert, checked) => {
        setFormData(prev => ({
            ...prev,
            certifications: {
                ...prev.certifications,
                [cert]: checked
            }
        }));
    };
    const handleContactChange = (id, field, value) => {
        setContacts(prev => prev.map(contact => contact.id === id ? { ...contact, [field]: value } : contact));
    };
    const addContact = () => {
        const newContact = {
            id: Date.now().toString(),
            fullName: '',
            email: '',
            phone: ''
        };
        setContacts(prev => [...prev, newContact]);
    };
    const removeContact = (id) => {
        setContacts(prev => prev.filter(contact => contact.id !== id));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit)
            onSubmit({ ...formData, contacts });
        onBack();
    };
    const handleDelete = () => {
        if (onDelete && window.confirm('Are you sure you want to delete this roofer? This action cannot be undone.')) {
            onDelete(roofer.id);
            onBack();
        }
    };
    return (_jsxs("form", { className: "bg-white rounded-lg border border-gray-200 p-6 max-w-3xl mx-auto", onSubmit: handleSubmit, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Edit Roofer" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Update roofer profile information" })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(Button, { variant: "outline", type: "button", className: "text-red-600 hover:text-red-700 hover:bg-red-50", onClick: handleDelete, children: "Delete Roofer" }), _jsx(Button, { variant: "outline", type: "button", onClick: onBack, children: "Back to Roofers List" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [_jsxs("div", { children: [_jsxs(Label, { htmlFor: "fullName", children: ["Full Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "fullName", value: formData.fullName, onChange: e => handleInputChange('fullName', e.target.value), className: "mt-2", required: true })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "email", children: ["Email Address ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "email", type: "email", value: formData.email, onChange: e => handleInputChange('email', e.target.value), className: "mt-2", required: true })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "phone", children: ["Phone Number ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "phone", value: formData.phone, onChange: e => handleInputChange('phone', e.target.value), className: "mt-2", required: true })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { children: "Address" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { placeholder: "Street Address", value: formData.streetAddress, onChange: e => handleInputChange('streetAddress', e.target.value) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(Input, { placeholder: "City", value: formData.city, onChange: e => handleInputChange('city', e.target.value) }), _jsx(Input, { placeholder: "State", value: formData.state, onChange: e => handleInputChange('state', e.target.value) }), _jsx(Input, { placeholder: "Zip Code", value: formData.zipCode, onChange: e => handleInputChange('zipCode', e.target.value) })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-6", children: [_jsxs("div", { children: [_jsx(Label, { children: "Availability" }), _jsxs("div", { className: "flex space-x-6 mt-2", children: [_jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", name: "availability", value: "full-time", checked: formData.availability === 'full-time', onChange: () => handleInputChange('availability', 'full-time') }), _jsx("span", { children: "Full-time" })] }), _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", name: "availability", value: "part-time", checked: formData.availability === 'part-time', onChange: () => handleInputChange('availability', 'part-time') }), _jsx("span", { children: "Part-time" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Certifications" }), _jsxs("div", { className: "flex space-x-6 mt-2", children: [_jsxs("label", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { checked: formData.certifications.licensed, onChange: e => handleCertificationChange('licensed', e.target.checked) }), _jsx("span", { children: "Licensed" })] }), _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { checked: formData.certifications.insured, onChange: e => handleCertificationChange('insured', e.target.checked) }), _jsx("span", { children: "Insured" })] }), _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { checked: formData.certifications.bonded, onChange: e => handleCertificationChange('bonded', e.target.checked) }), _jsx("span", { children: "Bonded" })] })] })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { htmlFor: "notes", children: "Notes" }), _jsx(Textarea, { id: "notes", value: formData.notes, onChange: e => handleInputChange('notes', e.target.value), className: "mt-2" })] }), _jsx("div", { className: "mb-6", children: _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { checked: formData.sendWelcomeEmail, onChange: e => handleInputChange('sendWelcomeEmail', e.target.checked) }), _jsx("span", { children: "Send welcome email to roofer" })] }) }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { children: "Contacts" }), _jsxs("div", { className: "space-y-4", children: [contacts.map((contact) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "text", value: contact.fullName, onChange: e => handleContactChange(contact.id, 'fullName', e.target.value), placeholder: "Full Name", className: "input input-sm" }), _jsx("input", { type: "email", value: contact.email, onChange: e => handleContactChange(contact.id, 'email', e.target.value), placeholder: "Email", className: "input input-sm" }), _jsx("input", { type: "tel", value: contact.phone, onChange: e => handleContactChange(contact.id, 'phone', e.target.value), placeholder: "Phone", className: "input input-sm" }), _jsx("button", { type: "button", onClick: () => removeContact(contact.id), className: "btn btn-xs btn-error", children: "Remove" })] }, contact.id))), _jsx(Button, { type: "button", variant: "outline", onClick: addContact, children: "Add Contact" })] })] }), _jsxs("div", { className: "flex justify-end gap-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onBack, children: "Cancel" }), _jsx(Button, { type: "submit", variant: "default", children: "Save Changes" })] })] }));
};
