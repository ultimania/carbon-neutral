'use client';
import Login from "@/components/Login";

export default function Home({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen bg-gray-100 text-primary-text">
        <Login />
      </div>
    );
  }
  