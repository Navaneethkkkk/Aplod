import React from "react";
import { Image } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProductPreview from "./ProductPreview";

function ProductForm() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <Header />

        <div className="w-96 sticky top-24 h-fit">
          <ProductPreview />

  
          {/* Form Section */}
          <div className="flex-1 space-y-4">

            <div className="bg-white rounded-2xl border p-4">
              <h2 className="text-xl font-semibold mb-4">
                Basic Information
              </h2>

              <input
                className="w-full border rounded-lg p-3 mb-3"
                placeholder="Product Name"
              />

              <div className="grid grid-cols-2 gap-3">
                <select className="border rounded-lg p-3">
                  <option>Select Category</option>
                </select>

                <input
                  className="border rounded-lg p-3"
                  placeholder="SKU"
                />
              </div>

              <textarea
                rows={4}
                className="w-full border rounded-lg p-3 mt-3"
                placeholder="Description"
              />
            </div>

            <div className="bg-white rounded-2xl border p-4">
              <h2 className="text-xl font-semibold mb-4">
                Pricing & Inventory
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <input
                  className="border rounded-lg p-3"
                  placeholder="₹ 0.00"
                />

                <input
                  className="border rounded-lg p-3"
                  placeholder="Stock"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border p-4">
              <h2 className="text-xl font-semibold mb-4">
                Product Images
              </h2>

              <div className="border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center">
                <Image size={50} className="text-gray-400" />
                <p className="mt-2 text-gray-500">
                  Upload Images
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="px-6 py-2 border rounded-lg">
                Cancel
              </button>

              <button className="px-6 py-2 bg-blue-700 text-white rounded-lg">
                Add Product
              </button>
            </div>

          </div>

          {/* Preview Section */}
          <div className="w-96">
            <ProductPreview />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductForm;