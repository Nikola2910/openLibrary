import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";

//Api URL-s
import { ApiUrl } from "./Api/ApiUrl";

//Components
import Header from "./components/Header";
import Search from "./components/Search";
import BooksList from "./components/BooksList/BooksList";
import Pagination from "./components/Pagination";
import Book from "./components/Book/Book";
import Editions from "./components/Editions/Editions";

import "./App.css";

class App extends Component {
  state = {
    searchTerm: "",
    booksData: [],
    loading: false,
    loadingEditions: false,
    currentPage: 1,
    booksPerPage: 12,
    activePage: 1,
    urlId: "",
    singleBookData: null,
    bookFromList: {},
    editionsData: [],
  };

  //needs some improvisation
  componentDidMount() {
    const id = `/${window.location.pathname.slice(1)}`;
    this.getBookData(id, this.state.bookFromList);
  }

  //search based on query and filtering books only with full text (defined in url) and covers (filter method)
  searchByQuery = (query) => {
    this.setState({
      loading: true,
    });
    axios.get(ApiUrl.searchByQuery(query)).then((response) => {
      const booksWithCover = response.data.docs.filter((book) => book.cover_i);

      this.setState({
        booksData: booksWithCover,
        loading: false,
        currentPage: 1,
        activePage: 1,
      });
    });
  };

  //setting search term into state and calling searchByQuery function

  onSearch = (searchTerm) => {
    this.setState(
      {
        searchTerm: searchTerm,
      },
      () => {
        const { searchTerm } = this.state;
        this.searchByQuery(searchTerm);
      }
    );
  };

  //getting book data based on uninqe key and also passing some data that was fetched by searching by query
  getBookData = (id, bookFromList) => {
    axios.get(ApiUrl.getBookById(id)).then((res) => {
      const singleBookData = res.data;
      this.setState({
        singleBookData: singleBookData,
        bookFromList: bookFromList,
        urlId: id,
        editionsData: null,
      });
    });
  };

  //getting data about editions using all of the edition keys
  getEditions = (editionKeys) => {
    let editionsData = [];
    this.setState({
      loadingEditions: true,
    });
    editionKeys.forEach((key) => {
      axios.get(ApiUrl.getEditionByKey(key)).then((res) => {
        editionsData.push(res.data[`OLID:${key}`]);
        if (editionsData.length === editionKeys.length) {
          this.setState({
            editionsData: editionsData,
            loadingEditions: false,
          });
        }
      });
    });
  };

  render() {
    const {
      booksData,
      searchTerm,
      loading,
      currentPage,
      booksPerPage,
      singleBookData,
      bookFromList,
      urlId,
      editionsData,
      loadingEditions,
    } = this.state;

    //Get current books
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = booksData.slice(indexOfFirstBook, indexOfLastBook);

    // Change page
    // Needs improvisation to fetch data on page number click using 'from' and 'offset'
    const paginate = (pageNumber) =>
      this.setState({
        currentPage: pageNumber,
        activePage: pageNumber,
        singleBookData: {},
        bookFromList: {},
      });

    return (
      <BrowserRouter>
        <Header />
        <Route exact path={`/`}>
          <Search onSearch={this.onSearch} />

          <BooksList
            booksData={currentBooks}
            searchTerm={searchTerm}
            loading={loading}
            getBookData={this.getBookData}
          />

          <Pagination
            booksPerPage={booksPerPage}
            totalBooks={booksData.length}
            paginate={paginate}
            loading={loading}
            activePage={this.state.activePage}
          />
        </Route>
        <Route exect path={urlId}>
          {singleBookData && (
            <>
              <Book
                singleBookData={singleBookData}
                bookFromList={bookFromList}
                getEditions={this.getEditions}
                loadingEditions={loadingEditions}
              />
              {editionsData && (
                <>
                  <Editions editionsData={editionsData} />{" "}
                </>
              )}
            </>
          )}
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
