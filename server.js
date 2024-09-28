const express = require("express");
const { getBooks, getBook } = require("./database");
const app = express();
const port = 5000;

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

app.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}`);
});
