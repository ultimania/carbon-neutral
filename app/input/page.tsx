import React from "react";
import { InputForm, InputFormFields } from "@/components/ui/InputForm";
import { Payment } from "@/models/Payment";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const fuelOptions = ["ガソリン", "軽油", "灯油"];

const formFields: InputFormFields<Payment> = [
  {
    label: "金額",
    type: "number",
    name: "amount",
    required: true,
    placeholder: "1234567890",
  },
  {
    label: "燃料区分",
    type: "dropdown",
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
  }
];

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  "use server";
  event.preventDefault();
  // Payment型のデータを作成
  const formData = new FormData(event.currentTarget);
  const data: Payment = {
    amount: Number(formData.get("amount")),
    item: formData.get("item") as string,
    paymentDate: formData.get("paymentDate") as string,
    personInCharge: "",
    approvalDate: "",
    status: "仮登録",
    department: "",
  };

  // APIにデータを送信
  await fetch("/api/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });


};

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      amount: 1829932,
      item: "電気料金",
      paymentDate: "2023/10/20",
      personInCharge: "田中太郎",
      approvalDate: "2023/10/21",
      status: "仮登録",
      department: "東京本社",
    },
    // ...
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="bg-gray-100">
      <InputForm fields={formFields} onSubmit={handleSubmit} />

      {/* Data table */}
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
