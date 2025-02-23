import React from "react";
import { InputForm, InputFormSchema } from "@/components/ui/InputForm";
import { Payment } from "@/models/Payment";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
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
  {
    label: "担当者",
    type: "text",
    name: "personInCharge",
    required: false,
    hidden: true,
  },
  {
    label: "承認日",
    type: "date",
    name: "approvalDate",
    required: false,
    hidden: true,
  },
  {
    label: "ステータス",
    type: "text",
    name: "status",
    required: false,
    hidden: true,
  },
  {
    label: "部門",
    type: "text",
    name: "department",
    required: false,
    hidden: true,
  }
];

export default function Page() {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">燃料消費量登録</CardTitle>
        </CardHeader>
        <CardContent>
          <InputForm schema={formSchema} />
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">登録履歴</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
