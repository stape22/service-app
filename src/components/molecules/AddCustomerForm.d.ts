import React from 'react';
export interface AddCustomerFormProps {
    onBack: () => void;
    onSubmit?: (data: any) => void;
    availableRoofers?: string[];
}
export declare const AddCustomerForm: React.FC<AddCustomerFormProps>;
