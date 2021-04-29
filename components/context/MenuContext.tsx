import { createContext, Dispatch, SetStateAction, useState } from "react";

// Context
export const MenuToggleContext = createContext(null);

// Type
export interface MenuToggleProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

// Provider
export const MenuToggleProvider = ({ children }) => {
  // Menu Toggle Ref
  const [show, setShow] = useState(false);

  const MenuToggleProps = {
    show: show,
    setShow: setShow,
  };

  return <MenuToggleContext.Provider value={MenuToggleProps}>{children}</MenuToggleContext.Provider>;
};
