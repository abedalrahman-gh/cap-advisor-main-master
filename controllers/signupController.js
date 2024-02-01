const validator = require("validator");
const User = require("../models/user");

// Function to validate input fields
function validateFields({ full_name, student_id, github_account, languages }) {
  let errors = {};

  // Validate full name
  if (full_name && !validator.matches(full_name, /^[\u0621-\u064A" ]+$/)) {
    errors.full_name =
      "Full name must contain only Arabic letters, double quotations, and spaces.";
  }

  // Validate student ID
  if (student_id && !validator.matches(student_id, /^\d{8}$/i)) {
    errors.student_id = "Student ID must be in the format ########.";
  }

  // Validate Github account
  if (
    github_account &&
    !validator.isURL(github_account, {
      protocols: ["https"],
      require_protocol: true,
    })
  ) {
    errors.github_account =
      "Please enter a valid Github account URL (https://github.com/username).";
  }

  // Validate programming languages
  if (languages && !validator.matches(languages, /^[\w\s,]+$/i)) {
    errors.languages =
      "Programming languages must contain only letters, numbers, spaces, and commas.";
  }

  return errors;
}

exports.postSignupPage = async (req, res) => {
  const { full_name, student_id, enrolled, github_account, languages } =
    req.body;

  // Validate input fields
  const errors = validateFields({
    full_name,
    student_id,
    github_account,
    languages,
  });

  // Set errors to the session
  req.session.errors = errors;

  // Check for validation errors
  if (Object.keys(errors).length > 0) {
    return res.render("signup", {
      errors,
      full_name,
      student_id,
      enrolled,
      github_account,
      languages,
    });
  } else {
    try {
      // Update user object with on_cap, github_account and languages fields
      const user = new User({
        email: req.session.email,
        password: req.session.password,
        gender: req.session.gender,
        birthdate: req.session.birthdate,
        full_name,
        student_id,
        enrolled,
        github_account,
        languages,
      });

      await user.save();
      // Registrtion successful, set step2Completed flag in session and redirect to success page
      req.session.step2Completed = true;
      return res.redirect("/success");
    } catch (error) {
      // If there was an error saving the user to the database, render the signup page with an error message
      console.log(error);
      errors.database = `Error saving user to database. ${error}`;
      return res.render("signup", {
        errors,
        full_name,
        student_id,
        github_account,
        languages,
      });
    }
  }
};

exports.getSignupPage = async (req, res) => {
  const { full_name, student_id, enrolled, github_account, languages } =
    req.query;

  // Validate input fields
  const errors = validateFields({
    full_name,
    student_id,
    github_account,
    languages,
  });

  return res.render("signup", {
    errors,
    full_name,
    student_id,
    enrolled,
    github_account,
    languages,
  });
};
