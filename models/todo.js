const mongoose = require("mongoose");

//Schemat wpisów do bazy danych
const todoSchema = new mongoose.Schema({
    text: String,
    isDone: {
      type: Boolean,
      default: false
    },
  });

  //Modelowanie i eksport schematu
 module.exports = mongoose.model("Todo", todoSchema);