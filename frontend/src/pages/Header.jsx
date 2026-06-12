import React from "react";
import {
  Bell,
  HelpCircle,
  Search,
  ChevronDown,
} from "lucide-react";
import { useAdminTheme } from "../context/AdminThemeContext";

function Header() {
  const { isDark } = useAdminTheme();

  return (
    <header className={`min-h-16 px-4 md:px-6 py-3 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between shadow-sm transition-colors ${
      isDark ? "bg-slate-950 border-b border-slate-800" : "bg-white"
    }`}>
      
      {/* Search */}
      <div className="relative w-full sm:w-auto">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search products..."
          className={`w-full sm:w-80 pl-11 pr-4 py-2.5 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
            isDark
              ? "bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500"
              : "bg-slate-50 border-slate-100 text-slate-900"
          }`}
        />
      </div>

      {/* Right Side */}
      <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-3 md:gap-4">

        {/* Notification */}
        <button className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
          isDark ? "bg-slate-900 hover:bg-slate-800" : "bg-slate-50 hover:bg-slate-100"
        }`}>
          <Bell
            size={20}
            className={isDark ? "text-slate-300" : "text-slate-600"}
          />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Help */}
        <button className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
          isDark ? "bg-slate-900 hover:bg-slate-800" : "bg-slate-50 hover:bg-slate-100"
        }`}>
          <HelpCircle
            size={20}
            className={isDark ? "text-slate-300" : "text-slate-600"}
          />
        </button>

        {/* Divider */}
        <div className={`h-8 w-px ${isDark ? "bg-slate-800" : "bg-slate-100"}`}></div>

        {/* Profile */}
        <div className={`flex items-center gap-3 px-2 py-1 rounded-2xl transition-all duration-200 cursor-pointer ${
          isDark ? "hover:bg-slate-900" : "hover:bg-slate-50"
        }`}>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full border border-slate-100"
          />

          <div className="hidden md:block">
            <h4 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
              Admin User
            </h4>

            <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Administrator
            </p>
          </div>

          <ChevronDown
            size={18}
            className="text-slate-400"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
