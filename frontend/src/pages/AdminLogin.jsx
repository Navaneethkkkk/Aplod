import React, { useState } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ChevronRight,
  Sun,
  Moon,
  ShieldAlert,
  CheckCircle,
} from "lucide-react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const adminCredentials = {
    email: "admin@gmail.com",
    password: "admin123",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    setTimeout(() => {
      if (
        email === adminCredentials.email &&
        password === adminCredentials.password
      ) {
        setMessage("Login Successful");
      } else {
        setMessage("Invalid Email or Password");
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
      </div>

      {/* Theme Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 p-3 rounded-xl bg-violet-600 text-white"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Login Card */}
      <div
        className={`relative w-full max-w-md rounded-3xl border shadow-2xl backdrop-blur-lg ${
          darkMode
            ? "bg-slate-900/80 border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-violet-500/20">
              <Lock className="text-violet-400" size={32} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center">
            Admin Login
          </h1>

          <p className="text-center text-slate-400 mt-2 mb-8">
            Sign in to access the admin panel
          </p>

          {message && (
            <div
              className={`mb-5 p-3 rounded-xl flex items-center gap-2 ${
                message === "Login Successful"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {message === "Login Successful" ? (
                <CheckCircle size={18} />
              ) : (
                <ShieldAlert size={18} />
              )}
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none ${
                    darkMode
                      ? "bg-slate-950 border-slate-800"
                      : "bg-slate-50 border-slate-300"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border outline-none ${
                    darkMode
                      ? "bg-slate-950 border-slate-800"
                      : "bg-slate-50 border-slate-300"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2"
            >
              {loading ? "Logging In..." : "Login"}
              {!loading && <ChevronRight size={18} />}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;