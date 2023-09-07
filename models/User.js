const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Enter password Sbvli"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Enter a valid email nigga!"],
    },
    password: {
      type: String,
      required: [true, "Manje iPassword iphi?"],
      minlength: [5, "Password too short bro!"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      console.log(user);
      return user;
    }
    throw Error("Wrong password");
  }

  throw Error("Wrong email");
};



const User = mongoose.model("user", userSchema);

module.exports = User;
