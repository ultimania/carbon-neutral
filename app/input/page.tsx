import React from "react";
import { InputForm, InputFormSchema } from "@/components/ui/InputForm";
import { Payment } from "@/models/Payment";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";

const fuelOptions = ["電気", "ガス", "ガソリン", "軽油", "灯油"];

const formSchema: InputFormSchema<Payment>[] = [
  {
    label: "金額",
    type: "number",
    name: "amount",
    required: true,
    placeholder: "1234567890",
  },
  {
    label: "燃料区分",
    type: "select",
    name: "item",
    required: true,
    options: fuelOptions,
    placeholder: "燃料区分を選択してください",
  },
  {
    label: "支払日",
    type: "date",
    name: "paymentDate",
    required: true,
  },
];

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      amount: 1829932,
      item: "電気料金",
      paymentDate: new Date("2023/10/21"),
      personInCharge: "田中太郎",
      approvalDate: new Date("2023/10/21"),
      status: "仮登録",
      department: "東京本社",
    },
    // ...
  ];
}

export default async function Page() {
  const data = await getData();
  const PersonResult = z.object({
    name: z.string(),
  });

  return (
    <div className="bg-gray-100">
      <InputForm schema={formSchema} />

      {/* Data table */}
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
