let getData = document.getElementById("dataButton");
let addData = document.getElementById("addButton");
let deleteData = document.getElementById("deleteButton");

getData.addEventListener("click", async (event) => {
  // Fetch data from the backend
  try {
    const response = await fetch("http://localhost:4000/getData", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const books = await response.json();
    // Display the book names
    document.getElementById("showBooks").innerHTML = books
      .map((b) => b.name)
      .join("<br/>");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

deleteData.addEventListener("click", async (event) => {
  // Delete data here
  const name = nameText.value;
  const category = categoryText.value;
  const date = dateText.value;
  const author = authorText.value;

  try {
    const response = await fetch("http://localhost:4000/deleteData", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, category, date, author }), // Send data as JSON
    });

    if (response.ok) {
      console.log("Book deleted successfully");
    } else {
      console.error("Error deleting book:", await response.text());
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

addData.addEventListener("click", async (event) => {
  // Add data here
  const name = nameText.value;
  const category = categoryText.value;
  const date = dateText.value;
  const author = authorText.value;

  try {
    const response = await fetch("http://localhost:4000/addData", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, category, date, author }), // Send data as JSON
    });

    if (response.ok) {
      console.log("Book added successfully");
    } else {
      console.error("Error adding book:", await response.text());
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
