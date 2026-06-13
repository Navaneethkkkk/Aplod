import React from "react";
import { Image } from "lucide-react";
import { useAdminTheme } from "../context/AdminThemeContext";

const isVideoMedia = (media) => typeof media === "string" && media.startsWith("data:video");

function ProductPreview({ product = {} }) {
  const { isDark } = useAdminTheme();
  const images = product.images?.length ? product.images : product.imageUrl ? [product.imageUrl] : [];
  const panelClass = isDark
    ? "bg-slate-950 border-slate-800 text-slate-100"
    : "bg-white border-slate-100 text-slate-900 shadow-sm";
  const previewClass = isDark
    ? "border-slate-800 bg-slate-900"
    : "border-slate-200 bg-slate-50";

  return (
    <div className={`border rounded-2xl overflow-hidden ${panelClass}`}>
      <div className={`p-4 border-b ${isDark ? "border-slate-800" : "border-slate-100"}`}>
        <h3 className="text-xl font-semibold">Live Preview</h3>
      </div>

      <div className="p-4">
        <div className={`h-44 sm:h-48 border rounded-2xl flex items-center justify-center ${previewClass}`}>
          {isVideoMedia(images[0]) ? (
            <video
              src={images[0]}
              controls
              muted
              className="h-full w-full rounded-2xl object-contain bg-black"
            />
          ) : images[0] ? (
            <img
              src={images[0]}
              alt={product.name || "Product preview"}
              className="h-full w-full object-cover rounded-2xl"
            />
          ) : (
            <Image size={50} className="text-gray-400" />
          )}
        </div>

        <span className={`inline-block mt-4 px-3 py-1 rounded-full text-sm ${
          isDark ? "bg-slate-800 text-slate-300" : "bg-gray-200 text-slate-700"
        }`}>
          {product.categoryName || "Category"}
        </span>

        <h2 className="text-xl font-bold mt-3 break-words">
          {product.name || "Product Name Preview"}
        </h2>

        <p className={`text-3xl font-bold mt-3 ${isDark ? "text-sky-300" : "text-blue-900"}`}>
          ₹ {Number(product.price || 0).toLocaleString("en-IN")}
        </p>

        <p className={`mt-3 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
          Stock: {product.stock || 0} units
        </p>

        {images.length > 1 && (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              isVideoMedia(image) ? (
                <video
                  key={`${index}-${image.slice(0, 24)}`}
                  src={image}
                  muted
                  className={`h-14 w-full rounded-lg object-cover border bg-black ${isDark ? "border-slate-800" : "border-slate-200"}`}
                />
              ) : (
                <img
                  key={`${index}-${image.slice(0, 24)}`}
                  src={image}
                  alt={`Product media ${index + 1}`}
                  className={`h-14 w-full rounded-lg object-cover border ${isDark ? "border-slate-800" : "border-slate-200"}`}
                />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPreview;
