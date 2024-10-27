"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { menuItems } from "@/components/config/sidebar";

export default function Sidebar() {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <aside className="w-3/12 bg-white shadow-md text-primary-text p-4">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">CO2 Visualization</h1>
      </div>
      <nav className="p-6 my-2">
        <ul className="space-y-4 text-sm">
          {menuItems.map((item) => {
            const isActive = selectedSegment === item.href;
            return (
              <li key={item.href}>
                <div className={`p-2 rounded ${isActive ?  "bg-primary" : ""}`}>
                  <Link
                    href={`/${item.href}`}
                    className={`flex items-center ${
                      isActive ? "text-primary-text-light" : "text-primary-text"
                    }`}
                  >
                    <item.icon
                      className="mr-2"
                      size={18}
                      color={isActive ? "#ffffff" : "#10b981"}
                    />{" "}
                    {item.label}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
