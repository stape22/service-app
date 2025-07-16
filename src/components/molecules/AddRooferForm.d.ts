import React from 'react';
export interface AddRooferFormProps {
    onBack: () => void;
    onSubmit?: (data: any) => void;
}
export declare const AddRooferForm: React.FC<AddRooferFormProps>;
