const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
  },
  full_name: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
    unique: true,
  },
  enrolled: {
    type: Boolean,
    required: true,
  },
  languages: {
    type: [String],
    trim: true,
    default: [],
  },
  github_account: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.github_account;
  delete user.email;
  delete user.birthdate;
  delete user.gender;
  return user;
};

userSchema.methods.comparePassword = function (password) {
  return this.password === password;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
