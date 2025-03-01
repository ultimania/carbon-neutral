"use client";

import { Payment } from "@/models/Payment";
import { ColumnDef } from "@tanstack/react-table";

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
    cell: ({ row }) => {
      const date = new Date(row.original.paymentDate);
      return date.toLocaleDateString();
    },
  },
  {
    header: "担当者",
    accessorKey: "personInCharge",
  },
  {
    header: "承認日",
    accessorKey: "approvalDate",
    cell: ({ row }) => {
      if (row.original.approvalDate) {
        const date = new Date(row.original.approvalDate);
        return date.toLocaleDateString();
      }
      return "";
    },
  },
  {
    header: "ステータス",
    accessorKey: "status",
  },
  {
    header: "契約会社",
    accessorKey: "provider",
  },
];
