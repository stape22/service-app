import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { Button } from '../atoms/Button';
import { Checkbox } from '../atoms/Checkbox';
import { Textarea } from '../atoms/Textarea';
export const AddRooferForm = ({ onBack, onSubmit }) => {
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
    const [contacts, setContacts] = useState([
        { id: '1', fullName: '', email: '', phone: '' }
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
    return (_jsxs("form", { className: "bg-white rounded-lg border border-gray-200 p-6 max-w-3xl mx-auto", onSubmit: handleSubmit, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Add Roofer" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Create a new roofer profile in the system" })] }), _jsx(Button, { variant: "outline", type: "button", onClick: onBack, children: "Back to Roofers List" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [_jsxs("div", { children: [_jsxs(Label, { htmlFor: "fullName", children: ["Full Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "fullName", value: formData.fullName, onChange: e => handleInputChange('fullName', e.target.value), className: "mt-2", required: true })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "email", children: ["Email Address ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "email", type: "email", value: formData.email, onChange: e => handleInputChange('email', e.target.value), className: "mt-2", required: true })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "phone", children: ["Phone Number ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "phone", value: formData.phone, onChange: e => handleInputChange('phone', e.target.value), className: "mt-2", required: true })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { children: "Address" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { placeholder: "Street Address", value: formData.streetAddress, onChange: e => handleInputChange('streetAddress', e.target.value) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(Input, { placeholder: "City", value: formData.city, onChange: e => handleInputChange('city', e.target.value) }), _jsx(Input, { placeholder: "State", value: formData.state, onChange: e => handleInputChange('state', e.target.value) }), _jsx(Input, { placeholder: "Zip Code", value: formData.zipCode, onChange: e => handleInputChange('zipCode', e.target.value) })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-6", children: [_jsxs("div", { children: [_jsx(Label, { children: "Availability" }), _jsxs("div", { className: "flex space-x-6 mt-2", children: [_jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", name: "availability", value: "full-time", checked: formData.availability === 'full-time', onChange: () => handleInputChange('availability', 'full-time') }), _jsx("span", { children: "Full-time" })] }), _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", name: "availability", value: "part-time", checked: formData.availability === 'part-time', onChange: () => handleInputChange('availability', 'part-time') }), _jsx("span", { children: "Part-time" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Certifications" }), _jsxs("div", { className: "flex space-x-6 mt-2", children: [_jsxs("label", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { checked: formData.certifications.licensed, onChange: e => handleCertificationChange('licensed', e.target.checked) }), _jsx("span", { children: "Licensed" })] }), _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { checked: formData.certifications.insured, onChange: e => handleCertificationChange('insured', e.target.checked) }), _jsx("span", { children: "Insured" })] }), _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { checked: formData.certifications.bonded, onChange: e => handleCertificationChange('bonded', e.target.checked) }), _jsx("span", { children: "Bonded" })] })] })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { htmlFor: "notes", children: "Notes" }), _jsx(Textarea, { id: "notes", value: formData.notes, onChange: e => handleInputChange('notes', e.target.value), className: "mt-2" })] }), _jsx("div", { className: "mb-6", children: _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { checked: formData.sendWelcomeEmail, onChange: e => handleInputChange('sendWelcomeEmail', e.target.checked) }), _jsx("span", { children: "Send welcome email to roofer" })] }) }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { children: "Contacts" }), _jsxs("div", { className: "space-y-4", children: [contacts.map((contact) => (_jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-2 border p-2 rounded", children: [_jsx(Input, { placeholder: "Full Name", value: contact.fullName, onChange: e => handleContactChange(contact.id, 'fullName', e.target.value), className: "md:w-1/3" }), _jsx(Input, { placeholder: "Email", value: contact.email, onChange: e => handleContactChange(contact.id, 'email', e.target.value), className: "md:w-1/3" }), _jsx(Input, { placeholder: "Phone", value: contact.phone, onChange: e => handleContactChange(contact.id, 'phone', e.target.value), className: "md:w-1/3" }), contacts.length > 1 && (_jsx(Button, { type: "button", variant: "danger", onClick: () => removeContact(contact.id), className: "md:ml-2", children: "Remove" }))] }, contact.id))), _jsx(Button, { type: "button", variant: "outline", onClick: addContact, children: "Add Contact" })] })] }), _jsxs("div", { className: "flex justify-end gap-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onBack, children: "Cancel" }), _jsx(Button, { type: "submit", variant: "default", children: "Save Roofer" })] })] }));
};
