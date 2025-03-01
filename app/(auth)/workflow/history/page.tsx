"use client";

import { Search, CheckCircle2, XCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Workflow, User, Payment, FuelType } from "@prisma/client";

export default function ApprovalHistory() {
  const [workflows, setWorkflows] = useState<
    (Workflow & {
      requestedBy: User;
      approvedBy: User;
      payment: Payment & { fuelType: FuelType };
    })[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    async function fetchRequests() {
      const response = await fetch("/api/workflows");
      const data = await response.json();
      setWorkflows(
        data.data.filter(
          (workflow: Workflow) => workflow.status !== "Unapproved"
        )
      );
    }
    fetchRequests();
  }, []);

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesName = workflow.requestedBy.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFuelType = workflow.payment.fuelType.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesProvider = workflow.payment.provider
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesName || matchesFuelType || matchesProvider;
  });

  const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
    const dateA = new Date(a.payment.paymentDate);
    const dateB = new Date(b.payment.paymentDate);
    return sortOrder === "newest"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  return (
    <Card className="w-full max-w-5xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-xl font-semibold">承認履歴</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          defaultValue="newest"
          onValueChange={(value) => setSortOrder(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort: Newest first" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg divide-y">
        <div className="px-6 py-3 text-sm text-muted-foreground grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4">
          <div>承認日</div>
          <div>承認者</div>
          <div>申請者</div>
          <div>燃料区分</div>
          <div>金額</div>
          <div>ステータス</div>
        </div>
        {sortedWorkflows.map((workflow) => (
          <div
            key={workflow.id}
            className="px-6 py-4 grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 hover:bg-muted/50"
          >
            <div className="text-sm text-muted-foreground">
              {new Date(workflow.payment.paymentDate).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <img
                src={workflow.approvedBy?.image || "/avatar.png"}
                alt={workflow.approvedBy?.name || "User avatar"}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm font-medium">
                {workflow.approvedBy?.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={workflow.requestedBy.image || "/avatar.png"}
                alt={workflow.requestedBy.name || "User avatar"}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm font-medium">
                {workflow.requestedBy.name}
              </span>
            </div>
            <div className="flex items-center gap-2 min-w-[120px]">
              <span className="text-sm">{workflow.payment.fuelType.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{workflow.payment.amount}円</span>
            </div>
            {workflow.status === "Approved" ? (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm">Approved</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600">
                <XCircle className="h-4 w-4" />
                <span className="text-sm">Rejected</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
