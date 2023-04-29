import style from './requestConnection.module.scss'





interface Props {
    user_id: number | string,
    email: string,
    username:string
}

export default function RequestConnection({user_id, email, username}: Props) {


    return (
    <h1>
        {username}
        </h1>
    )

}

/*

OOOOOOOOOOOOOOO  -> 




*/