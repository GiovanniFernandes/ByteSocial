import { useState } from 'react'
import { EditBUtton } from './assets/EditButton'
import style from './ChangeTextField.module.scss'
import SpanError from 'components/SpanError/SpanError'
import { SubmitHandler, useForm } from 'react-hook-form'

interface ItemTextField {
    type:string,
    placeholder:string,
    id:string,
    fieldName:string,
    aoClick: (data:string) => Promise<void>,
    err:string
}
    

export const ChangeTextField = (props:ItemTextField) => {

    const [data, setData] = useState('');

    const aoClick = () => {
        props.aoClick(data)
        setData('');
    }
    

    return (
        <div className={style.container}>
            <label>{props.fieldName}</label>
            
            <div>
                <input 
                placeholder={props.placeholder} 
                id={props.id}
                type={props.type}
                onChange={event => setData(event.target.value)}
                value ={data}
                />
                <button type='button' onClick={aoClick}>
                    <EditBUtton/>
                </button>
                
            </div>
            <SpanError err={props.err}/>     
        </div>
    )


}
