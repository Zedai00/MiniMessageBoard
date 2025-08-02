const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Zed",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "AI",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini MessageBoard", messages: messages });
});

indexRouter.get("/new", (req, res) => {
  res.render("form");
});

indexRouter.post("/new", (req, res) => {
  messages.push({
    text: req.body.message,
    user: req.body.user,
    added: new Date(),
  });
  res.redirect("/");
});

module.exports = indexRouter;
