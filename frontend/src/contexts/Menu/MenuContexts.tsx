import { createContext, useContext } from "react";


export type MenuContextType = {
    selectedItemMenu: number,
    setSelectedItemMenu: React.Dispatch<React.SetStateAction<number>>,
    openState: boolean,
    setOpenState: React.Dispatch<React.SetStateAction<boolean>>
}


export const _MenuContext = createContext<MenuContextType>(null!); 





/*
Formas de encerrar os props inuteis ! 

Quando eu entrar na página, vai ter o useEfect que vai setar para onde eu quero

Quem pega a informação deve ser um context,
logo o state e o setState devem ser globais, estando no context

o context pega tal informação e dispoê pro menu

OR

--------------------------------------------------

Referente a questão de abrir e fechar, percebo que o estado de menu aberto e menu fechado também precisará ser colocado globalmente.

Assim, ao iniciar o arquivo eu pego o estado do menu, se é aberto ou fechado e faço isso para controlar a margin que será necessário colocar, talvez, tal margin seja preferivel deixar no context

por que caso eu precise mudar, eu apenas lá
--------------------------------------------------

1° passo fazer o contexto, de acordo com o que foi dito acima
2° passo fazer funcionar como já sendo
3° aplicar o abrir e fechar

*/