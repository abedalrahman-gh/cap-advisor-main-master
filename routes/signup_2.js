const express = require("express");
const router = express.Router();
const validator = require("validator");

router.get("/", (req, res) => {
  res.render("signup_2", { errors: {} });
});

router.post("/", async (req, res) => {
  const { full_name, student_id } = req.body;
  let errors = {};

  // Validate full name
  if (!validator.matches(full_name, /^[\u0621-\u064A" ]+$/)) {
    errors.full_name =
      "Full name must contain only Arabic letters, double quotations, and spaces.";
  }

  // Validate student ID
  if (!validator.matches(student_id, /^\d{8}$/i)) {
    errors.student_id = "Student ID must be in the format ########.";
  }

  // Check for validation errors
  if (Object.keys(errors).length > 0) {
    res.render("signup_2", { errors, full_name, student_id });
  } else {
    // Registration successful, redirect to success page
    res.redirect("/success");
  }
});

module.exports = router;
