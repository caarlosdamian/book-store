import React, { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../interfaces";

export const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);

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

  return <div>Books</div>;
};
