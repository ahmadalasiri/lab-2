const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

// Create the books table
db.serialize(() => {
  db.run("CREATE TABLE books (name TEXT, genre TEXT, date TEXT, author TEXT)");
  // Add sample data (optional)
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

module.exports = { getBooks, getBook };
