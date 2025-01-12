"use client"

import { Payment } from "@/models/Payment"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Payment>[] = [
  {
    header: "金額",
    accessorKey: "amount",
  },
  {
    header: "項目",
    accessorKey: "item",
  },
  {
    header: "支払日",
    accessorKey: "paymentDate",
  },
  {
    header: "担当者",
    accessorKey: "personInCharge",
  },
  {
    header: "承認日",
    accessorKey: "approvalDate",
  },
  {
    header: "ステータス",
    accessorKey: "status",
  },
  {
    header: "部門",
    accessorKey: "department",
  },
]
