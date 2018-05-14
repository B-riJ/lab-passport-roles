const express        = require("express");
const router         = express.Router();
//build user model 
const User           = require("../models/user");
const bcrypt         = require('bcrypt');
const bcryptSalt     = 10;
const passport       = require("passport");
//const are added to use in file 

//creating a Boss user

// sceening if user is boss
function isBoss() {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === "Boss") {
      return next();
    } else {
      res.redirect('/')
    }
  }
}


//router. get passes isBoss() function before signup
router.get("/signup", isBoss(), (req, res, next) => {
  res.render("auth/signup");
});
//end get/signup route

//create post for signup.hbs form 
router.post("/signup", (req, res, next) => {
  //sign-up.hbs under Username (label) name =username
  const username = req.body.username;
  const password = req.body.password;
  const role     = req.body.role;

  if(username ==="" ||password===""){
    res.render('auth/signup', {
      message:` Missing Credentials.Please enter a username`})
      return;
    };

  User.findOne({username:username})
  .then((user) =>{
    if(user != null){
    res.render('auth/signup', {message:`
      sorry, username already exist`
    })
      return;
    } // end if statement 


    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(password, salt);
    //^password save on database
    
    User.create({username:username,
       password: hashPass,
      role: role})

    .then((theUser)=> {
      res.redirect('/')
      
      })
    .catch((err) => {
      console.log(err);
      next(err);
      })

    }) // end the .then function for user.findOne
    .catch((err) =>{
      console.log(err);
      next(err);
    })
    
  }); //end post /signup route

router.get('/login', (req, res, next) => {
  res. render('auth/login');

}) // end get /login


router.post("/login", passport.authenticate("local",
  {
    successRedirect:"/",
    failureRedirect: "/login",
    failureFlash:false,
    pasReqToCallback: true
  }
));

  
  //   if (username === "" || password === "") {
  //     res.render("auth/signup", { message: "Indicate username and password" });
  //     return;
  //   }
 
  //   User.findOne({ username:username }, "username", (err, user) => {
  //     if (user !== null) {
  //       res.render("auth/signup", { message: "Sorry, The username already exists" });
  //       return;
  //     }
  
  //     // const salt = bcrypt.genSaltSync(bcryptSalt);
  //     // const hashPass = bcrypt.hashSync(password, salt);
  
  //     const newUser = new User({
       
  //       username: username,
  //       password: hashPass
  //     });
  
  //     newUser.save((err) => {
  //       if (err) {
  //         res.render("auth/signup", { message: "Something went wrong" });
  //       } else {
  //         res.redirect("/");
  //       }
  //     });
  //   });
  // });
  
  // authRoutes.get("/login", (req, res, next) => {
  //   res.render("auth/login",{ "message": req.flash("error") });
  // });

  // authRoutes.post("/login", passport.authenticate("local", {
  //   successRedirect: "/",
  //   failureRedirect: "/login",
  //   failureFlash: true,
  //   passReqToCallback: true
  // }));


module.exports = router;