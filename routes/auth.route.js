const router = require("express").Router();
const passport = require("../config/passportConfig");
const User = require("../models/user.model");
const isLoggedIn = require("../config/loginBlocker");


router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

//-- Login Route
router.post("/signin", passport.authenticate("local", {
    successRedirect: "/list", //after login success
    failureRedirect: "/auth/signin", //if fail
    failureFlash: "Invalid Username or Password",
    successFlash: "You have logged In!"
  })
);

//--- Logout Route
router.get("/logout", (request, response) => {
  request.logout(); //clear and break session
  request.flash("success", "Dont leave please come back!");
  response.redirect("/auth/signin");
});

router.get("/signup", (req,res)=>{
  res.render("auth/signup");
});

router.post("/signup", async (req, res) => {
  try{
    let {name,address,age,phone,password, userType} = req.body;

    let user = new User({
      name,
      address,
      age,
      phone,
      password,
      userType,
    });

    let savedUser = await user.save();

    if(savedUser){
      res.redirect("/signin");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
