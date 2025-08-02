const express = require("express");
const path = require("node:path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/indexRouter.js");

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.send(err.message);
});

app.listen(3000, () => {
  console.log("Server Listening at 3000");
});
