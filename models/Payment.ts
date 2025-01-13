import { Status } from "./Workflow";

export interface Payment extends Record<string, unknown> {
  id?: number; // ID
  amount: number; // 金額
  item: string; // 項目
  paymentDate: Date; // 支払日
  personInCharge: string; // 担当者
  approvalDate?: Date; // 承認日
  status: Status; // ステータス
  department: string; // 部門
  updatedAt?: Date; // 更新日時
  createdAt?: Date; // 作成日時
}