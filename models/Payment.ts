import { Status } from "./Workflow";

export interface Payment extends Record<string, unknown> {
  id?: string;
  amount: number;
  item: string;
  paymentDate: Date;
  approvalDate?: Date | null;
  status: string;
  updatedAt?: Date;
  createdAt?: Date;
  userInChargeId: string;
  departmentId: string;
}