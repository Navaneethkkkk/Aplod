import React, { useState } from 'react';
import { ShoppingBag, Package, TrendingUp, Users, Eye, Plus, Search, Filter } from 'lucide-react';

// Sample case data with images, prices, and details
const initialCases = [
  {
    id: 1,
    name: "Premium Leather Case",
    brand: "TechArmor",
    price: 49.99,
    color: "Black",
    material: "Genuine Leather",
    stock: 45,
    sold: 128,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Clear Crystal Case",
    brand: "Spigen",
    price: 19.99,
    color: "Transparent",
    material: "Polycarbonate",
    stock: 120,
    sold: 342,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&h=200&fit=crop",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Rugged Armor Case",
    brand: "OtterBox",
    price: 59.99,
    color: "Gunmetal",
    material: "Silicone + Plastic",
    stock: 28,
    sold: 95,
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=200&h=200&fit=crop",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Slim Carbon Fiber",
    brand: "Pitaka",
    price: 89.99,
    color: "Carbon",
    material: "Aramid Fiber",
    stock: 15,
    sold: 67,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop",
    rating: 4.7,
  },
  {
    id: 5,
    name: "MagSafe Compatible",
    brand: "Apple",
    price: 79.99,
    color: "Midnight",
    material: "Silicone",
    stock: 52,
    sold: 210,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&h=200&fit=crop",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Wallet Case",
    brand: "Smartish",
    price: 34.99,
    color: "Brown",
    material: "PU Leather",
    stock: 33,
    sold: 88,
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=200&h=200&fit=crop",
    rating: 4.4,
  },
];

// Calculate totals
const totalCases = initialCases.reduce((sum, item) => sum + item.stock, 0);
const totalSales = initialCases.reduce((sum, item) => sum + item.sold, 0);
const totalRevenue = initialCases.reduce((sum, item) => sum + (item.sold * item.price), 0);
const averagePrice = (initialCases.reduce((sum, item) => sum + item.price, 0) / initialCases.length).toFixed(2);

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        {trend && <p className="text-green-500 text-xs mt-2 flex items-center gap-1"><TrendingUp size={12}/> +{trend}% from last month</p>}
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

const CaseCard = ({ caseItem }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={caseItem.image} 
          alt={caseItem.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
          ⭐ {caseItem.rating}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-gray-800">{caseItem.name}</h3>
            <p className="text-sm text-gray-500">{caseItem.brand}</p>
          </div>
          <span className="text-lg font-bold text-blue-600">${caseItem.price}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1"><Package size={14}/> Stock: {caseItem.stock}</span>
          <span className="flex items-center gap-1"><ShoppingBag size={14}/> Sold: {caseItem.sold}</span>
        </div>
        
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="w-full mt-2 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
        >
          <Eye size={16}/> {showDetails ? "Hide Details" : "View Details"}
        </button>
        
        {showDetails && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm space-y-1 animate-fadeIn">
            <p><span className="font-medium">Color:</span> {caseItem.color}</p>
            <p><span className="font-medium">Material:</span> {caseItem.material}</p>
            <p><span className="font-medium">Revenue:</span> ${(caseItem.sold * caseItem.price).toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  
  const filteredCases = initialCases.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedCases = [...filteredCases].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "sold") return b.sold - a.sold;
    if (sortBy === "stock") return b.stock - a.stock;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Admin Panel - Case Dashboard</h1>
              <p className="text-blue-200 text-sm mt-1">Manage & track your phone case inventory</p>
            </div>
            <button className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
              <Plus size={18}/> Add New Case
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Cases" value={totalCases} icon={Package} color="bg-blue-500" trend="12" />
          <StatCard title="Total Sales" value={totalSales} icon={ShoppingBag} color="bg-green-500" trend="8" />
          <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={TrendingUp} color="bg-purple-500" trend="15" />
          <StatCard title="Average Price" value={`$${averagePrice}`} icon={Users} color="bg-orange-500" />
        </div>
        
        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18}/>
              <input
                type="text"
                placeholder="Search by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500"/>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="sold">Most Sold</option>
              <option value="stock">Most Stock</option>
            </select>
          </div>
        </div>
        
        {/* Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedCases.map(caseItem => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>
        
        {sortedCases.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <Package size={48} className="mx-auto text-gray-400 mb-4"/>
            <p className="text-gray-500 text-lg">No cases found matching your search.</p>
          </div>
        )}
      </main>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;