import Link from "next/link";
import { SettingsIcon, BellIcon, UserIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-4">
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span>/</span>
        <Link href="/section" className="text-primary hover:underline">
          Section
        </Link>
        <span>/</span>
        <Link href="/subsection" className="text-primary hover:underline">
          Subsection
        </Link>
      </nav>

      {/* Search Box */}
      <div className="flex-grow mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Icons and User Profile */}
      <div className="flex items-center space-x-4">
        <SettingsIcon size={24} className="text-primary cursor-pointer" />
        <BellIcon size={24} className="text-primary cursor-pointer" />
        <div className="flex items-center space-x-2">
          <UserIcon size={24} className="text-primary" />
          <span className="text-primary">User Name</span>
        </div>
      </div>
    </header>
  );
}