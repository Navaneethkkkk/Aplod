import React from "react";
import { Image } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProductPreview from "./ProductPreview";

function ProductForm() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Content Area */}
        <div className="flex flex-1 gap-6 p-6 overflow-hidden">
          
          {/* Left Side Form */}
          <div className="flex-1 max-w-3xl overflow-y-auto pr-2">
            <div className="space-y-6">
              
              {/* Basic Information */}
              <div className="bg-white rounded-2xl border p-5">
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

              {/* Pricing & Inventory */}
              <div className="bg-white rounded-2xl border p-5">
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
                    placeholder="Stock Quantity"
                  />
                </div>
              </div>

              {/* Product Images */}
              <div className="bg-white rounded-2xl border p-5">
                <h2 className="text-xl font-semibold mb-4">
                  Product Images
                </h2>

                <div className="border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center">
                  <Image
                    size={50}
                    className="text-gray-400"
                  />

                  <p className="mt-2 text-gray-500">
                    Upload Images
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pb-4">
                <button className="px-6 py-3 border rounded-lg hover:bg-gray-50">
                  Cancel
                </button>

                <button className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                  Add Product
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Preview */}
          <div className="w-96 shrink-0">
            <div className="sticky top-4">
              <ProductPreview />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductForm;