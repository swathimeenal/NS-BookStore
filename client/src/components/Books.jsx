import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import "../css/Book.css";

import Spinner from "react-bootstrap/Spinner";
import axiosInstance from "../utils/AxiosInstance";

const Books = ({ role }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // axios.get('http://localhost:3001/book/books')
    axiosInstance
      .get("/book/books")
      .then((res) => {
        setLoading(false);
        setBooks(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return loading === true ? (
    <div style={{ minHeight: "80vh", minWidth: "100vw", display: "flex" }}>
      <Spinner className="m-auto" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div className="book-list">
      {books.map((book) => {
        return <BookCard key={book.id} book={book} role={role}></BookCard>;
      })}
    </div>
  );
};

export default Books;