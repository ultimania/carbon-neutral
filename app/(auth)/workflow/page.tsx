'use client'

import { Search, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Request {
  id: string
  name: string
  avatar: string
  type: string
  typeIcon: string
  note: string
}

export default function UpgradeRequests() {
  const [requests, setRequests] = useState<Request[]>([])

  useEffect(() => {
    async function fetchRequests() {
      const response = await fetch("/api/workflows")
      const data = await response.json()
      setRequests(data)
    }
    fetchRequests()
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">申請一覧</h1>
          <span className="inline-flex items-center justify-center w-6 h-6 text-sm bg-blue-100 text-blue-700 rounded-full">
            34
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="workflow/history">
            <Button variant="outline">
              承認履歴
            </Button>
          </Link>
          <Button>すべて承認</Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
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
        <div className="px-4 py-2 text-sm text-muted-foreground grid grid-cols-[auto_1fr_2fr_auto_auto] items-center gap-4">
          <div className="w-8"></div>
          <div>Name</div>
          <div>Request</div>
          <div>Note</div>
          <div className="w-24"></div>
        </div>
        {requests.map((request) => (
          <div
            key={request.id}
            className="px-4 py-2 grid grid-cols-[auto_1fr_2fr_auto_auto] items-center gap-4 hover:bg-muted/50"
          >
            <Image src={request.avatar || "/placeholder.svg"} alt="" width={32} height={32} className="rounded-full" />
            <div className="font-medium">{request.name}</div>
            <div className="flex items-center gap-2">
              <span className="text-base">{request.typeIcon}</span>
              <span>{request.type}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {request.note && (
                <>
                  {request.note.slice(0, 30)}
                  {request.note.length > 30 && "..."}
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                Approve
              </Button>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

