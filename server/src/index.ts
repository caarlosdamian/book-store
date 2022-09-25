import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) {
      res.json(err);
    }
    return res.send(result);
  });
});

app.post("/books", (req, res) => {
  const query =
    " INSERT INTO books (`title`, `description`,`cover`) VALUES (?);";
  const values = [
    "title from Backend",
    "description from Backend",
    "cover from Backend",
  ];

  db.query(query, [values], (err, data) => {
    if (err) {
      res.json(err);
    }
    return res.json("books has been created succesfully");
  });
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
