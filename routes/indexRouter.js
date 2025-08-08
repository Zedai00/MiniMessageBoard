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

indexRouter.post("/message/:id/delete", (req, res) => {
  const id = parseInt(req.params.id)
  const index = messages.findIndex(msg => msg.id === id)
  if (index === -1) {
    return res.status(404).send("Message not found")
  }

  messages.splice(index, 1)
  res.redirect("/")
})

indexRouter.get("/message/:id/edit", (req, res) => {
  const message = messages.find(msg => msg.id === parseInt(req.params.id));
  if (!message) return res.status(404).send("Message not found");
  res.render("edit", { title: "Edit Message", message });
});

indexRouter.post("/message/:id/edit", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find(msg => msg.id === id);
  if (!message) return res.status(404).send("Message not found");

  message.user = req.body.user;
  message.text = req.body.message;
  message.added = new Date();

  res.redirect(`/message/${id}`);
});


module.exports = indexRouter;
