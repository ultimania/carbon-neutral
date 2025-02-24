'use client';

import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

export interface InputFormSchema<T> {
  label: string;
  type: string;
  name: keyof T;
  required: boolean;
  options?: string[];
  placeholder?: string;
  hidden?: boolean;
}

export interface InputFormProps<T extends Record<string, unknown>> {
  schema: InputFormSchema<T>[];
  endpoint: string,
}

export const InputForm = <T extends Record<string, unknown>>(
  { schema, endpoint }: InputFormProps<T>,
  ...props: any[]
) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // post the form data to the server
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // handle response
    if (response.ok) {
      console.log("Form submitted successfully");
    } else {
      console.error("Form submission failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {schema.map((field) => {
        if (field.hidden) return null;
        return (
          <label key={field.label as string} className="input-form">
            <div className="flex my-2">
              {field.label}
              {field.required && <span>*</span>}
            </div>
            {field.type === "select" ? (
              <select
                name={field.name as string}
                className="w-full p-2 border border-gray-400 rounded"
                onChange={handleChange}
              >
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                type={field.type}
                name={field.name as string}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full p-2 border border-gray-400 rounded"
                onChange={handleChange}
              />
            )}
          </label>
        );
      })}
      <Button type="submit" className="button">
        登録
      </Button>
    </form>
  );
};
