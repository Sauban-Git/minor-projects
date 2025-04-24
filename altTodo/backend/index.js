const express = require("express");
const { createTodo } = require("./types");
const { createMiddleWare, updateMiddleWare } = require("./middleware");
const Todo = require("./db");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/todo", createMiddleWare, async (req, res) => {
  console.log("get / hitted");
  const createBody = req.body;
  await Todo.create({
    title: createBody.title,
    description: createBody.description,
    completed: false,
  });
  res.json({
    msg: "Todo created",
  });
  //put in mongodb
});

app.get("/todos", async (req, res) => {
  //gettinf all from mongodb
  const todos = await Todo.find({});
  console.log(todos);
  res.json({
    todos: todos,
  });
});

app.put("/completed", updateMiddleWare, async (req, res) => {
  //updating mongodb
  await Todo.updateOne(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: "Updated"
  })
});

app.listen(port, () => {
  console.log(`App starting on port: ${port}`);
});
