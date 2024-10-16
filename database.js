const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

// Create the books table
db.serialize(() => {
  db.run("CREATE TABLE books (name TEXT, genre TEXT, date TEXT, author TEXT)");

  db.run(
    "INSERT INTO books (name, genre, date, author) VALUES ('book-1', 'Fiction', '2024-10-01', 'Author A')"
  );
  db.run(
    "INSERT INTO books (name, genre, date, author) VALUES ('book-2', 'Biography', '2024-10-02', 'Author B')"
  );
  db.run(
    "INSERT INTO books (name, genre, date, author) VALUES ('book-3', 'Thriller', '2024-10-03', 'Author C')"
  );
});

const getBooks = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM books", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getBook = (name) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM books WHERE name = ?", [name], function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

function deleteData(name) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM books WHERE name = ?", [name], function (err) {
      if (err) {
        reject(err);
      }
      resolve({ message: "Book deleted successfully" });
    });
  });
}

function addData(book) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO books (name, genre, date, author) VALUES (?, ?, ?, ?)",
      [book.name, book.genre, book.date, book.author],
      function (err) {
        if (err) {
          reject(err);
        }
        resolve({ message: "Book added successfully" });
      }
    );
  });
}

module.exports = { getBooks, getBook, deleteData, addData };
