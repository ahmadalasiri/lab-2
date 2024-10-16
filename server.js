const express = require("express");
const cors = require("cors");
const { getBooks, getBook, deleteData, addData } = require("./database");
const app = express();
const port = 4000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/welcome", (req, res) => {
  res.send("Welcome to the bookstore");
});

app.get("/books", async (req, res) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/books/:name", async (req, res) => {
  try {
    const book = await getBook(req.params.name);
    if (book) {
      res.json(book);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/dataParam", (req, res) => {
  const sendBack = {
    message: "This is lab2",
    name: "Hkr",
  };
  res.json(sendBack);
});

app.get("/getData", async (req, res) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/deleteData", (req, res) => {
  const { name } = req.body;
  const deleted = deleteData(name);
  if (deleted) {
    res.send("Book deleted");
  } else {
    res.status(404).send("Book not found");
  }
});

app.put("/addData", (req, res) => {
  const newBook = req.body;
  const added = addData(newBook);
  if (added) {
    res.send("Book added");
  } else {
    res.status(500).send("Error adding book");
  }
});

app.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}`);
});
