let getData = document.getElementById("dataButton");
let addData = document.getElementById("addButton");
let deleteData = document.getElementById("deleteButton");

getData.addEventListener("click", async (event) => {
  const response = await fetch("http://localhost:4000/getData", {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const books = await response.json();
  document.getElementById("showBooks").innerHTML = books
    .map((b) => b.name)
    .join("<br/>");
});

deleteData.addEventListener("click", async (event) => {
  const name = nameText.value;
  const category = categoryText.value;
  const date = dateText.value;
  const author = authorText.value;

  const response = await fetch("http://localhost:4000/deleteData", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name }),
  });

  console.log(name, category, date, author);
});

addData.addEventListener("click", async (event) => {
  const name = nameText.value;
  const genre = categoryText.value;
  const date = dateText.value;
  const author = authorText.value;

  const response = await fetch("http://localhost:4000/addData", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name, genre, date, author }),
  });

  console.log(name, genre, date, author);
});
