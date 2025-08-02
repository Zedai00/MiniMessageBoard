const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Zed",
    added: new Date(),
  },
  {
    id: 2,
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
    id: messages.length + 1,
    text: req.body.message,
    user: req.body.user,
    added: new Date(),
  });
  res.redirect("/");
});

indexRouter.get("/message/:id", (req, res) => {
  const message = messages.find(msg => msg.id === parseInt(req.params.id))
  if (!message) {
    return res.status(404).send("Message not found")
  }

  res.render("detail", { title: "Message Detail", message })
})

module.exports = indexRouter;
