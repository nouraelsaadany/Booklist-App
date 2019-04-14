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
    });
  };

  clearList = e => {
    let clicked = confirm("Are You Sure You want to delete all tasks ?");

    while (tr.firstChild) {
      tr.removeChild(tr.firstChild)
    }

  }

  addingNameToArray = () => {
    if (
      bookNameInput.value !== "" &&
      authorNameInput.value !== "" &&
      isbnInput.value !== ""
    ) {
      this.bookListArray.push(bookNameInput, authorNameInput, isbnInput);
      const bookList = new BookList();
      bookList.trMaker(
        bookNameInput.value,
        authorNameInput.value,
        isbnInput.value
      );
      bookNameInput.value = "";
      authorNameInput.value = "";
      isbnInput.value = "";
      console.log(this.bookListArray);
    }
  };

  //adding to list 

  addButtonListen = (button, child, text) =>
    button.addEventListener("click", function () {
      let list = this.bookListArray;
      console.log("text", text);
      let clicked = confirm("Are You Sure You want to delete this task ?");
      //alert(clicked);
      if (clicked == true) {
        tbody.removeChild(child);
        const index = list.indexOf(text);
        list.splice(index, 1);
      }
    });
  //clear all



  // local storage


}

const bookList = new BookList();

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