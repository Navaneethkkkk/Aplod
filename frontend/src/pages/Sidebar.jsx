import React from "react";
import {
  Plus,
  LayoutDashboard,
  ShoppingCart,
  Package,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminTheme } from "../context/AdminThemeContext";

function Sidebar() {

  const navigiate = useNavigate()
  const { isDark, toggleTheme } = useAdminTheme();
  const navButtonClass = `w-full flex items-center justify-center md:justify-start gap-3 px-3 md:px-4 py-3 rounded-xl transition ${
    isDark
      ? "text-slate-200 hover:bg-slate-800"
      : "text-slate-700 hover:bg-gray-100"
  }`;

  return (
    <aside className={`w-20 md:w-56 min-h-screen border-r shrink-0 flex flex-col justify-between transition-colors ${
      isDark ? "bg-slate-950 border-slate-800 text-slate-100" : "bg-white border-slate-100 text-slate-900"
    }`}>
      <div>
        <div className="p-4 md:p-5">
          <h1 className={`text-lg md:text-2xl font-bold text-center md:text-left ${isDark ? "text-sky-300" : "text-blue-900"}`}>
            <span className="md:hidden">CV</span>
            <span className="hidden md:inline">Case Vault</span>
          </h1>
        </div>


        <nav className="mt-4 md:mt-6 px-3 md:px-4 space-y-2">
          <button
          onClick={()=> navigiate("/adminpanel")}
           className={navButtonClass}>
            <LayoutDashboard size={18} />
            <span className="hidden md:inline">Dashboard</span>
          </button>

          <button
          onClick={()=>navigiate("/product")}
          className={navButtonClass}>
            <Plus size={18} />
            <span className="hidden md:inline">Add Product</span>
          </button>

          <button
          onClick={()=>navigiate("/orders")}
           className={navButtonClass}>
            <ShoppingCart size={18} />
            <span className="hidden md:inline">Orders</span>
          </button>

          <button
          onClick={()=>navigiate("/category")}
          className={navButtonClass}>
            <Package size={18} />
            <span className="hidden md:inline">Category</span>
          </button>
        </nav>
      </div>

      <div className="p-3 md:p-4 space-y-2">
        <button
          onClick={toggleTheme}
          className={navButtonClass}
          aria-label="Toggle admin dark mode"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          <span className="hidden md:inline">{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>

        <button
        onClick={()=>navigiate("/login")}
        className={navButtonClass}>
          <LogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
