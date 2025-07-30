/*
========================================
File: src/components/PolicyOption.tsx
========================================
Purpose: A custom radio button component for policy selection.
*/
import React from 'react';

interface PolicyOptionProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
}

const PolicyOption: React.FC<PolicyOptionProps> = ({ id, name, value, label, checked, onChange, description }) => {
  return (
    <label htmlFor={id} className="block p-4 mb-2 bg-gray-700/50 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-200">{label}</span>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="form-radio h-5 w-5 text-cyan-500 bg-gray-900 border-gray-500 focus:ring-cyan-600"
        />
      </div>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </label>
  );
};

export default PolicyOption;
