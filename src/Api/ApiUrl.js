class ApiUrl {
  static searchByQuery = (query) =>
    `http://openlibrary.org/search.json?q=${query}&mode=ebooks&has_fulltext=true`;

  static getBookById = (id) => `http://openlibrary.org${id}.json`;

  static getEditionByKey = (key) =>
    `https://openlibrary.org/api/books?bibkeys=OLID:${key}&jscmd=data&format=json`;

  static bookCoverMedium = (key) =>
    `http://covers.openlibrary.org/b/id/${key}-M.jpg`;

  static getBookCoverLarge = (key) =>
    `http://covers.openlibrary.org/b/id/${key}-L.jpg`;
}

export { ApiUrl };
