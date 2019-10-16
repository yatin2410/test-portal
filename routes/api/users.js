const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const authAdmin = require("./authAdmin");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Group = require("../../models/Group");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      User.findOne({ Id: req.body.Id }).then(usr => {
        if (usr) {
          return res.status(400).json({ Id: "Id already exists" });
        } else {
          Group.findOne({ group: req.body.group }).then(grp => {
            if (!grp || req.body.group === "Admin") {
              return res.status(400).json({ group: "Group is not valid" });
            } else {
              const newUser = new User({
                Id: req.body.Id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                group: req.body.group
              });
              // Hash password before saving in database
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
              });
            }
          });
        }
      });
    }
  });
});

router.post("/registeradmin",authAdmin, (req, res) => {
  // Form validation
  let Admin = req.body;
  Admin.password2 = Admin.password;
  Admin.group = "Admin";
  const { errors, isValid } = validateRegisterInput(Admin);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: Admin.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      User.findOne({ Id: Admin.Id }).then(usr => {
        if (usr) {
          return res.status(400).json({ Id: "Id already exists" });
        }
        const newUser = new User({
          Id: Admin.Id,
          name: Admin.name,
          email: Admin.email,
          password: Admin.password,
          group: Admin.group,
          IsAdmin: true
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      });
    }
  });
});


router.put("/register", (req, res) => {
  // Form validation
  let Admin = req.body;
  const { errors, isValid } = validateRegisterInput(Admin);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  if(Admin.oldpassword===Admin.password){
    res.status(400).json({password :"password field should be different then oldpassword."});
  }
  User.findOne({ email: Admin.email }).then(user => {
    if (!user) {
      return res.status(400).json({ email: "Email does not exists" });
    } else {
      console.log(user.Id,Admin.Id);
        if (user.Id != Admin.Id) {
          return res.status(400).json({ Id: "Id does not match" });
        }
        Group.findOne({ group: req.body.group }).then(grp => {
          if (!grp && req.body.group !== "Admin") {
            return res.status(400).json({ group: "Group is not valid" });
          }
        bcrypt.compare(Admin.oldpassword, user.password).then(isMatch => {
          if (isMatch) {
        console.log(Admin.oldpassword,user.password);
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(Admin.password, salt, (err, hash) => {
            if (err) throw err;
            Admin.password = hash;
            console.log(Admin.password);
            User.update({Id:Admin.Id},{name:Admin.name,group:Admin.group,password:Admin.password},(err,afft,data)=>{
              if(err)
               res.status(400).json({error:"unexpected error"});
              else  
                res.status(200).json({ok:"ok"});
            });
          });
        });
      }
      else{
        res.status(404).json({oldpassword:"password not match"});
      }
    });
      });
    }
  });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          Id: user.Id,
          name: user.name,
          email: user.email,
          group: user.group,
          IsAdmin: user.IsAdmin
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get("/", authAdmin, (req, res) => {
  User.find().then(data => {
    res.status(200).json(data);
  });
});

router.delete("/", authAdmin, (req, res) => {
  console.log("in delete");
  User.deleteOne({ Id: req.body.Id }, err => {
    if (err) res.status(400).json({ error: "Id does not exist" });
    res.status(200).json({ ok: "ok" });
  });
});

module.exports = router;
