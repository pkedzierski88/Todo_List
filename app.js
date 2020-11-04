//Wymagane pakiety i konfiguracja aplikacji
const express = require("express"),
    bodyParser = require("body-parser"),
    app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Strona startowa
app.get("/", (req, res) => {
    res.redirect("/todos");
});

//Index
app.get("/todos", (req, res) => {
    res.render("index.ejs");
});

//Serwer
const port = (process.env.PORT || 3000);
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});


// //Ustawienie zmiennych środowiskowych
// console.log(process.env.PORT); //jednorazowo: export PORT=3000; na stałe: zmienna środowiskowa w windowsie PORT o wartości 3000 

