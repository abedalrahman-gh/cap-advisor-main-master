const mongoose = require("mongoose");

const usergradeSchema = new mongoose.Schema({
    course: {
    type: String,
    required: true,
    unique: true,
  },
  grade: {
    type: char,
    required: true,

  },
  
});



const usergrade = mongoose.model("usergrade", usergradeSchema);

module.exports = usergrade;
