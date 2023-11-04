// Book Constructor

function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){
    // Add Book to list

    UI.prototype.addBooktoList = function(book){
        const list = document.querySelector("#book-list");

        // Create tr element

        const row = document.createElement("tr");

        // Insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
                <button type="button"
                class="btn btn-danger">Delete</button>
            </td>
        `;

        list.appendChild(row);

    }
}


// Event Listener for add book

document.getElementById("book-form")
.addEventListener("submit", function(e){
    e.preventDefault();
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    const book = new Book(title, author, isbn);

    const ui = new UI();

    if(title === "" || author === "" || isbn === ""){
        alert("please fill all the fileds")
        return;
    } else{
        ui.addBooktoList(book);
    }
})