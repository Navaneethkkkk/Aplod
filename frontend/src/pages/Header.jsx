import React from "react";
import {
  Bell,
  HelpCircle,
  Search,
  ChevronDown,
} from "lucide-react";

function Header() {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm">
      
      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search products..."
          className="w-80 pl-11 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        
        <button className="relative">
          <Bell
            size={22}
            className="text-gray-600 cursor-pointer hover:text-blue-600"
          />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button>
          <HelpCircle
            size={22}
            className="text-gray-600 cursor-pointer hover:text-blue-600"
          />
        </button>

        <div className="h-8 w-px bg-gray-300"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />

          <div className="hidden md:block">
            <h4 className="text-sm font-semibold">
              Admin User
            </h4>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={18}
            className="text-gray-500"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;