const express = require("express");
const { createMiddleWare, updateMiddleWare } = require("./middleware");
const Todo = require("./db");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://192.168.144.251:5173"], // your frontend's IP
    credentials: true,
  })
);

app.post("/todo", createMiddleWare, async (req, res) => {
  const createBody = req.body;
  const countTodo = await Todo.countDocuments();
  await Todo.create({
    id: countTodo + 1,
    title: createBody.title,
    description: createBody.description,
    completed: false,
  });
  res.json({
    msg: "Todo created",
  });
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.json({
    todos: todos,
  });
});

app.get("/find", async (req, res) => {
  const todo = await Todo.findOne({
    id: id,
  });
  if (!todo) {
    return res.status(403).json({
      msg: "Cant find",
    });
  } else {
    console.log(todo);
    res.json(todo);
  }
});

app.put("/completed", updateMiddleWare, async (req, res) => {
  await Todo.updateOne(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: "Updated",
  });
});

app.delete("/delete", updateMiddleWare, async (req, res) => {
  await Todo.deleteOne({
    _id: req.body.id,
  });
  res.json({
    msg: "Deleted",
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`App starting on port: ${port}`);
});
