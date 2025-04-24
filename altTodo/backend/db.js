const mongoose = require("mongoose");
const { string } = require("zod");

const db_url = "mongodb://localhost:27017/ToDos";
mongoose.connect(db_url);

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
