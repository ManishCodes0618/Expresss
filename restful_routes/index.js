const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let comments = [
  {
    id: uuidv4(),
    user: "John",
    comment: "This is a great post!",
  },
  {
    id: uuidv4(),
    user: "Jane",
    comment: "I learned a lot from this article.",
  },
  {
    id: uuidv4(),
    user: "Bob",
    comment: "Thanks for sharing your insights.",
  },
  {
    id: uuidv4(),
    user: "Alice",
    comment: "I disagree with some points made in this post.",
  },
];

app.get("/comments", (req, res) => {
  // res.send("WORKED");
  res.render("comments/index", { comments });
});
app.get("/comments/newComment", (req, res) => {
  res.render("comments/new", {});
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const oldComment = comments.find((c) => c.id === id);
  const newComment = req.body.comment;
  oldComment.comment = newComment;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.post("/comments", (req, res) => {
  console.log(req.body);
  const { id, user, comment } = req.body;
  comments.push({ id, user, comment });
  res.redirect("/comments");
  // res.send(`IT WORKS! ${user}-${comment}`);
});

app.get("/tacos", (req, res) => {
  console.log(req.query);
  //   const { name, age } = req.body;
  //   res.send(`Good Morning ${name}, you are ${age} years old`);
  res.send("GET /tacos response");
});
app.post("/tacos", (req, res) => {
  console.log(req.body);
  const { name, age } = req.body;
  res.send(`Good Morning ${name}, you are ${age} years old`);
  //   res.send("POST /tacos response");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
