import React from "react";

const Pagination = ({ pageIndex, totalPages, setPageIndex }) => {
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={pageIndex === 1}
        onClick={() => setPageIndex((prev) => prev - 1)}
      >
        Prev
      </button>

      <span className="page-info">
        {pageIndex} of {totalPages}
      </span>

      <button
        className="pagination-btn"
        disabled={pageIndex === totalPages}
        onClick={() => setPageIndex((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;