import { IoMdSend } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from './NewPost.module.scss';

type Inputs = {
    postText: string,
  };

export default function NewPost() {
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
    }

    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.newPost}
        >
            <textarea
            {...register("postText", { required: true })}
            className={styles.newPost__input}
            placeholder='O que você está pensando?'
            rows={1}
            />
                <button
                type="submit"
                className={styles.newPost__send}
                >
                    <IoMdSend
                    className={styles.newPost__send__icon}
                    size={30}
                    color='#52A3FF'
                    />
                </button>
                
        </form>
    )
}
