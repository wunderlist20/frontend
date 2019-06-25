const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const app = express();
const token =
  "esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ";

let nextId = 7;

let todos = [
  {
    id: 1,
    item: "Finish homework",
    label: "Label: School",
    due: "Due: Thursday"
  },
  {
    id: 2,
    item: "Walk the dog",
    label: "Label: Personal",
    due: "Due: Daily"
  },
  {
    id: 3,
    item: "Complete project plan",
    label: "Label: Work",
    due: "Due: Friday"
  },
  {
    id: 4,
    item: "Attend weekly meeting",
    label: "Label: Work",
    due: "Due: Every Monday"
  }
];

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: "User be logged in to do that." });
  }
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "pass") {
    req.loggedIn = true;
    res.status(200).json({
      payload: token
    });
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see Readme" });
  }
});

app.get("/api/todos", authenticator, (req, res) => {
  setTimeout(() => {
    res.send(todos);
  }, 1000);
});

app.get("/api/todos/:id", authenticator, (req, res) => {
  const todo = todos.find(f => f.id == req.params.id);

  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).send({ msg: "Todo not found" });
  }
});

app.post("/api/todos", authenticator, (req, res) => {
  const todo = { id: getNextId(), ...req.body };

  todos = [...todos, todo];

  res.send(todos);
});

app.put("/api/todos/:id", authenticator, (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex(f => f.id == id);

  if (todoIndex > -1) {
    const todo = { ...todos[todoIndex], ...req.body };

    todos = [...todos.slice(0, todoIndex), todo, ...todos.slice(todoIndex + 1)];
    res.send(todos);
  } else {
    res.status(404).send({ msg: "Todo not found" });
  }
});

app.delete("/api/todos/:id", authenticator, (req, res) => {
  const { id } = req.params;

  todos = todos.filter(f => f.id !== Number(id));

  res.send(todos);
});

function getNextId() {
  return nextId + 1;
}

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
