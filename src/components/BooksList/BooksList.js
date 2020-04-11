import React from "react";
import Loader from "./Loader";
import BookCard from "./BookCard";

import "./BooksList.css";

function BooksList({ searchTerm, booksData, loading, getBookData }) {
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      {booksData.length ? (
        <h4 style={{ marginBottom: 35 + "px" }}>
          List of Books that match:
          <span className="red-text"> "{searchTerm}" </span>
        </h4>
      ) : null}

      <BookCard booksData={booksData} getBookData={getBookData} />
    </div>
  );
}

export default BooksList;
