import { ArrowLeft, Search, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ApprovalHistory {
  id: string
  approvedAt: string
  approver: {
    name: string
    avatar: string
  }
  requestor: {
    name: string
    avatar: string
  }
  type: string
  typeIcon: string
}

const approvalHistory: ApprovalHistory[] = [
  {
    id: "1",
    approvedAt: "2024-02-23 15:30",
    approver: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    requestor: {
      name: "Aaron Taylor",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    type: "Design seat",
    typeIcon: "🎨",
  },
  {
    id: "2",
    approvedAt: "2024-02-23 14:45",
    approver: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    requestor: {
      name: "Kai Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    type: "Fig/Jam seat",
    typeIcon: "🟣",
  },
  {
    id: "3",
    approvedAt: "2024-02-22 16:20",
    approver: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    requestor: {
      name: "Olivia Nguyen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    type: "Design seat",
    typeIcon: "🎨",
  },
  {
    id: "4",
    approvedAt: "2024-02-22 11:15",
    approver: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    requestor: {
      name: "Cameron Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    type: "Dev Mode seat",
    typeIcon: "💻",
  },
]

export default function ApprovalHistory() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-xl font-semibold">Approval History</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name" className="pl-8" />
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
        <Select defaultValue="newest">
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
        <div className="px-6 py-3 text-sm text-muted-foreground grid grid-cols-[1fr_1fr_1fr_auto_auto] items-center gap-4">
          <div>Approved At</div>
          <div>Approver</div>
          <div>Requestor</div>
          <div>Request Type</div>
          <div>Status</div>
        </div>
        {approvalHistory.map((history) => (
          <div
            key={history.id}
            className="px-6 py-4 grid grid-cols-[1fr_1fr_1fr_auto_auto] items-center gap-4 hover:bg-muted/50"
          >
            <div className="text-sm text-muted-foreground">{history.approvedAt}</div>
            <div className="flex items-center gap-2">
              <Image
                src={history.approver.avatar || "/placeholder.svg"}
                alt=""
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm font-medium">{history.approver.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={history.requestor.avatar || "/placeholder.svg"}
                alt=""
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm font-medium">{history.requestor.name}</span>
            </div>
            <div className="flex items-center gap-2 min-w-[120px]">
              <span className="text-base">{history.typeIcon}</span>
              <span className="text-sm">{history.type}</span>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm">Approved</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

