import { useState } from "react"
import { MenuContext } from "./MenuContexts"


export const MenuProvider = ( {children} : {children:JSX.Element} )  => {

    const [selectedItemMenu, setSelectedItemMenu] = useState<number>(1)
    const [openState, setOpenState] = useState<boolean>(true)
    return(
        <MenuContext.Provider value={{
            selectedItemMenu,
            setSelectedItemMenu,
            openState,
            setOpenState
        }}>
            {children}
        </MenuContext.Provider>
    )
}
