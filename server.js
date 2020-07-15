const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const server = express();
const passport = require("./config/passportConfig");
const session = require("express-session");
const flash = require("connect-flash");
const checkUser = require("./config/loginBlocker");
require("dotenv").config();


mongoose.connect(
  process.env.MONGODBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("MongoDB connected!");
  }
);

server.use(express.urlencoded({ extended: true })); //collects form data
server.set("view engine", "ejs"); //view engine setup
server.use(expressLayouts);

/*-- These must be place in the correct place */
server.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 360000 }
  })
);
//-- passport initialization
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

server.use(function(request, response, next) {
  // before every route, attach the flash messages and current user to res.locals
  response.locals.alerts = request.flash();
  response.locals.currentUser = request.user;
  next();
});

//all routes
server.use("/auth", require("./routes/auth.route"));
server.use("/", checkUser, require("./routes/list.route"));

//connect to Port
server.listen(process.env.PORT, () => {
  console.log(`running on PORT ${process.env.PORT}`);
});
