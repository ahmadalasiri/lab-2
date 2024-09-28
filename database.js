const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

// Create the books table
db.serialize(() => {
  db.run("CREATE TABLE books (name TEXT, genre TEXT, date TEXT, author TEXT)");
  const stmt = db.prepare("INSERT INTO books VALUES (?, ?, ?, ?)");
  stmt.run("Book Title 1", "Fiction", "2023-01-01", "Author A");
  stmt.run("Book Title 2", "Non-Fiction", "2023-01-02", "Author B");
  stmt.finalize();
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
    db.get("SELECT * FROM books WHERE name = ?", [name], (err, row) => {
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
      resolve({ message: "Book deleted successfully", changes: this.changes });
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
        resolve({ message: "Book added successfully", id: this.lastID });
      }
    );
  });
}

module.exports = { getBooks, getBook, deleteData, addData };
