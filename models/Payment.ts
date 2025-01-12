import { Status } from "./Workflow";

export interface Payment {
  amount: number; // 金額
  item: string; // 項目
  paymentDate: string; // 支払日
  personInCharge: string; // 担当者
  approvalDate: string; // 承認日
  status: Status; // ステータス
  department: string; // 部門
}