import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Add = () => {
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
      await axios.post("http://localhost:5001/books", book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(book);
  return (
    <div className="form">
      <h1>Add New Book</h1>
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
      <button onClick={handleClick}>Add</button>
    </div>
  );
};
