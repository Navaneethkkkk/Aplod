import React from 'react';

function AdminPanel() {
  // Sample data for the cards
  const items = [
    {
      id: 1,
      name: "iPhone 15 Pro Matte Case",
      price: "₹1,299",
      screenType: "6.1-inch OLED",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Samsung S24 Ultra Clear Case",
      price: "₹999",
      screenType: "6.8-inch AMOLED",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Pixel 8 Pro Leather Case",
      price: "₹1,499",
      screenType: "6.7-inch Super Actua",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-gray-800 font-sans">
      
      {/* Header Area */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage your premium cases, screen specifications, and pricing.</p>
        </div>
        <button className="self-start md:self-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/10 active:scale-95 text-sm">
          + Add New Case
        </button>
      </header>

      {/* Main Grid for Cards */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="group relative rounded-2xl border border-gray-200/80 bg-white/70 backdrop-blur-md overflow-hidden hover:border-blue-500/50 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col shadow-sm"
          >
            {/* Case Photo */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm">
                  Click to Edit Image
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                
                {/* Specs Section */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-bold text-emerald-600 text-base">{item.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Screen Size:</span>
                    <span className="font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded text-xs">
                      {item.screenType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons inside Card */}
              <div className="mt-6 grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors text-center">
                  Edit Details
                </button>
                <button className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-lg transition-colors text-center">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default AdminPanel;