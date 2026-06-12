import React, { useEffect, useMemo, useState } from "react";
import { Image, Loader2 } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProductPreview from "./ProductPreview";
import { useAdminTheme } from "../context/AdminThemeContext";
import { api } from "../api";

const defaultCategories = [
  { name: "iPhone Cases", slug: "iphone-cases" },
  { name: "Samsung Covers", slug: "samsung-covers" },
  { name: "Tablet Accessories", slug: "tablet-accessories" },
];

function ProductForm() {
  const { isDark } = useAdminTheme();
  const [categories, setCategories] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    images: [],
    status: "Active",
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await api.getCategories();
        console.log("Categories from API:", data);

        if (data.length) {
          setCategories(data);
          return;
        }

        const createdCategories = await Promise.all(
          defaultCategories.map((category) =>
            api.createCategory({
              ...category,
              status: "Active",
            })
          )
        );
        console.log("Created default categories:", createdCategories);
        setCategories(createdCategories);
      } catch (error) {
        console.error("Category fetch failed:", error);
        setMessage(error.message || "Categories could not be loaded");
      }
    };

    loadCategories();
  }, []);

  const pageClass = isDark
    ? "bg-slate-900 text-slate-100"
    : "bg-gray-100 text-slate-900";
  const cardClass = isDark
    ? "bg-slate-950 border-slate-800"
    : "bg-white border-slate-100 shadow-sm";
  const inputClass = isDark
    ? "bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500"
    : "bg-white border-slate-200 text-slate-900";

  const selectedCategoryName = useMemo(() => {
    return categories.find((category) => category._id === form.category)?.name;
  }, [categories, form.category]);

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const emptyForm = {
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    images: [],
    status: "Active",
  };

  const handleImageChange = async (event) => {
    const remainingSlots = 4 - form.images.length;
    const files = Array.from(event.target.files || []).slice(0, remainingSlots);
    if (!files.length) return;

    const images = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      )
    );

    setForm((current) => {
      const nextImages = [...current.images, ...images].slice(0, 4);
      return { ...current, images: nextImages, imageUrl: nextImages[0] || "" };
    });
    event.target.value = "";
  };

  const removeImage = (indexToRemove) => {
    setForm((current) => {
      const nextImages = current.images.filter((_, index) => index !== indexToRemove);
      return { ...current, images: nextImages, imageUrl: nextImages[0] || "" };
    });
  };

  const saveProductLocally = () => {
    const selectedCategory = categories.find((category) => category._id === form.category);
    const savedProducts = JSON.parse(localStorage.getItem("aplodProducts") || "[]");
    const product = {
      _id: `local-${Date.now()}`,
      name: form.name,
      category: selectedCategory
        ? { _id: selectedCategory._id, name: selectedCategory.name, slug: selectedCategory.slug }
        : { name: "iPhone Cases", slug: "iphone-cases" },
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      imageUrl: form.images[0] || "",
      images: form.images,
      status: form.status,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("aplodProducts", JSON.stringify([product, ...savedProducts]));
    return product;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      if (form.images.length < 3) {
        setMessage("Please add at least 3 photos");
        setIsSaving(false);
        return;
      }

      await api.createProduct({
        ...form,
        category: form.category,
        imageUrl: form.images[0] || "",
        price: Number(form.price),
        stock: Number(form.stock),
      });

      setMessage("Product saved successfully");
      setForm(emptyForm);
    } catch (error) {
      saveProductLocally();
      setMessage("Backend unavailable, so product saved locally");
      setForm(emptyForm);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`flex min-h-screen overflow-hidden transition-colors ${pageClass}`}>
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Add Product</h2>
            <p className={isDark ? "text-slate-400" : "text-slate-500"}>
              Add product details, pricing, inventory, and up to 4 photos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6">
            <div className="space-y-6 min-w-0">
              <section className={`rounded-2xl border p-5 ${cardClass}`}>
                <h3 className="text-xl font-semibold mb-4">Basic Information</h3>

                <input
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  className={`w-full border rounded-xl p-3 mb-3 outline-none focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
                  placeholder="Product Name"
                  required
                />

                <select
                  value={form.category}
                  onChange={(event) => updateForm("category", event.target.value)}
                  className={`w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <textarea
                  value={form.description}
                  onChange={(event) => updateForm("description", event.target.value)}
                  rows={4}
                  className={`w-full border rounded-xl p-3 mt-3 outline-none focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
                  placeholder="Description"
                />
              </section>

              <section className={`rounded-2xl border p-5 ${cardClass}`}>
                <h3 className="text-xl font-semibold mb-4">Pricing & Inventory</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    value={form.price}
                    onChange={(event) => updateForm("price", event.target.value)}
                    type="number"
                    min="0"
                    className={`border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
                    placeholder="₹ 0.00"
                    required
                  />

                  <input
                    value={form.stock}
                    onChange={(event) => updateForm("stock", event.target.value)}
                    type="number"
                    min="0"
                    className={`border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
                    placeholder="Stock Quantity"
                    required
                  />

                  <select
                    value={form.status}
                    onChange={(event) => updateForm("status", event.target.value)}
                    className={`border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
                  >
                    <option>Active</option>
                    <option>Draft</option>
                  </select>
                </div>
              </section>

              <section className={`rounded-2xl border p-5 ${cardClass}`}>
                <h3 className="text-xl font-semibold mb-4">Product Photos</h3>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className={`w-full border rounded-xl p-3 mb-3 outline-none focus:ring-2 focus:ring-indigo-500 ${inputClass}`}
                />

                <div className={`border-2 border-dashed rounded-xl min-h-36 sm:min-h-44 p-3 flex flex-col items-center justify-center overflow-hidden ${
                  isDark ? "border-slate-800 bg-slate-900" : "border-slate-200"
                }`}>
                  {form.images.length ? (
                    <div className="grid grid-cols-2 gap-3 w-full">
                      {form.images.map((image, index) => (
                        <div key={image} className="relative h-32 sm:h-40 rounded-lg bg-white overflow-hidden">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="h-full w-full object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 rounded-full bg-black/75 px-2 py-1 text-xs font-bold text-white"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <Image size={44} className="text-gray-400" />
                      <p className={isDark ? "mt-2 text-slate-400" : "mt-2 text-gray-500"}>
                        Upload 3 or 4 photos
                      </p>
                    </>
                  )}
                </div>
                <p className={isDark ? "mt-3 text-sm text-slate-400" : "mt-3 text-sm text-gray-500"}>
                  {form.images.length}/4 photos added. Add minimum 3 photos.
                </p>
              </section>

              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pb-4">
                {message && (
                  <p className={`sm:mr-auto text-sm ${message.includes("success") ? "text-emerald-500" : "text-amber-500"}`}>
                    {message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setForm(emptyForm)}
                  className={`px-6 py-3 border rounded-lg ${isDark ? "border-slate-800 hover:bg-slate-800" : "hover:bg-gray-50"}`}
                >
                  Cancel
                </button>

                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                  {isSaving && <Loader2 size={16} className="animate-spin" />}
                  Add Product
                </button>
              </div>
            </div>

            <aside className="xl:sticky xl:top-4 h-fit">
              <ProductPreview
                product={{
                  ...form,
                  categoryName: selectedCategoryName,
                }}
              />
            </aside>
          </form>
        </main>
      </div>
    </div>
  );
}

export default ProductForm;