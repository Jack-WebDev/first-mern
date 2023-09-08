const express = require("express");
const dotevn = require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 3000;

const app = express();
connectDB();

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

app.listen(port);
