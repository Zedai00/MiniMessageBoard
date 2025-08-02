const express = require("express");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT || 3000

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

app.listen(PORT, () => {
  console.log(`Server Listening at ${PORT}`);
});
