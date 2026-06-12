import React from "react";
import {
  Plus,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar() {

const navigiate =useNavigate()

  return (
    <aside className="w-56 h-screen bg-white border-r flex flex-col justify-between">
      <div>
        <div className="p-5">
          <h1 className="text-2xl font-bold text-blue-900">
            Case Vault
          </h1>
          
        </div>

        <div className="px-4">
          <button className="w-full bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2">
            <Plus size={18} />
            New Entry
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          <button
          onClick={()=> navigiate("/adminpanel")}
           className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
          onClick={()=>navigiate("/product")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl ">
            <Plus size={18} />
            Add Product
          </button>

          <button
          onClick={()=>navigiate("/order")}
           className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
            <ShoppingCart size={18} />
            Orders
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
            <Package size={18} />
            Category
          </button>
        </nav>
      </div>

      <div className="border-t p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
          <Settings size={18} />
          Settings
        </button>

        <button
        onClick={()=>navigiate("/login")}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;