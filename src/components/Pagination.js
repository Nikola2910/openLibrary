import React from "react";
import { Link } from "react-router-dom";

function Pagination({
  booksPerPage,
  totalBooks,
  paginate,
  loading,

  activePage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  if (!loading) {
    return (
      <div className="center">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className={number === activePage ? "active" : ""}>
              <Link to={`/`} onClick={() => paginate(number)}>
                {number}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}

export default Pagination;
