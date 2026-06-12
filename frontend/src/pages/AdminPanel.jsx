import React from "react";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";

import Sidebar from "./Sidebar";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Header from "./Header";
import { useAdminTheme } from "../context/AdminThemeContext";

function AdminPanel() {
  const { isDark } = useAdminTheme();
  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4500 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 5500 },
  ];

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$124,500",
      change: "+12.3%",
      isPositive: true,
      icon: <DollarSign size={20} />,
    },
    {
      title: "Orders Filed",
      value: "1,432",
      change: "+8.2%",
      isPositive: true,
      icon: <ShoppingCart size={20} />,
    },
    {
      title: "Active Products",
      value: "3,204",
      change: "-1.5%",
      isPositive: false,
      icon: <Package size={20} />,
    },
    {
      title: "Avg Order Value",
      value: "$86.94",
      change: "+4.1%",
      isPositive: true,
      icon: <TrendingUp size={20} />,
    },
  ];

  return (
    <div className={`flex h-screen overflow-hidden transition-colors ${
      isDark ? "bg-slate-900 text-slate-100" : "bg-slate-100/40 text-slate-900"
    }`}>
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 w-full max-w-none space-y-6">
          {/* Page Title */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Overview Dashboard</h2>
            <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Real-time metrics and store inventory updates.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {kpiData.map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  isDark
                    ? "bg-slate-950 border-slate-800"
                    : "bg-white border-slate-100 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className={`text-xs uppercase font-semibold ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {item.title}
                  </p>

                  <div className={`p-2 rounded-xl ${isDark ? "bg-indigo-500/15 text-indigo-300" : "bg-indigo-50 text-indigo-600"}`}>
                    {item.icon}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{item.value}</h3>

                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.isPositive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div className={`p-6 rounded-2xl border w-full transition-all duration-300 ${
            isDark
              ? "bg-slate-950 border-slate-800"
              : "bg-white border-slate-100 shadow-sm hover:shadow-md"
          }`}>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center mb-6">
              <div>
                <h3 className="text-xl font-bold">Revenue Performance</h3>
                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Net revenue growth statistics
                </p>
              </div>

              <select className={`border rounded-lg px-3 py-2 text-sm outline-none ${
                isDark ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200"
              }`}>
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
              </select>
            </div>

            <div className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    stroke={isDark ? "#1e293b" : "#f1f5f9"}
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis dataKey="month" axisLine={false} tickLine={false} />

                  <YAxis axisLine={false} tickLine={false} />

                  <Tooltip />

                  <Bar
                    dataKey="revenue"
                    fill="#4f46e5"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
