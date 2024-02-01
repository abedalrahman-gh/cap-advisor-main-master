const validator = require("validator");

function validateFields({ password, c_password, email }) {
  let errors = {};
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      maxLength: 20,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    errors.password =
      "Password must be between 8 and 20 characters and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.";
  }

  // Validate confirm password
  if (password !== c_password) {
    errors.c_password = "Passwords do not match.";
  }

  // Validate email
  if (!validator.isEmail(email)) {
    errors.email = "Invalid email format.";
  }

  return errors;
}

exports.postRegisterationPage = async (req, res) => {
  const { password, c_password, email, gender, birthdate } = req.body;

  const errors = validateFields({
    email,
    password,
    c_password,
  });

  req.session.errors = errors;
  req.session.email = email;
  req.session.password = password;
  req.session.gender = gender;
  req.session.birthdate = birthdate;

  // Check for validation errors
  if (Object.keys(errors).length > 0) {
    res.render("registeration", { errors, email });
  } else {
    req.session.step1Completed = true;
    res.redirect("/signup");
  }
};

exports.getRegisterationPage = (req, res) => {
  res.render("registeration", {
    email: req.session.email || "",
    gender: req.session.gender || "",
    birthdate: req.session.birthdate || "",
    errors: req.session.errors || {},
  });
  req.session.errors = {};
};
