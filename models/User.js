const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Must Enter The Username"],
  },

  name: {
    type: String,
    required: [true, "Must Enter The Name"],
  },

  password: {
    type: String,
    required: [true, "Must Enter The Password"],
    minLength: 4,
  },
});

UserSchema.methods.comparePassword = async function (Password) {
  console.log(this.password);
  return await bcrypt.compare(Password, this.password);
};

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.genrateToken = async function () {

  console.log(this)
  return await jwt.sign(
    { username: this.username, _id: this._id, name: this.name , dollars: this.dollers},
    process.env.JWT_SECRET
  );
};

const userModel = mongoose.model("user", UserSchema);
module.exports = { userModel };
