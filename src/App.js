import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
//Components
import Header from "./components/Header";
import Search from "./components/Search";
import BooksList from "./components/BooksList/BooksList";
import Pagination from "./components/Pagination";
import Book from "./components/Book/Book";

import "./App.css";

class App extends Component {
  state = {
    searchTerm: "",
    booksData: [],
    loading: false,
    currentPage: 1,
    booksPerPage: 12,
    activePage: 1,
    urlId: "",
    singleBookData: null,
    bookFromList: {},
  };

  searchByQuery = (query) => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `http://openlibrary.org/search.json?q=${query}&mode=ebooks&has_fulltext=true`
      )
      .then((response) => {
        console.log(response);
        const booksWithCover = response.data.docs.filter(
          (book) => book.cover_i
        );

        this.setState({
          booksData: booksWithCover,
          loading: false,
          currentPage: 1,
          activePage: 1,
        });
      });
  };

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

  getBookData = (id, bookFromList) => {
    console.log(id);
    axios.get(`http://openlibrary.org${id}.json`).then((res) => {
      const singleBookData = res.data;
      this.setState({
        singleBookData: singleBookData,
        bookFromList: bookFromList,
        urlId: id,
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
    } = this.state;

    //Get current books
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = booksData.slice(indexOfFirstBook, indexOfLastBook);

    // Change page
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
            <Book singleBookData={singleBookData} bookFromList={bookFromList} />
          )}
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
