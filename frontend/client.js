let getData = document.getElementById("dataButton");
let addData = document.getElementById("addButton");
let deleteData = document.getElementById("deleteButton");


getData.addEventListener('click', event => {

    // Here you should make the fetch to the rest api
    document.getElementById("showBooks").innerHTML = books.map(b => b.name).join('<br/>')
    
});


deleteData.addEventListener('click', event => {
    // delete data here
    const name = nameText.value
    var category = categoryText.value
    var date = dateText.value
    var author = authorText.value

    // Here you should make the fetch to the rest api

    console.log(name,category,date,author)
 
});


addData.addEventListener('click', event => {
    // add data here
    const name = nameText.value
    var category = categoryText.value
    var date = dateText.value
    var author = authorText.value

    // Here you should make the fetch to the rest api

    console.log(name,category,date,author)
     
});