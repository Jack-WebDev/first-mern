const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "Wrong email") {
    errors.email = "This email doesn't exist!";
  }

  if (err.message === "Wrong password") {
    errors.password = "Password is incorrect! Try again";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.code === 11000) {
    errors.email = "This email already exists maan!";

    return errors;
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createJWT = (id) => {
  return jwt.sign({ id }, "jack is awesome", {
    expiresIn: maxAge,
  });
};

const getRegister = (req, res) => {
  res.render("register", { title: "Register" });
};

const getLogin = (req, res) => {
  res.render("login", { title: "Log In" });
};

const postRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({ email, password });

    const token = createJWT(newUser._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({ newUser: newUser._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const getLogOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  getRegister,
  getLogin,
  postRegister,
  postLogin,
  getLogOut,
};
