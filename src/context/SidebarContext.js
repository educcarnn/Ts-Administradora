import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [showImoveisOptions, setShowImoveisOptions] = useState(false);

  return (
    <SidebarContext.Provider value={{ showImoveisOptions, setShowImoveisOptions }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
