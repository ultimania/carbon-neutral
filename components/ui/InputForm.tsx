
import React from 'react';
import { Dropdown } from './Dropdown';
import { Textarea } from './Textarea';
import { Input } from './Input';

interface InputFormField<T> {
  label: string;
  type: string;
  name: keyof T;
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export type InputFormFields<T> = InputFormField<T>[];

interface InputFormProps{
  fields: InputFormFields<any>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ fields, onSubmit }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">燃料費の登録</h3>
      <form className="space-y-4" onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium">{field.label}</label>
            <div>
              {field.type === 'dropdown' ? (
                <Dropdown options={field.options || []} defaultOption={field.placeholder || ''} />
              ) : field.type === 'textarea' ? (
                <Textarea placeholder={field.placeholder || ''} />
              ) : (
                <Input type={field.type} placeholder={field.placeholder || ''} />
              )}
            </div>
          </div>
        ))}
        <button type="submit" className="button-primary">
          登録
        </button>
      </form>
    </div>
  );
};