const API_BASE_URLS = import.meta.env.VITE_API_URL
  ? [import.meta.env.VITE_API_URL]
  : [
      "http://127.0.0.1:6004/api",
    ];

async function request(path, options = {}) {
  let lastError;

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Request failed");
      }

      return data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Request failed");
}

export const api = {
  getCategories: () => request("/categories"),
  createCategory: (payload) =>
    request("/categories", { method: "POST", body: JSON.stringify(payload) }),
  updateCategory: (id, payload) =>
    request(`/categories/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: "DELETE" }),

  getProducts: () => request("/products"),
  getProduct: (id) => request(`/products/${id}`),
  createProduct: (payload) =>
    request("/products", { method: "POST", body: JSON.stringify(payload) }),

  getOrders: () => request("/orders"),
  updateOrderStatus: (id, status) =>
    request(`/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};
