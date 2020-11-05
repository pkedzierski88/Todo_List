//Wymagane pakiety i konfiguracja aplikacji
const bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  express = require("express"),
  app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Konfigruacja bazy danych
const url = process.env.DATABASEURL || "mongodb://localhost:27017/todo_list_db";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Polaczono z serwerem bazdy danych Listy Zadan"))
  .catch((err) => console.log(err.message));

const todoSchema = new mongoose.Schema({ text: String });
const Todo = mongoose.model("Todo", todoSchema);

//Strona startowa
app.get("/", (req, res) => {
  res.redirect("/todos");
});

//Index
app.get("/todos", (req, res) => {
  //Wyszukujemy w bazie danych wszystkie (bo empty {}) pozycje
  Todo.find({}, (err, allTodos) => {
    if (err) {
      console.log(err);
    } else {
      //Renerujemy index.ejs i dodajemy do niego todos ze wszsystkimi znalezionymi pozycjami w bazie danych
      res.render("index.ejs", { todos: allTodos });
    }
  });
});

//Create
app.post("/todos", (req, res) => {
  //Tworzymy i zapisujemy nowe zadanie (z obiektu req.body) do bazy danych
  Todo.create(req.body, (err, newTodo) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Nowe zadanie dodane do bazy danych:");
      console.log(newTodo);
    }
  });
});

//Serwer
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Serwer dziala na porcie " + port);
});

// //Ustawienie zmiennych środowiskowych
// console.log(process.env.PORT); //jednorazowo: export PORT=3000; na stałe: zmienna środowiskowa w windowsie PORT o wartości 3000
