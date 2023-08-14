import ReactPaginate from "react-paginate";

import { useState } from "react";

export default function Pagination({ itemsPerPage, totalItems, onPageChange }) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selected) => {
    console.log("selected in handlepageclick", selected);
    setCurrentPage(selected.selected);
    //calls props onPageChange
    onPageChange(selected.selected);
  };

  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      pageCount={pageCount}
      //calls handlePageClick func
      onPageChange={handlePageClick}
      activeClassName="active"
      pageRangeDisplayed={2}
      className="pagination"
    />
  );
}
