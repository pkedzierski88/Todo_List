const bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  express = require("express"),
  methodOverride = require("method-override"),
  app = express(),
  Todo = require("./models/todo.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

const url = 
  process.env.DATABASEURL || 
  "mongodb://localhost:27017/todo_list_db" ||
  "mongodb+srv://piotrek:todopass2020@todo0.f3i4o.mongodb.net/todo_list_db_deployed?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Polaczono z serwerem bazdy danych Listy Zadan"))
  .catch((err) => console.log(err.message));

//Landing
app.get("/", (req, res) => {
  res.redirect("/todos");
});

//Index
app.get("/todos", (req, res) => {
  Todo.find({}, (err, allTodos) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index.ejs", { todos: allTodos });
    }
  });
});

//Create
app.post("/todos", (req, res) => {
  Todo.create(req.body.todo, (err, newTodo) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Nowe zadanie dodane do bazy danych:");
      console.log(newTodo);
      res.redirect("back");
    }
  });
});

//Update
app.put("/todos/:id", (req, res) => {
  Todo.findById(req.params.id, (err, foundToto) => {
    if(err){
      console.log(err);
    } else {
      if(foundToto.isDone || !foundToto.isDone){
        foundToto.isDone = !foundToto.isDone;
        foundToto.save((err, updatedToto) => {
          if(err){
            console.log(err);
          } else {
            console.log(updatedToto);
          }
        });
      } 
    }
    res.redirect("back");
  });
});

//Delete
app.delete("/todos/:id", (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log("Usunięto zadanie z listy.");
      res.redirect("back");
    }
  })
});

//Serwer
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Serwer dziala na porcie " + port);
});

