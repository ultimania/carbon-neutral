import { SettingsIcon, BellIcon, UserIcon } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Breadcrumb */}
      <div className="w-3/6">
        <Breadcrumbs />
      </div>

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
