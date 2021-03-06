import React from "react";
import "./Book.css";

import { ApiUrl } from "../../Api/ApiUrl";

function Book({ singleBookData, bookFromList, getEditions, loadingEditions }) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col l8">
            <h1 className="title">{singleBookData.title}</h1>

            {bookFromList.author_name && (
              <h3 className="author">
                By: <span className="red-text">{bookFromList.author_name}</span>
              </h3>
            )}
            <p className="first-sentence">
              {singleBookData.first_sentence && (
                <i>"{singleBookData.first_sentence.value}"</i>
              )}
            </p>

            <div>
              {singleBookData.description && (
                <>
                  <span className="about">About the Book</span>
                  <p className="description">
                    {singleBookData.description.value
                      ? singleBookData.description.value
                      : singleBookData.description}
                  </p>
                </>
              )}
            </div>

            <div>
              {singleBookData.subjects && (
                <>
                  <h4 className="header">Subjects</h4>
                  <div>
                    {singleBookData.subjects.map((subject) => {
                      return <span key={subject}>{subject}, </span>;
                    })}
                  </div>
                </>
              )}
            </div>

            <div>
              {singleBookData.subject_people && (
                <>
                  <h4 className="header">People</h4>
                  <div>
                    {singleBookData.subject_people.map((person) => {
                      return <span key={person}>{person}, </span>;
                    })}
                  </div>
                </>
              )}
            </div>

            <div>
              {singleBookData.subject_places && (
                <>
                  <h4 className="header">Places</h4>
                  <div>
                    {singleBookData.subject_places.map((place) => {
                      return <span key={place}>{place}, </span>;
                    })}
                  </div>
                </>
              )}
            </div>

            <div>
              {singleBookData.subject_times && (
                <>
                  <h4 className="header">Times</h4>
                  <div>
                    {singleBookData.subject_times.map((time) => {
                      return <span key={time}>{time}, </span>;
                    })}
                  </div>
                </>
              )}
            </div>

            <div>
              {singleBookData.links && (
                <>
                  <h6 className="links">
                    Links <span>outside Open Library</span>
                  </h6>
                  <ul>
                    {singleBookData.links.map((link) => {
                      return (
                        <li key={link.url}>
                          <a href={link.url} target="blank">
                            {" "}
                            <i className="material-icons tiny">chevron_right</i>
                            {link.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
          <img
            className="col offset-l1 l3"
            src={ApiUrl.getBookCoverLarge(bookFromList.cover_i)}
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <div>
          {bookFromList.edition_key && (
            <>
              <h4 className="header">
                {bookFromList.edition_key.length}{" "}
                {bookFromList.edition_key.length > 1 ? "editions " : "edition "}
              </h4>
              <a
                className="waves-effect waves-light btn-small"
                onClick={() => {
                  getEditions(bookFromList.edition_key);
                }}
              >
                <i className="material-icons left">remove_red_eye</i>show all
              </a>
              {loadingEditions && (
                <div className="progress">
                  <div className="indeterminate"></div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Book;
