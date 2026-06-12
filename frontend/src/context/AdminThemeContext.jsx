import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AdminThemeContext = createContext(null);

export function AdminThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("admin-theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("admin-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const value = useMemo(
    () => ({
      isDark,
      toggleTheme: () => setIsDark((current) => !current),
    }),
    [isDark]
  );

  return (
    <AdminThemeContext.Provider value={value}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext);

  if (!context) {
    throw new Error("useAdminTheme must be used inside AdminThemeProvider");
  }

  return context;
}
