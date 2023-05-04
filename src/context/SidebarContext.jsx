import { createContext, useReducer } from "react";
import { Outlet } from "react-router-dom";

export const SidebarContext = createContext();

const sidebarReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
};

export const SidebarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sidebarReducer, {
    isSidebarOpen: true,
  });

  return (
    <SidebarContext.Provider value={{ ...state, dispatch }}>
      {children || <Outlet />}
    </SidebarContext.Provider>
  );
};
