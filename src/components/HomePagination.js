import { DOTS, usePagination } from './usePagination';

const HomePagination = ({className, onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  }); 

  if(currentPage === 0 || paginationRange.length < 2){
    return <></>;
  }


  let lastPage = paginationRange[paginationRange.length - 1];
  
  return (
    <div className={className}>
      {
        paginationRange.map(pageNumber=>{
          if(pageNumber === DOTS){
            return <div>&#8230</div>;
          }
          return (
            <div active={pageNumber===currentPage}
              onClick={()=>onPageChange(pageNumber)}>{pageNumber}
            </div>
          );
        })
      }
    </div>
  )
}

export default HomePagination