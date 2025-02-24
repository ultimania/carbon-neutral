"use client";

import { Search, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Payment, User, Workflow } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { useSession } from "next-auth/react";

export default function UpgradeRequests() {
  const [workflows, setWorkflows] = useState<
    (Workflow & { requestedBy: User; payment: Payment })[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    async function fetchRequests() {
      const response = await fetch("/api/workflows?status=Unapproved");
      const data = await response.json();
      setWorkflows(data.data);
    }
    fetchRequests();
  }, []);

  const [fuelType, setFuelType] = useState("all");
  const { data: session } = useSession();

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesName = workflow.requestedBy.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFuelType = workflow.payment.fuelTypeId
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
    return sortOrder === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch("/api/workflows", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status: "Approved",
          approvedByName: session?.user?.name,
        }),
      });

      if (response.ok) {
        const updatedWorkflow = await response.json();
        setWorkflows((prevWorkflows) =>
          prevWorkflows.map((workflow) =>
            workflow.id === id ? { ...workflow, status: "Approved" } : workflow
          )
        );
      } else {
        console.error("Failed to approve workflow");
      }
    } catch (error) {
      console.error("Error approving workflow:", error);
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">申請一覧</h1>
          <span className="inline-flex items-center justify-center w-6 h-6 text-sm bg-blue-100 text-blue-700 rounded-full">
            {workflows.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="workflow/history">
            <Button variant="outline">承認履歴</Button>
          </Link>
          <Button>すべて承認</Button>
        </div>
      </div>

      {/* フィルタリング */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="design">Design seat</SelectItem>
            <SelectItem value="figjam">Fig/Jam seat</SelectItem>
            <SelectItem value="dev">Dev Mode seat</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="newest" onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort: Newest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* データテーブル */}
      <div className="border rounded-lg divide-y">
        <div className="px-4 py-2 text-sm text-muted-foreground grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4">
          <div>申請者</div>
          <div>燃料区分</div>
          <div>金額</div>
          <div>支払日</div>
          <div>契約会社</div>
          <div>承認</div>
        </div>
        {sortedWorkflows.map((workflow) => (
          <div
            key={workflow.id}
            className="px-4 py-2 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 hover:bg-muted/50"
          >
            <div className="flex items-center font-medium">
              <img
                src={workflow.requestedBy.image || "/avatar.png"}
                alt={workflow.requestedBy.name || "User avatar"}
                width={32}
                height={32}
                className="rounded-full"
              />
              {workflow.requestedBy.name}
            </div>
            <div className="flex items-center gap-2">
              <span>{workflow.payment.fuelTypeId}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{workflow.payment.amount}円</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(workflow.payment.paymentDate).toLocaleDateString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {workflow.payment.provider}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleApprove(workflow.id)}
                disabled={workflow.status === "Approved"}
              >
                {workflow.status === "Approved" ? "承認済み" : "承認"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
