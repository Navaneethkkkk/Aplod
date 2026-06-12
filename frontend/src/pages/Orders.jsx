
import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ShoppingBag, 
  Boxes, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  HelpCircle, 
  SlidersHorizontal, 
  Download, 
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Orders() {
  // Mock Data for the table
  const orders = [
    { id: '#ORD-001', customer: 'Rajesh Kumar', product: 'iPhone 14 Pro Case - Black', date: 'Oct 24, 2023', amount: '₹1,499', status: 'Pending' },
    { id: '#ORD-002', customer: 'Priya Sharma', product: 'Samsung S23 Ultra Clear Case', date: 'Oct 23, 2023', amount: '₹999', status: 'Shipped' },
    { id: '#ORD-003', customer: 'Amit Singh', product: 'Pixel 7 Leather Cover - Brown', date: 'Oct 22, 2023', amount: '₹2,499', status: 'Delivered' },
    { id: '#ORD-004', customer: 'Neha Gupta', product: 'OnePlus 11 Silicone Case - Red', date: 'Oct 21, 2023', amount: '₹799', status: 'Cancelled' },
    { id: '#ORD-005', customer: 'Vikram Reddy', product: 'iPad Pro 12.9 Smart Folio', date: 'Oct 20, 2023', amount: '₹4,499', status: 'Delivered' },
  ];

  // Helper function to style status badges
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-700 border border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between">
        <div>
          {/* Logo / Brand */}
          <div className="p-5 flex items-center gap-3 border-b border-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Admin Profile" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h1 className="font-bold text-slate-900 tracking-tight text-lg">Case Vault</h1>
              <p className="text-xs text-slate-500 font-medium">Admin Console</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="px-4 py-4">
            <button className="w-full bg-[#1e6091] hover:bg-[#1a527e] text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm">
              <PlusCircle size={18} />
              <span>New Entry</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            <a href="#dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </a>
            <a href="#add-product" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <PlusCircle size={18} />
              <span>Add Product</span>
            </a>
            <a href="#orders" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-emerald-800 bg-[#a7f3d0] rounded-lg transition-colors">
              <ShoppingBag size={18} />
              <span>Orders</span>
            </a>
            <a href="#inventory" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <Boxes size={18} />
              <span>Inventory</span>
            </a>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <a href="#settings" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </a>
          <a href="#logout" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors">
            <LogOut size={18} />
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          {/* Search Bar */}
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-slate-400 placeholder:text-slate-400"
            />
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-4">
            <button className="text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <button className="text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors">
              <HelpCircle size={20} />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" 
              alt="User Avatar" 
              className="w-8 h-8 rounded-full border border-slate-200 object-cover"
            />
          </div>
        </header>

        {/* SUB-VIEW CONTAINER */}
        <main className="flex-1 overflow-auto p-8">
          
          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Orders</h2>
              <p className="text-sm text-slate-500 mt-1">Manage and track recent customer orders.</p>
            </div>
            
            {/* Filter and Export Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                <SlidersHorizontal size={16} />
                <span>Filter</span>
              </button>
              <button className="flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* DATA TABLE CONTAINER */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-6">Order ID</th>
                    <th className="py-3 px-6">Customer Name</th>
                    <th className="py-3 px-6">Product</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Amount (₹)</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                  {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 font-semibold text-blue-600 hover:underline cursor-pointer">
                        {order.id}
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-900">{order.customer}</td>
                      <td className="py-4 px-6 text-slate-600">{order.product}</td>
                      <td className="py-4 px-6 text-slate-500">{order.date}</td>
                      <td className="py-4 px-6 font-medium text-slate-900">{order.amount}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusStyles(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION BAR */}
            <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between bg-white text-sm text-slate-500">
              <div>
                Showing <span className="font-medium text-slate-800">1</span> to <span className="font-medium text-slate-800">5</span> of <span className="font-medium text-slate-800">42</span> entries
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-400 disabled:opacity-50 transition-colors" disabled>
                  <ChevronLeft size={16} />
                </button>
                <button className="px-3.5 py-1.5 bg-[#1e6091] text-white font-medium rounded-lg text-sm">1</button>
                <button className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 font-medium rounded-lg text-sm transition-colors text-slate-700">2</button>
                <button className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 font-medium rounded-lg text-sm transition-colors text-slate-700">3</button>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
