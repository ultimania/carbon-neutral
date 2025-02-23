import Form from "next/form";
import { Button } from "./Button";
import { Input } from "./Input";
import prisma from "@/lib/prisma";

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
}

export const InputForm = <T extends Record<string, unknown>>(
  { schema }: InputFormProps<T>,
  ...props: any[]
) => {
  const submitFormAction = async (formData: FormData) => {
    "use server";

    // TODO: validate the form data
    console.log("Not implemented yet");

    // post the form data to the server
    const response = await fetch("/api/payments", {
      method: "POST",
      body: formData,
    });

  };

  return (
    <Form action={submitFormAction} {...props}>
      {schema.map((field) => {
        if (field.hidden) return null;
        return (
          <label key={field.name as string} className="input-form">
            <div className="flex my-2">
              {field.label}
              {field.required && <span>*</span>}
            </div>
            {field.type === "select" ? (
              <select name={field.name as string} className="w-full p-2 border border-gray-400 rounded">
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
              />
            )}
          </label>
        );
      })}
      <Button type="submit" className="button">
        登録
      </Button>
    </Form>
  );
};
