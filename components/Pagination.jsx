'use client';

import { motion } from 'framer-motion';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  baseUrl = ''
}) {
  if (totalPages <= 1) return null;

  // Generate page numbers with smart ellipsis matching Screenshot 3
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Always include page 1
    pages.push(1);

    if (currentPage > 4) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    // Always include last page
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page, e) => {
    if (e) e.preventDefault();
    if (page === '...' || page === currentPage || page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <nav 
      aria-label="Product Catalog Pagination"
      className="w-full py-6 border-t border-b border-slate-200/80 my-8 flex flex-col sm:flex-row items-center justify-between gap-4 select-none"
    >
      {/* Left: "Page X of Y" matching Screenshot 3 */}
      <div className="text-xs sm:text-sm font-medium text-slate-700">
        Page <span className="font-semibold text-slate-950">{currentPage}</span> of{' '}
        <span className="font-semibold text-slate-950">{totalPages}</span>
      </div>

      {/* Right / Center: Numbers with Pink Active Badge matching Screenshot 3 */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
        {/* Previous Button */}
        {currentPage > 1 && (
          <a
            href={`${baseUrl}?page=${currentPage - 1}`}
            onClick={(e) => handlePageClick(currentPage - 1, e)}
            className="text-xs sm:text-sm font-bold text-[#e11d48] hover:text-[#be123c] px-2 py-1 transition-colors cursor-pointer mr-1"
            aria-label="Go to previous page"
          >
            Prev
          </a>
        )}

        {pageNumbers.map((page, idx) => {
          if (page === '...') {
            return (
              <span key={`dots-${idx}`} className="text-slate-400 font-bold px-1 text-sm">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <a
              key={`page-${page}`}
              href={`${baseUrl}?page=${page}`}
              onClick={(e) => handlePageClick(page, e)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#e11d48] text-white font-bold shadow-sm ring-2 ring-[#e11d48]/20 pointer-events-none'
                  : 'text-slate-700 hover:text-[#e11d48] hover:bg-rose-50 font-medium'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </a>
          );
        })}

        {/* Next Button matching Screenshot 3 */}
        {currentPage < totalPages && (
          <a
            href={`${baseUrl}?page=${currentPage + 1}`}
            onClick={(e) => handlePageClick(currentPage + 1, e)}
            className="text-xs sm:text-sm font-bold text-[#e11d48] hover:text-[#be123c] px-2 py-1 transition-colors cursor-pointer ml-1"
            aria-label="Go to next page"
          >
            Next
          </a>
        )}
      </div>
    </nav>
  );
}
