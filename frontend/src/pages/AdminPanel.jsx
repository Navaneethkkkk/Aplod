import React from "react";
import {
  Plus,
  Bell,
  Settings,
  Search,
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
} from "lucide-react";
import Sidebar from "./Sidebar";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function AdminPanel() {
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
      icon: <DollarSign size={22} />,
    },
    {
      title: "Orders",
      value: "1,432",
      icon: <ShoppingCart size={22} />,
    },
    {
      title: "Products",
      value: "3,204",
      icon: <Package size={22} />,
    },
    {
      title: "Avg Order Value",
      value: "$86.94",
      icon: <TrendingUp size={22} />,
    },
  ];

  const categories = [
    "iPhone Cases",
    "Screen Protectors",
    "Power & Charging",
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className=" md:ml-60">
        {/* Header */}
<header className="sticky top-0 z-20 bg-white border-b h-16 px-4 flex items-center justify-between shadow-sm">          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search inventory..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell
              size={20}
              className="cursor-pointer text-gray-600"
            />

            <Settings
              size={20}
              className="cursor-pointer text-gray-600"
            />

            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 space-y-8">
          {/* Dashboard Header */}
          <div className="flex justify-between ">
            <div>
              <h2 className="text-3xl font-bold">
                Dashboard
              </h2>

              <p className="text-gray-500 mt-1">
                Welcome back. Here's what's happening today.
              </p>
            </div>

            <button className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800">
              <Plus size={18} />
              Add Product
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {kpiData.map((item, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <div className="text-blue-700">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-3xl font-bold mt-4">
                  {item.value}
                </h3>
              </div>
            ))}
          </div>

          {/* Revenue Analytics */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">
                Revenue Analytics
              </h3>

              <select className="border rounded-lg px-3 py-2">
                <option>Last 6 Months</option>
              </select>
            </div>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="revenue"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Categories */}
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-semibold">
                Primary Categories
              </h3>

              <button className="text-blue-700 font-medium">
                View All
              </button>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={`https://picsum.photos/400/250?random=${index}`}
                    alt={category}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-4">
                    <h4 className="text-xl font-semibold">
                      {category}
                    </h4>

                    <p className="text-gray-500 mt-2 text-sm">
                      Manage products under this category.
                    </p>

                    <button className="mt-4 w-full border border-blue-700 text-blue-700 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition">
                      Manage Category
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminPanel;