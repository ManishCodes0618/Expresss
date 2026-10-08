const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");
// console.log(redditData);
//set the views directory

app.set("view engine", "ejs");
//path.join(a,b) joins the two paths a(the path of index.js) and b(folder in this case views) and returns the result
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  //render function: generated a html file and send it to the client
  res.render("home");
});

app.get("/random", (req, res) => {
  const num = Math.floor(Math.random() * 100);
  res.render("random", { num: num });
});

app.get("/cats", (req, res) => {
  const cats = ["Blue", "Rocket", "Monty", "Stephanie", "Winston"];
  //"cats" is a cats.ejs file
  res.render("cats", { cats });
});

app.get("/r/:subreddit", (req, res) => {
  // {subreddit} is a subreddit.ejs file
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.status(404).send("Subreddit not found");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
