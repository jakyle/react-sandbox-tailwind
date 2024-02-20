interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}


export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const ellipsis = '…';
    const getPageNumbers = () => {
      const pageNumbers = [];
      const maxVisiblePages = 5; // Adjusted to 5 to account for ellipsis and end pages
    
      if (totalPages <= 9) {
        // Display all page numbers
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Display limited page numbers with ellipsis
        let firstPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
        let lastPage = Math.min(totalPages - 1, firstPage + maxVisiblePages - 1);
    
        // Adjust first and last page if we're at the start or end of the page range
        if (currentPage - 1 <= Math.floor(maxVisiblePages / 2)) {
          firstPage = 2;
          lastPage = firstPage + maxVisiblePages - 1;
        } else if (totalPages - currentPage <= Math.floor(maxVisiblePages / 2)) {
          lastPage = totalPages - 1;
          firstPage = lastPage - maxVisiblePages + 1;
        }
    
        pageNumbers.push(1);
    
        if (firstPage > 2) {
          pageNumbers.push(ellipsis);
        }
    
        for (let i = firstPage; i <= lastPage; i++) {
          pageNumbers.push(i);
        }
    
        if (lastPage < totalPages - 1) {
          pageNumbers.push(ellipsis);
        }
    
        pageNumbers.push(totalPages);
      }
    
      return pageNumbers;
    };

    return (
        <div className="w-full flex gap-x-2">
            <button className="flex justify-center items-center bg-stone-500 size-8 rounded-lg text-white" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
              ←️
            </button>
            {getPageNumbers().map((pageNumber, index) =>
                pageNumber === ellipsis
                    ? <span key={index}>{pageNumber}</span>
                    : (
                        <button
                            key={index}
                            onClick={() => onPageChange(pageNumber as number)}
                            className={`flex justify-center items-center size-8 rounded-lg ${pageNumber === currentPage ? 'bg-stone-500 text-stone-100' : 'bg-stone-200 text-stone-500'}`}
                        >
                            {pageNumber}
                        </button>
                    )

            )}
            <button className="flex justify-center items-center bg-stone-500 size-8 rounded-lg text-white" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              →️
            </button>
        </div>
    );
};
