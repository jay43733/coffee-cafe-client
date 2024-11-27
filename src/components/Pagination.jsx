import React, { useState } from "react";
import SecondaryButton from "./Button/SecondaryButton";

const Pagination = ({
  productPerPage,
  totalProduct,
  setCurrentPage,
  currentPage,
  isClickedPage,
  setIsClickedPage,
}) => {
  const pageNumber = [];
  const pages = Math.ceil(totalProduct / productPerPage);
  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (pages <= 10) {
      // If total pages <= 10, display all pages
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // If total pages > 10, show dynamic pagination
      pageNumbers.push(1); // Always show the first page

      if (currentPage > 5) {
        pageNumbers.push("..."); // Add ellipsis if the current page is beyond the first 5
      }

      // Show range of pages around the current page
      const startPage = Math.max(2, currentPage - 2); // At least start from 2
      const endPage = Math.min(pages - 1, currentPage + 2); // At most end at pages - 1

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < pages - 4) {
        pageNumbers.push("..."); // Add ellipsis if the current page is far from the last pages
      }

      pageNumbers.push(pages); // Always show the last page
    }
    return pageNumbers;
  };

  const pageNumbers = renderPageNumbers();

  const hdlSetCurrentPage = (item) => {
    setIsClickedPage(item);
    setCurrentPage(item);
  };

  return (
    <div>
      <div className="flex gap-4 ">
        {pageNumbers.map((item) => (
          <SecondaryButton
            isClicked={isClickedPage}
            key={item}
            text={item}
            func={() => hdlSetCurrentPage(item)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default Pagination;
