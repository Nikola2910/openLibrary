import React from "react";

function Book({ singleBookData, bookFromList }) {
  console.log(singleBookData, bookFromList);
  return (
    <div className="container">
      <div className="row">
        <div className="col l8">
          <h1 className="title">{singleBookData.title}</h1>
          <h3>By: {bookFromList.author_name}</h3>
          <span>About the Book</span>
          <div>
            {singleBookData.description && (
              <p>
                {singleBookData.description.value
                  ? singleBookData.description.value
                  : singleBookData.description}
              </p>
            )}
          </div>

          <div>
            {singleBookData.subjects && (
              <>
                <span>Subjects</span>
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
                <span>People</span>
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
                <span>Places</span>
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
                <span>Times</span>
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
                <h6>
                  Links <span>outside Open Library</span>
                </h6>
                <ul>
                  {singleBookData.links.map((link) => {
                    return (
                      <li key={link.url}>
                        <a href={link.url}>{link.title}</a>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="col offset-l1 l3">
          <img
            src={`http://covers.openlibrary.org/b/id/${bookFromList.cover_i}-L.jpg`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Book;
