"use client";

import Login from "@/components/Login";
import { Button } from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import { HelpCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Home({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  if (!session) {
    return <Login />;
  }
  return (
    <div className="flex h-screen bg-gray-100 text-primary-text">
      {/* Sidebar */}
      <Sidebar />

      <div className="w-screen">
        <Header />
        <main className="flex flex-col p-4 justify-center">
          {children}
        </main>
      </div>

      {/* Help button */}
      <div className="fixed bottom-4 right-4">
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          <HelpCircleIcon className="mr-2" size={18} />
          Need help?
        </Button>
      </div>
    </div>
  );
}
