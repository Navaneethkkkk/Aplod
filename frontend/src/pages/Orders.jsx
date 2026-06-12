import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  SlidersHorizontal,
} from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAdminTheme } from "../context/AdminThemeContext";
import { api } from "../api";

const fallbackOrders = [
  {
    _id: "1",
    orderNumber: "#ORD-001",
    customerName: "Rajesh Kumar",
    productName: "iPhone 14 Pro Case - Black",
    createdAt: "2023-10-24",
    totalAmount: 1499,
    status: "Pending",
  },
  {
    _id: "2",
    orderNumber: "#ORD-002",
    customerName: "Priya Sharma",
    productName: "Samsung S23 Ultra Clear Case",
    createdAt: "2023-10-23",
    totalAmount: 999,
    status: "Shipped",
  },
  {
    _id: "3",
    orderNumber: "#ORD-003",
    customerName: "Amit Singh",
    productName: "Pixel 7 Leather Cover - Brown",
    createdAt: "2023-10-22",
    totalAmount: 2499,
    status: "Delivered",
  },
  {
    _id: "4",
    orderNumber: "#ORD-004",
    customerName: "Neha Gupta",
    productName: "OnePlus 11 Silicone Case - Red",
    createdAt: "2023-10-21",
    totalAmount: 799,
    status: "Cancelled",
  },
];

export default function Orders() {
  const { isDark } = useAdminTheme();
  const [orders, setOrders] = useState(fallbackOrders);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    api
      .getOrders()
      .then((data) => {
        if (data.length) setOrders(data);
      })
      .catch(() => setNotice("Showing sample orders until backend database connects."));
  }, []);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-emerald-100 text-emerald-700";
      case "Cancelled":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const pageClass = isDark
    ? "bg-slate-900 text-slate-100"
    : "bg-slate-100/40 text-slate-900";
  const panelClass = isDark
    ? "bg-slate-950 border-slate-800"
    : "bg-white border-slate-100 shadow-sm";
  const buttonClass = isDark
    ? "border-slate-800 hover:bg-slate-800"
    : "border-slate-200 hover:bg-slate-50";

  const getProductName = (order) => {
    return order.productName || order.items?.[0]?.name || "Product";
  };

  const updateStatus = async (id, status) => {
    setOrders((current) =>
      current.map((order) => (order._id === id ? { ...order, status } : order))
    );

    try {
      await api.updateOrderStatus(id, status);
    } catch {
      setNotice("Status changed in UI. Backend update needs MongoDB connection.");
    }
  };

  return (
    <div className={`flex min-h-screen overflow-hidden transition-colors ${pageClass}`}>
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Orders</h2>
              <p className={isDark ? "text-slate-400" : "text-slate-500"}>
                Manage and track customer orders.
              </p>
              {notice && <p className="text-sm text-amber-500 mt-2">{notice}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className={`flex items-center justify-center gap-2 border px-4 py-2 rounded-lg ${buttonClass}`}>
                <SlidersHorizontal size={16} />
                Filter
              </button>

              <button className={`flex items-center justify-center gap-2 border px-4 py-2 rounded-lg ${buttonClass}`}>
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          <section className={`rounded-2xl border overflow-hidden ${panelClass}`}>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full min-w-[880px]">
                <thead className={isDark ? "bg-slate-900 text-slate-300" : "bg-slate-100 text-slate-700"}>
                  <tr className="text-left">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className={`border-t ${isDark ? "border-slate-800 hover:bg-slate-900" : "border-slate-100 hover:bg-slate-50"}`}
                    >
                      <td className="px-6 py-4 font-semibold text-blue-600">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4">{order.customerName}</td>
                      <td className="px-6 py-4">{getProductName(order)}</td>
                      <td className="px-6 py-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(event) => updateStatus(order._id, event.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold outline-none ${getStatusStyles(order.status)}`}
                        >
                          <option>Pending</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button>
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden divide-y divide-slate-200 dark:divide-slate-800">
              {orders.map((order) => (
                <article key={order._id} className={`p-4 ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-blue-600">{order.orderNumber}</p>
                      <h3 className="font-semibold mt-1">{order.customerName}</h3>
                      <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                        {getProductName(order)}
                      </p>
                    </div>
                    <select
                      value={order.status}
                      onChange={(event) => updateStatus(order._id, event.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold outline-none ${getStatusStyles(order.status)}`}
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    <strong>₹{Number(order.totalAmount).toLocaleString("en-IN")}</strong>
                  </div>
                </article>
              ))}
            </div>

            <div className={`border-t px-4 md:px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center ${
              isDark ? "border-slate-800" : "border-slate-100"
            }`}>
              <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                Showing {orders.length} entries
              </p>

              <div className="flex gap-2">
                <button className={`border p-2 rounded ${buttonClass}`}>
                  <ChevronLeft size={16} />
                </button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded">1</button>
                <button className={`border p-2 rounded ${buttonClass}`}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
