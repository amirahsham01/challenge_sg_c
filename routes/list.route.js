const router = require("express").Router();
const List = require("../models/list.model");

router.get("/", (req, res) => {
    res.render("auth/signin");
});
  
router.get("/list", (req, res) => {
    res.render("lists/list");
});

router.get("/new", async (req, res) => {
    try {
      let lists = await List.find();
  
      res.render("lists/new", { lists });
    } catch (error) {
      console.log(error);
    }
});

router.post("/new", (req, res) => {
    //   console.log(req.body);
    let list = new List(req.body);
    console.log(list);
  
  
    //save restaurant first
    list
      .save()
      .then(() => {
        //restaurant : { _id: , ownedBy: , name : ,}
        //if saved then save user
        User.findById(user.lists).then((user) => {
          //push into restaurants array in user model
          user.lists.push(list._id);
  
          user.save().then(() => {
            //if sucess redirect to home page
            res.redirect("/");
          });
        });
      })
      .catch((err) => {
        console.log(err);
    });
});
  


module.exports = router;