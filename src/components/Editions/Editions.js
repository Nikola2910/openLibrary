import React from "react";
import "./Editions.css";

function Editions({ editionsData }) {
  return (
    <div className="container">
      <ul className="collection">
        {editionsData &&
          editionsData.map((edition) => (
            <li className="collection-item avatar" key={edition.key}>
              {edition.cover && (
                <img
                  src={edition.cover.small}
                  alt="book-cover"
                  className="circle"
                />
              )}

              <span className="edition-title title"> {edition.title} </span>

              <p className="edition-info">
                {" "}
                {edition.publish_date && edition.publish_date},{" "}
                {edition.publishers && edition.publishers[0].name}{" "}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Editions;
