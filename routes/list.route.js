const router = require("express").Router();
const List = require("../models/list.model");
const User = require("../models/user.model");

router.get("/", (req, res) => {
    res.render("auth/signin");
});

router.get("/list", async (req, res) => {
    try {
      let lists = await List.find();
      console.log(lists);
    
      res.render("lists/list", { lists });
    } catch (error) {
      console.log(error);
    }
});

router.get("/new", async (req, res) => {
    try {
      let lists = await List.find();
      console.log(lists[0]);
    
      res.render("lists/new", { lists });
    } catch (error) {
      console.log(error);
    }
});

router.post("/new", async (req, res) => {
    try{
        let {item,quantity,deliveryDate,status=0} = req.body;
    
        // let hashedPassword = await bcrypt.hash(password, saltRounds);
        let list = new List({
          lists: [{items:[{item,quantity}],
          deliveryDate,
          status}]
        })
          
            let savedList = await list.save();

            if(savedList){
                res.redirect("/");
            }
        }catch(error){
            console.log(error);
        }
    
  
    list
    .save()
    .then(() => {
      res.redirect("/list");
    })
    .catch((err) => {
      console.log(err);
    });
});
  


module.exports = router;