const bookNameInput = document.getElementById("bookNameID");
const authorNameInput = document.getElementById("authorNameID");
const isbnInput = document.getElementById("isbnID");
const addButton = document.getElementById("addButtonID");
const search = document.getElementById("searchId");
const deleteButton = document.createElement("button");
const tbody = document.querySelector("tbody");
const clearAllButton = document.getElementById("clearAll");

class BookList {
  constructor(bookListArray) {
    this.bookListArray = [];
  }

  trMaker = (booknametext, authornametext, isbntext) => {
    const tr = document.createElement("tr");
    //takes bookname
    const td = document.createElement("td");
    //takes author name
    const td2 = document.createElement("td");
    //takes isbn
    const td3 = document.createElement("td");
    //takes Delete button
    const td4 = document.createElement("td");

    let booknameText = document.createTextNode(booknametext);
    let authorNameText = document.createTextNode(authornametext);
    tr.style.display = "";
    let isbnText = document.createTextNode(isbntext);

    td.appendChild(booknameText);
    td2.appendChild(authorNameText);
    td3.appendChild(isbnText);

    const button = document.createElement("button");
    button.className = "btn btn-danger w-100";
    button.textContent = "DELETE";
    const bookList = new BookList();
    bookList.addButtonListen(button, tr, booknametext);

    td4.appendChild(button);

    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
  };

  filterList = e => {
    const text = e.target.value;
    tbody.childNodes.forEach(search => {
      const rowText = search.childNodes[0].childNodes[0].data.toLowerCase();
      console.log(rowText);
      if (rowText.indexOf(text) != -1) {
        search.style.display = "";
        // console.log("nnn", ul.childNodes[i]);
      } else {
        search.style.display = "none";
        //  console.log("sss", ul.childNodes[i]);
      }
      localStorage.setItem("BooksList", JSON.stringify(this.bookListArray));
    });
  };

  clearList = () => {
    let clicked = confirm("Are You Sure You want to delete all tasks ?");
    localStorage.clear();
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild)

    }

  }

  addingNameToArray = () => {
    if (
      bookNameInput.value !== "" &&
      authorNameInput.value !== "" &&
      isbnInput.value !== ""
    ) {
      const book = {
        bookname: bookNameInput.value,
        isbn: isbnInput.value,
        authorname: authorNameInput.value
      }
      this.bookListArray.push(book);
      const bookList = new BookList();
      bookList.trMaker(
        bookNameInput.value,
        authorNameInput.value,
        isbnInput.value
      );
      bookNameInput.value = "";
      authorNameInput.value = "";
      isbnInput.value = "";
      localStorage.setItem("BooksList", JSON.stringify(this.bookListArray))

      console.log(localStorage.getItem("BooksList"));
    }

  };

  //adding to list 

  addButtonListen = (button, child, text) =>
    button.addEventListener("click", () => {
      let list = JSON.parse(localStorage.getItem("BooksList"));

      console.log("text", text);
      let clicked = confirm("Are You Sure You want to delete this task ?");
      console.log(this.bookListArray)
      //alert(clicked);
      if (clicked == true) {
        tbody.removeChild(child);
        const index = list.indexOf(text);
        list.splice(index, 1);
        localStorage.setItem("BooksList", JSON.stringify(list))
      }
    });
  //clear all



  // local storage
  loadFromLocalStorage = () => {
    const temp = JSON.parse(localStorage.getItem("BooksList"));
    console.log("temp " + temp);
    this.bookListArray = temp !== null ? temp : [];
    this.bookListArray.forEach(element => {
      const book = new BookList();
      book.trMaker(element);
    });
  };

}

const bookList = new BookList();
bookList.loadFromLocalStorage();

addButton.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("it is working");
  console.log(e);
  bookList.addingNameToArray();
});

search.addEventListener("keyup", function (e) {
  bookList.filterList(e);
});

clearAllButton.addEventListener("click", function (e) {
  e.preventDefault();
  alert("clear ");
  bookList.clearList(e);
})