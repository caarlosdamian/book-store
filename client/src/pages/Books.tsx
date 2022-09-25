import React, { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../interfaces";
import { Link } from "react-router-dom";

export const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5001/books/${id}`);
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchbooks = async () => {
      try {
        const res = await axios.get<Book[]>("http://localhost:5001/books");
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchbooks();
  }, []);

  return (
    <div>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <span>{book?.price}</span>
            <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
            <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};
