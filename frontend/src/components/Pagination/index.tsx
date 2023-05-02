import styles from './Pagination.module.scss';
const MAX_ITENS = 5; // Quantidade de buttons de paginação
const MAX_LEFT = (MAX_ITENS - 1) / 2;

interface Props {
  limit: number,
  total: number,
  offset: number,
  setOffset:React.Dispatch<React.SetStateAction<number>>
}


export default function Pagination({limit, total, offset, setOffset}: Props) {

  const currentPage = offset ? (offset / limit) + 1 : 1;
  const amountPages = Math.ceil(total / limit); 

  const firstPage = Math.max(currentPage - MAX_LEFT, 1);

    return (
      <div className={styles.Pagination}>
        <ul className={styles.Pagination__pagination}>
          {Array.from({ length: Math.min(MAX_ITENS, amountPages) })
            .map((_, index) => index + firstPage)
            .map(page => 
              <li key={page}>
                {page === currentPage  
                   ? <button className={styles.Pagination__pagination__buttonActive} type="reset" onClick={()=>{setOffset((page-1)*limit)}}>{page}</button> 
                   : <button className={styles.Pagination__pagination__button} type="reset" onClick={()=>{setOffset((page-1)*limit)}}>{page}</button> 
                   

                }
                {/* <button className={page === currentPage ? 'Pagination_Pagination__pagination__button-active' : 'Pagination_Pagination__pagination__button'} type="reset" onClick={()=>{setOffset((page-1)*limit)}}>{page}</button> */}
              </li>
            )
          }
        </ul>
      </div>
    )
}
