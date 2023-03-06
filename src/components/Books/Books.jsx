import React, { useEffect, useState } from "react";

import books from "../../data/listofbooks.json";
import Book from "../Book/Book";
import "./Books.css";

const Books = () => {
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  const handleSearch = (e) => {
    e.preventDefault();

    const filterBooks = books.filter(
      (book) =>
        book.author.toLocaleLowerCase().startsWith(searchQuery.toLowerCase()) ||
        book.title.toLocaleLowerCase().startsWith(searchQuery.toLowerCase()) ||
        book.genre.toLocaleLowerCase().startsWith(searchQuery.toLowerCase()) ||
        book.author.toLocaleLowerCase().includes(` ${searchQuery.toLowerCase()}`) ||
        book.title.toLocaleLowerCase().includes(` ${searchQuery.toLowerCase()}`) ||
        book.genre.toLocaleLowerCase().includes(` ${searchQuery.toLowerCase()}`)
    );

    filterBooks.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    })

    setFilteredBooks(filterBooks);
  };

  const sortBooks = (value) => {
    const sortedBooks = filteredBooks.sort((a, b) => {
      if (a[value] < b[value]) return -1;
      if (a[value] > b[value]) return 1;
      return 0;
    });

    setSortBy(value);
    setFilteredBooks(sortedBooks);
  };

  useEffect(() => {
    const sortedBooksByAuthor = books.sort((a, b) => {
      if (a.author < b.author) return -1;
      if (a.author > b.author) return 1;
      return 0;
    });

    setFilteredBooks(sortedBooksByAuthor);
    setSortBy('title')
  }, [])

  return (
    <div className="books__container">
      <h2 className="books__title">Books</h2>
      <form className="books__form" onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          placeholder="Search books..."
          className="books__input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="books__btn">Search</button>
      </form>

      <div className="books__sort">
        <label htmlFor="sort">Sort books: </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => sortBooks(e.target.value)}
        >
          <option value="title">Alphabetically by Title</option>
          <option value="author">Alphabetically by Author Name</option>
          <option value="genre">Alphabetically by Genre</option>
        </select>
      </div>

      <div className="books__wrapper">
        {filteredBooks && filteredBooks.length > 0
          ? filteredBooks.map((book, index) => (
              <Book
                key={index}
                genre={book.genre}
                title={book.title}
                author={book.author}
              />
            ))
          : "No results found"}
      </div>
    </div>
  );
};

export default Books;
