const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
   try {
      const currentUser = await User.findById(req.session.user._id);
      res.render("foods/index.ejs", {foods: currentUser.foods});
   } catch (error) {
      console.log(error);
      res.redirect("/");
   }
 });
 

router.get("/new", (req, res) => {
   res.render("foods/new.ejs");
});

router.get("/:foodId", async (req, res) => {
   const currentUser = await User.findById(req.session.user._id);
   const foodData = currentUser.foods.id(req.params.foodId);

   res.render("foods/show.ejs", {foods: foodData});
})

router.post("/", async (req, res) => {
   try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.foods.push(req.body);
      await currentUser.save();
      res.redirect("/foods");
   } catch (error) {
      console.error(error);
      res.redirect("/foods");
   }
})




module.exports = router;
