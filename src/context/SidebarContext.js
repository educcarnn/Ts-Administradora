// SidebarContext.js
import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }) {
  const [activeSection, setActiveSection] = useState("imoveis");

  const value = {
    activeSection,
    setActiveSection,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
