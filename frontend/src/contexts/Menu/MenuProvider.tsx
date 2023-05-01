import { useContext, useState } from "react"
import { _MenuContext } from "./MenuContexts"



export const MenuProvider = ( {children} : {children:JSX.Element} )  => {

    const [selectedItemMenu, setSelectedItemMenu] = useState<number>(1)
    const [openState, setOpenState] = useState<boolean>(true)
    return(
        <_MenuContext.Provider value={{
            selectedItemMenu,
            setSelectedItemMenu,
            openState,
            setOpenState
        }}>
            {children}
        </_MenuContext.Provider>
    )
}

//export const menuContext = useContext(_MenuContext);