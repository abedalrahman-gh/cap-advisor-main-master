const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://mosabkhraim3:EpF2k8FfZRToILSb@capadvisorcluster.wpm3mes.mongodb.net/?retryWrites=true&w=majority";

const User = require("./models/user");

const startpageRoutes = require("./routes/startpage");
const loginRoutes = require("./routes/login");
const registerationRoutes = require("./routes/registeration");
const signupRoutes = require("./routes/signup");
const successRoutes = require("./routes/success");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key-here",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware function to check if the user has completed the first step of signup
const checkStep1Completed = (req, res, next) => {
  if (!req.session.step1Completed) {
    // Redirect the user to the first step of signup if they haven't completed it yet
    res.redirect("/registeration");
  } else {
    // Allow the request to continue to the next middleware function or route handler
    next();
  }
};

app.use("/", startpageRoutes);
app.use("/login", loginRoutes);
app.use("/registeration", registerationRoutes);
app.use("/signup", checkStep1Completed, signupRoutes);
app.use("/success", successRoutes);

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongodb server");
  } catch (error) {
    console.log(error);
  }
}

connect(); // call the function

// New route handler to retrieve all users and return as JSON
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
