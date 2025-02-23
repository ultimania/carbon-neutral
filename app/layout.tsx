"use client";

import type { Metadata } from "next";
import "./globals.css";
import { HelpCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";
import { NextAuthProvider } from "@/providers/NextAuth";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Home from "./page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NextAuthProvider>
          <Home>{children}</Home>
        </NextAuthProvider>
      </body>
    </html>
  );
}
