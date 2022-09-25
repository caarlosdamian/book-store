import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

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
    " INSERT INTO books (`title`, `description`,`cover`,`price`) VALUES (?);";
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];

  db.query(query, [values], (err, data) => {
    if (err) {
      res.json(err);
    }
    return res.json("books has been created succesfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const query = "DELETE FROM books WHERE id = ?";
  const values = [req.params.id];

  db.query(query, values, (err, data) => {
    if (err) {
      res.json(err);
    }
    return res.json("books has been deleted succesfully");
  });
});
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  let queryData = "";

  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];

  if (req.body.title) {
    queryData = `title = '${req.body.title}'`;
  } else if (req.body.description) {
    queryData = `description = '${req.body.description}'`;
  } else if (req.body.cover) {
    queryData = `cover = '${req.body.cover}'`;
  } else if (req.body.price) {
    queryData = `price = '${req.body.price}'`;
  } else if (req.body.title && req.body.description) {
    queryData = `title = '${req.body.title}', description = '${req.body.description}'`;
  } else if (req.body.title && req.body.cover) {
    queryData = `title = ${req.body.title}', cover = '${req.body.cover}'`;
  } else if (req.body.title && req.body.price) {
    queryData = `title = '${req.body.title}', price = '${req.body.price}'`;
  } else if (req.body.description && req.body.cover) {
    queryData = `description = '${req.body.description}', cover = '${req.body.cover}'`;
  } else if (req.body.description && req.body.price) {
    queryData = `description = '${req.body.description}', price = '${req.body.price}'`;
  } else if (req.body.cover && req.body.price) {
    queryData = `cover = '${req.body.cover}', price = '${req.body.price}'`;
  } else if (
    req.body.title &&
    req.body.description &&
    req.body.cover &&
    req.body.price
  ) {
    queryData = `title = '${req.body.title}', description = '${req.body.description}', cover = '${req.body.cover}', price = '${req.body.price}'`;
  }
  const query = `UPDATE  books SET ${queryData} WHERE id = ${bookId};`;
  db.query(query, (err, data) => {
    if (err) {
      res.json(err);
    }
    return res.json("books has been Updated succesfully");
  });
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
