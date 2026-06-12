import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Edit3,
  FolderPlus,
  MoreVertical,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAdminTheme } from "../context/AdminThemeContext";
import { api } from "../api";

const initialCategories = [
  {
    _id: "1",
    name: "iPhone Cases",
    slug: "iphone-cases",
    productCount: 128,
    status: "Active",
    featured: true,
  },
  {
    _id: "2",
    name: "Samsung Covers",
    slug: "samsung-covers",
    productCount: 96,
    status: "Active",
    featured: true,
  },
  {
    _id: "3",
    name: "Tablet Accessories",
    slug: "tablet-accessories",
    productCount: 42,
    status: "Draft",
    featured: false,
  },
];

function Category() {
  const { isDark } = useAdminTheme();
  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    status: "Active",
    featured: false,
  });
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    api
      .getCategories()
      .then((data) => {
        if (data.length) setCategories(data);
      })
      .catch(() => setNotice("Showing sample categories until backend database connects."));
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [categories, query]);

  const pageClass = isDark
    ? "bg-slate-900 text-slate-100"
    : "bg-slate-100/40 text-slate-900";
  const panelClass = isDark
    ? "bg-slate-950 border-slate-800 shadow-none"
    : "bg-white border-slate-100 shadow-sm";
  const inputClass = isDark
    ? "bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500"
    : "bg-white border-slate-200 text-slate-900";

  const handleNameChange = (value) => {
    setForm((current) => ({
      ...current,
      name: value,
      slug: value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }));
  };

  const addCategory = (event) => {
    event.preventDefault();

    if (!form.name.trim()) return;

    setCategories((current) => [
      {
        _id: `local-${Date.now()}`,
        name: form.name.trim(),
        slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-"),
        description: form.description,
        productCount: 0,
        status: form.status,
        featured: form.featured,
      },
      ...current,
    ]);

    api.createCategory(form).catch(() => {
      setNotice("Category added in UI. Backend save needs MongoDB connection.");
    });

    setForm({ name: "", slug: "", description: "", status: "Active", featured: false });
  };

  const deleteCategory = (id) => {
    setCategories((current) => current.filter((category) => category._id !== id));
    if (!String(id).startsWith("local-")) {
      api.deleteCategory(id).catch(() => {
        setNotice("Category removed in UI. Backend delete needs MongoDB connection.");
      });
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors ${pageClass}`}>
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Category</h2>
              <p className={isDark ? "text-slate-400" : "text-slate-500"}>
                Create, organize, and manage product categories.
              </p>
              {notice && <p className="text-sm text-amber-500 mt-2">{notice}</p>}
            </div>

            <div className={`relative w-full md:w-80 rounded-2xl border ${inputClass}`}>
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search category..."
                className="w-full bg-transparent pl-11 pr-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
            <form
              onSubmit={addCategory}
              className={`rounded-2xl border p-5 h-fit ${panelClass}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <FolderPlus size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Add Category</h3>
                  <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                    Set name, URL slug, and visibility.
                  </p>
                </div>
              </div>

              <label className="text-sm font-semibold">Category Name</label>
              <input
                value={form.name}
                onChange={(event) => handleNameChange(event.target.value)}
                placeholder="Example: iPhone Cases"
                className={`mt-2 mb-4 w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
              />

              <label className="text-sm font-semibold">Slug</label>
              <input
                value={form.slug}
                onChange={(event) =>
                  setForm((current) => ({ ...current, slug: event.target.value }))
                }
                placeholder="iphone-cases"
                className={`mt-2 mb-4 w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
              />

              <label className="text-sm font-semibold">Description</label>
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({ ...current, description: event.target.value }))
                }
                placeholder="Short category note"
                rows={3}
                className={`mt-2 mb-4 w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
              />

              <label className="text-sm font-semibold">Status</label>
              <select
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({ ...current, status: event.target.value }))
                }
                className={`mt-2 mb-4 w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
              >
                <option>Active</option>
                <option>Draft</option>
              </select>

              <label className="flex items-center justify-between gap-3 mb-5">
                <span>
                  <span className="block text-sm font-semibold">Featured</span>
                  <span className={isDark ? "text-xs text-slate-400" : "text-xs text-slate-500"}>
                    Show this category in highlighted sections.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      featured: event.target.checked,
                    }))
                  }
                  className="h-5 w-5 accent-indigo-600"
                />
              </label>

              <button className="w-full bg-blue-700 text-white rounded-xl py-3 font-semibold hover:bg-blue-800 transition">
                Add Category
              </button>
            </form>

            <section className={`rounded-2xl border overflow-hidden ${panelClass}`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5 border-b border-inherit">
                <div>
                  <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                    Total
                  </p>
                  <h4 className="text-2xl font-bold">{categories.length}</h4>
                </div>
                <div>
                  <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                    Active
                  </p>
                  <h4 className="text-2xl font-bold">
                    {categories.filter((category) => category.status === "Active").length}
                  </h4>
                </div>
                <div>
                  <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                    Featured
                  </p>
                  <h4 className="text-2xl font-bold">
                    {categories.filter((category) => category.featured).length}
                  </h4>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px]">
                  <thead className={isDark ? "bg-slate-900 text-slate-300" : "bg-slate-100 text-slate-700"}>
                    <tr className="text-left">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Slug</th>
                      <th className="px-6 py-4">Products</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Featured</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCategories.map((category) => (
                      <tr
                        key={category._id}
                        className={`border-t transition ${
                          isDark
                            ? "border-slate-800 hover:bg-slate-900"
                            : "border-slate-100 hover:bg-slate-50"
                        }`}
                      >
                        <td className="px-6 py-4 font-semibold">{category.name}</td>
                        <td className={isDark ? "px-6 py-4 text-slate-400" : "px-6 py-4 text-slate-500"}>
                          /{category.slug}
                        </td>
                        <td className="px-6 py-4">{category.productCount || 0}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                              category.status === "Active"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            <CheckCircle2 size={13} />
                            {category.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {category.featured ? (
                            <span className="inline-flex items-center gap-1 text-amber-500 font-semibold">
                              <Star size={16} fill="currentColor" />
                              Yes
                            </span>
                          ) : (
                            <span className={isDark ? "text-slate-500" : "text-slate-400"}>
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600">
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => deleteCategory(category._id)}
                              className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button className={isDark ? "p-2 text-slate-400" : "p-2 text-slate-500"}>
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Category;
