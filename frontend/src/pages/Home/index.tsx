import { useEffect } from "react"



interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}


export default function Home(props: Props) {


    useEffect(() => {
        props.setSelectedMenu(1)
    }, [])


  return (
    <h1>
        Bem vindo a Home temporária
    </h1>
  )
}
