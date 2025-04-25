const express = require("express");
const { createMiddleWare, updateMiddleWare } = require("./middleware");
const Todo = require("./db");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend's IP
    credentials: true,
  })
);

app.post("/todo", createMiddleWare, async (req, res) => {
  console.log("get / hitted");
  const createBody = req.body;
  console.log(createBody);
  await Todo.create({
    title: createBody.title,
    description: createBody.description,
    completed: false,
  });
  res.json({
    msg: "Todo created",
  });
});

app.get("/todos", async (req, res) => {
  //gettinf all from mongodb
  const todos = await Todo.find({});
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
    msg: "Updated",
  });
});

app.delete("/delete", updateMiddleWare, async (req, res) => {
  await Todo.deleteOne({
    _id: req.body.id,
  });
  res.json({
    msg: "Deleted"
  })
});

app.listen(port, "0.0.0.0", () => {
  console.log(`App starting on port: ${port}`);
});
