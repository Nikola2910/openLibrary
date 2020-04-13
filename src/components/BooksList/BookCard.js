import React from "react";
import { Link } from "react-router-dom";

import { ApiUrl } from "../../Api/ApiUrl";

function BookCard({ booksData, getBookData }) {
  return (
    <div className="row">
      {booksData.map((book) => {
        const key = book.key.slice(7);

        return (
          <div className="col s12 m6 l4 xl3 " key={key}>
            <div
              className="card z-depth-2 medium"
              style={{ minHeight: 185 + "px" }}
            >
              {" "}
              <div className="card-image">
                <img src={ApiUrl.bookCoverMedium(book.cover_i)} alt="book" />
              </div>
              <div className="card-fab">
                <Link
                  to={book.key}
                  className="btn-floating halfway-fab waves-effect waves-light red"
                  onClick={() => {
                    getBookData(`${book.key}`, book);
                  }}
                >
                  <i className="material-icons">search</i>
                </Link>
              </div>
              <div className="card-content">
                <h5 className="title"> {book.title} </h5>

                <p className="author">By: {book.author_name} </p>
                <span className="editions">
                  {book.edition_key.length}{" "}
                  {book.edition_key.length > 1
                    ? "editions - first "
                    : "edition - "}
                  published in {book.first_publish_year}{" "}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookCard;
