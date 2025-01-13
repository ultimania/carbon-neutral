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

    // create a new record in the database by prisma
    const data = {
      data: {
        amount: Number(formData.get("amount")),
        item: formData.get("item") as string,
        paymentDate: new Date(formData.get("paymentDate") as string),
        userInChargeId: "0",
        status: "仮登録",
        departmentId: "0",
      },
    };
    console.log(data);
    await prisma.payment.create(data);
  };

  return (
    <Form action={submitFormAction} {...props}>
      {schema.map((field) => {
        return (
          <label key={field.name as string} className="flex flex-col my-2 py-2">
            <div className="flex my-2">
              {field.label}
              {field.required && <span>*</span>}
            </div>
            {field.type === "select" ? (
              <select name={field.name as string}>
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
              />
            )}
          </label>
        );
      })}
      <Button type="submit" className="py-4 my-4">
        登録
      </Button>
    </Form>
  );
};
