import React from "react";
import { InputForm, InputFormSchema } from "@/components/ui/InputForm";
import { Payment } from "@/models/Payment";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import prisma from "@/lib/prisma";

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

const getData = async () => {
  // Fetch payment data from database by prisma
  'use server';
  const allPayments = await prisma.payment.findMany();
  // return data as Payment[]
  return allPayments;
  
};

export default async function Page() {
  const data = await getData();

  return (
    <div className="bg-gray-100">
      <InputForm schema={formSchema} />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
