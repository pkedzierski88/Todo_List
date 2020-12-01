const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    text: String,
    isDone: {
      type: Boolean,
      default: false
    },
  });

 module.exports = mongoose.model("Todo", todoSchema);