const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");
const connectFlash = require("connect-flash");

// Connect to Database
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// On Connection Testing
mongoose.connection.on("connected", () => {
  console.log(`Connected to Database ${config.database}`);
});

// On Error
mongoose.connection.on("error", err => {
  console.log(`Database Error ${err}`);
});

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  expressSession({ secret: "secret", saveUninitialized: true, resave: true })
);

const users = require("./routes/users");

// Port Number
// const port = 3000;
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(connectFlash());

require("./config/passport")(passport);

// Users route
app.use("/users", users);

// Index route
app.get("/", (req, res) => {
  res.send("Invalid request");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
