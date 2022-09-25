import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const Update = () => {
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/books/${bookId}`, book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(book);
  return (
    <div className="form">
      <h1>Update New Book</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleOnChange}
      />
      <input
        type="text"
        placeholder="description"
        name="description"
        onChange={handleOnChange}
      />
      <input
        type="number"
        placeholder="price"
        name="price"
        onChange={handleOnChange}
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleOnChange}
      />
      <button onClick={handleClick}>Update</button>
    </div>
  );
};
