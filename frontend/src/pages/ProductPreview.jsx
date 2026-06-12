import React from "react";
import { Image } from "lucide-react";

function ProductPreview() {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-xl font-semibold">
          Live Preview
        </h3>
      </div>

      <div className="p-4">
        <div className="h-48 border rounded-xl bg-gray-100 flex items-center justify-center">
          <Image size={50} className="text-gray-400" />
        </div>

        <span className="inline-block mt-4 px-3 py-1 rounded-full bg-gray-200 text-sm">
          Category
        </span>

        <h2 className="text-xl font-bold mt-3">
          Product Name Preview
        </h2>

        <p className="text-3xl font-bold text-blue-900 mt-3">
          ₹ 0.00
        </p>

        <p className="mt-3 text-gray-600">
          Stock: 0 units
        </p>
      </div>
    </div>
  );
}

export default ProductPreview;