
/*
interface Props {
    err: string,
    color?: string | "red" 
}
*/


export default function SpanError({ err }: { err: string}) {

    const style = {
        error: {
            "fontSize": "14px",
            "color": "red",
        },
    }
    return (err !== "") ? <span style={style.error}>{err}</span> : <></>
    
}
