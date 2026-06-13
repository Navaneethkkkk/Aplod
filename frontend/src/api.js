// src/api.js

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:6001/api";

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request Failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export const api = {
  // Admin
  login: (payload) =>
    request("/admin/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // Categories
  getCategories: () => request("/categories"),

  createCategory: (payload) =>
    request("/categories", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  updateCategory: (id, payload) =>
    request(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  deleteCategory: (id) =>
    request(`/categories/${id}`, {
      method: "DELETE",
    }),

  // Products
  getProducts: () => request("/products"),

  getProduct: (id) => request(`/products/${id}`),

  createProduct: (payload) =>
    request("/products", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // Orders
  getOrders: () => request("/orders"),

  updateOrderStatus: (id, status) =>
    request(`/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};