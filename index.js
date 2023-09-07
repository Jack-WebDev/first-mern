const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const DB_URI =
  "mongodb+srv://jackwebdev31:jwt1234@cl.6tuquqw.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB_URI)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.get("*", checkUser);

app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/smoothies", requireAuth, (req, res) => {
  res.render("smoothies", { title: "Recipes" });
});

app.use(authRoutes);
