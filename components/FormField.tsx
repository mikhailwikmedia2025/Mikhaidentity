import React from 'react';

interface FormFieldProps {
  labelAr: string;
  labelEn: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ labelAr, labelEn, required, children }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-900 font-medium mb-1">
        {labelAr} {required && <span className="text-red-500">*</span>}
      </label>
      <label className="block text-gray-500 text-sm mb-2 font-normal">
        {labelEn}
      </label>
      {children}
    </div>
  );
};