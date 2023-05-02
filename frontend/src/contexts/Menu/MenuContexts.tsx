import { createContext, useContext } from "react";

export interface MenuContextType  {
    selectedItemMenu: number,
    setSelectedItemMenu: React.Dispatch<React.SetStateAction<number>>,
    openState: boolean,
    setOpenState: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuContext = createContext<MenuContextType>(null!); 

export const useMenuContext = () => useContext(MenuContext);

