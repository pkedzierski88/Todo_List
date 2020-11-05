//Wybieramy poszczególne elementy z dokumentu
const form = document.querySelector("form");
const input = document.querySelector("input[type='text']");
const ul = document.querySelector("ul");

//Dodajemy event listener na clicka do <ul>
ul.addEventListener("click", function (event) {
  //Jeśli kliknięty element jest <li> to przełączamy klasę "completed"
  if ((event.target.nodeName = "li")) {
    event.target.classList.toggle("completed");
  }
});

//Dodajemy event listener na wciśnięcie klawisza
input.addEventListener("keydown", function (event) {
  //Jeśli wciśniety został "enter" i input nie jest pusty
  if (event.keyCode === 13 && input.value != "") {
    //zatwierdzanie formy metodą POST
    event.preventDefault();
    form.submit();
    //Wyciągamy wartość tekstu z inputa
    let todoText = document.createTextNode(input.value);
    //Tworzymy nowy element listy
    let li = document.createElement("li");
    //Do elementu li dodajemy tekst z inputa
    li.appendChild(todoText);
    //Do elementu ul dodajemy element li
    ul.appendChild(li);
    //Czyścimy pole input
    input.value = "";
  }
});
