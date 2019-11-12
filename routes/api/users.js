const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const authAdmin = require("./authAdmin");
const userAdmin = require("./auth");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const isEmpty = require("is-empty");
const Validator = require("validator");

// Load User model
const User = require("../../models/User");
const Group = require("../../models/Group");
const Quiz = require("../../models/Quiz");
const Request = require("../../models/Request");

// mail
var nodemailer = require('nodemailer');

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

router.post("/registeradmin", authAdmin, (req, res) => {
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
  if (Admin.oldpassword === Admin.password) {
    res.status(400).json({ password: "password field should be different then oldpassword." });
  }
  User.findOne({ email: Admin.email }).then(user => {
    if (!user) {
      return res.status(400).json({ email: "Email does not exists" });
    } else {
      console.log(user.Id, Admin.Id);
      if (user.Id != Admin.Id) {
        return res.status(400).json({ Id: "Id does not match" });
      }
      Group.findOne({ group: req.body.group }).then(grp => {
        if (!grp && req.body.group !== "Admin") {
          return res.status(400).json({ group: "Group is not valid" });
        }
        bcrypt.compare(Admin.oldpassword, user.password).then(isMatch => {
          if (isMatch) {
            console.log(Admin.oldpassword, user.password);
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(Admin.password, salt, (err, hash) => {
                if (err) throw err;
                Admin.password = hash;
                console.log(Admin.password);
                User.update({ Id: Admin.Id }, { name: Admin.name, group: Admin.group, password: Admin.password }, (err, afft, data) => {
                  if (err)
                    res.status(400).json({ error: "unexpected error" });
                  else
                    res.status(200).json({ ok: "ok" });
                });
              });
            });
          }
          else {
            res.status(404).json({ oldpassword: "password not match" });
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
          IsAdmin: user.IsAdmin,
          quizs: user.quizs
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

router.get("/:id", userAdmin, (req, res) => {
  console.log(req.params);
  if (!req.params.id) res.status(400).json({ error: "bad request" });
  User.findOne({ _id: req.params.id }).then(user => {
    if (!user) res.status(400).json({ error: "bad request" });
    res.status(200).json(user);
  });
});

router.get("/results/:id", userAdmin, (req, res) => {
  if (!req.params.id) res.status(400).json({ error: "bad request" });
  User.findOne({ _id: req.params.id }).then(user => {
    if (!user) res.status(400).json({ error: "bad request" });
    let arr = [];
    for (let i = 0; i < user.quizs.length; i++) {
      arr.push(...Object.keys(user.quizs[i]));
    }
    Quiz.find(
      {
        _id: { $in: arr }
      },
      (err, data) => {
        if (err) res.status(400).json({ error: "bad request" });;
        res.status(200).json({ quizDatail: data, quizs: user.quizs });
      });
  });
});

let smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: keys.email,
    pass: keys.password
  }
};
let transporter = nodemailer.createTransport(smtpConfig);


router.post("/forgot", (req, res) => {
  let email = req.body.email;
  let errors = {};

  if (!Validator.isEmail(email)) {
    errors.email = "Email is not valid";
    res.status(404).json({ errors });
  }
  User.find({ email: email }).then(data => {
    if (isEmpty(data)) {
      errors.emailnotfound = "Email not found";
      res.status(404).json({ errors });
    }
    else {
      let mailOptions = {
        from: keys.email,
        to: email,
        subject: 'Password change request from spc-test-portal',
        text: 'Please change password using this link: '
      };
      console.log(data[0]._id);
      const newRequest = new Request({
        uid: data[0]._id,
      });
      newRequest
        .save()
        .then(ur => {
          mailOptions.text += ur._id;
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).json({ ok: "ok" });
            }
          });
        })
        .catch(err => console.log(err));
    }
  });
});

router.post("/changePassword", (req, res) => {
  let data = req.body;
  let errors = {};
  if (isEmpty(data._id)) {
    errors.submit = "please use link from sent mail";
  }
  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (isEmpty(data.password2)) {
    errors.password2 = "password2 Field is required";
  }
  if (data.password !== data.password2) {
    errors.password2 = "password does not match";
  }
  console.log(errors);
  console.log(data._id);

  Request.find({ _id: data._id }).then(dta => {
    if (!dta) {
      errors.submit = "please use link from sent mail"
    }
    console.log(errors);
    console.log(dta);
    if (!isEmpty(errors)) {
      console.log(errors);
      res.status(400).json({ errors });
    }
    else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.password, salt, (err, hash) => {
          if (err) res.status(400).json({errors});
          console.log(dta[0].uid);
          console.log(hash);
          User.update({ _id: dta[0].uid }, { password: hash }, (err, afft, da) => {
            if (err) res.status(400).json({ err });
            else {
              Request.deleteOne({ _id: data._id }).then(d => {
                console.log("done", da);
                res.status(200).json({ ok: "ok" });
              });
            }
          });
        });
      });
    }
  })
    .catch(err => {
      errors.submit = "please use link from sent mail";
      res.status(400).json({ errors });
    });
});

module.exports = router;
