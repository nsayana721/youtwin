import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`block w-10 h-6 rounded-full transition-colors ${
          checked ? 'bg-primary-500' : 'bg-gray-200'
        }`} />
        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`} />
      </div>
      {label && (
        <span className="ml-3 text-sm text-gray-600">{label}</span>
      )}
    </label>
  );
}