

export const ImageUser = (
    { username, description }: { username: string | null, description: string }) => {
    
    return (
        <img alt ={description} src={`https://avatar.uimaterial.com/?setId=vXDL4VlWYdB7pICUz64O&name=${(username !== null)? username : 'null' }`}></img>
    )
    /*
    &size=128
    */
}
/*

Após o fim do projeto criar um sistema em que dependendo da letra do nome do usuário, vai uma cor diferente, pode se fazer um sistema de numeração

*/