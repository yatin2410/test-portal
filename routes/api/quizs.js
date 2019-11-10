const express = require("express");
const router = express.Router();
const authAdmin = require("./authAdmin");
const userAdmin = require("./auth");
const Quiz = require("../../models/Quiz");
const validateQuizInput = require("../../validation/quiz");
const moongose = require("mongoose");
const Question = require("../../models/Question");
const User = require("../../models/User");
router.post("/", authAdmin, (req, res) => {
  const { errors, isValid } = validateQuizInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    const newQuiz = new Quiz({
      ...req.body
    });
    newQuiz
      .save()
      .then(quiz => res.status(200).json({ quiz: quiz }))
      .catch(err => console.log(err));
  }
});

router.put("/", authAdmin, (req, res) => {
  const { errors, isValid } = validateQuizInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    const newQuiz = new Quiz({
      ...req.body
    });
    Quiz.find({ _id: req.body._id }).then(data => {
      if (!data) res.status(400).json({ error: "some errors" });
      Quiz.update(
        { _id: req.body._id },
        {
          ...req.body
        },
        (err, afft, data) => {
          if (err) res.status(400).json({ error: "some error" });
          res.status(200).json({ ok: "ok" });
        }
      );
    });
  }
});

router.put("/questions", authAdmin, (req, res) => {
  const errors = {};
  if (req.body.questions === null) {
    errors.questions = "Please select atleast one question.";
  }
  if (errors.questions !== undefined) {
    res.status(400).json(errors);
  } else {
    Quiz.find({ _id: req.body._id }).then(data => {
      if (!data) res.status(404).json({ ans: "_id is not found" });
      Quiz.update({ _id: req.body._id }, { ...req.body }, (err, afft, data) => {
        if (err) res.status(400).json({ error: "unexpected error" });
        else res.status(200).json({ ok: "ok" });
      });
    });
  }
});

router.get("/", authAdmin, (req, res) => {
  Quiz.find().then(data => {
    res.status(200).json(data);
  });
});

router.get("/questions/:id", authAdmin, (req, res) => {
  if (req.params.id == null) {
    res.status(400).json({ error: "cant find quiz" });
  }
  Quiz.find({ _id: req.params.id }).then(data => {
    if (!data) res.status(404).json({ error: "cant find quiz" });
    res.status(200).json(data[0].questions);
  });
});

router.get("/:id", authAdmin, (req, res) => {
  if (req.params.id == null) {
    res.status(400).json({ error: "cant find quiz" });
  }
  Quiz.find({ _id: req.params.id }).then(data => {
    if (!data) res.status(404).json({ error: "cant find quiz" });
    res.status(200).json(data[0]);
  });
});

router.delete("/", authAdmin, (req, res) => {
  console.log("in delete");
  Quiz.deleteMany({ _id: req.body._id }, err => {
    if (err) res.status(400).json({ error: "no quiz in this group" });
    Quiz.deleteOne({ group: req.body._id }, err => {
      if (err) res.status(400).json({ error: "quiz does not exist" });
      res.status(200).json({ ok: "ok" });
    });
  });
});

router.get("/showquestions/:id", authAdmin, (req, res) => {
  if (req.params.id == undefined) {
    res.status(404).json({ error: "quiz not found" });
  }
  Quiz.find({ _id: req.params.id }).then(data => {
    if (!data) res.status(404).json({ error: "quiz not found" });
    let questionids = data[0].questions;
    questionids = questionids.map(item => moongose.Types.ObjectId(item));
    Question.find(
      {
        _id: { $in: questionids }
      },
      (err, data) => {
        if (err) res.status(400).json({ error: "no questions" });
        res.status(200).json({ data });
      }
    );
  });
});

router.get("/user/:group", userAdmin, (req, res) => {
  const group = req.params.group;
  Quiz.find({ groups: group }).then(data => {
    res.status(200).json(data);
  });
});

router.get("/user/quiz/:id", userAdmin, (req, res) => {
  if (req.params.id == undefined) {
    res.status(404).json({ error: "quiz not found" });
  }
  Quiz.find({ _id: req.params.id }).then(data => {
    if (!data) res.status(404).json({ error: "quiz not found" });
    let quiz = data[0];
    let questionids = quiz.questions;
    questionids = questionids.map(item => moongose.Types.ObjectId(item));
    Question.find(
      {
        _id: { $in: questionids }
      },
      (err, dta) => {
        if (err) res.status(400).json({ error: "no questions" });
        dta.forEach(item => (item.ans = []));
        let quizFull = {
          questionsFull: dta,
          ...quiz.toObject()
        };
        res.status(200).json({ quiz: quizFull });
      }
    );
  });
});

router.get("/user/result/:qid/:uid", userAdmin, (req, res) => {
  if (req.params.qid == undefined || req.params.uid==undefined) {
    res.status(404).json({ error: "quiz not found" });
  }
  Quiz.find({ _id: req.params.qid }).then(data => {
    if (!data) res.status(404).json({ error: "quiz not found" });
    let quiz = data[0];
    let questionids = quiz.questions;
    questionids = questionids.map(item => moongose.Types.ObjectId(item));
    Question.find(
      {
        _id: { $in: questionids }
      },
      (err, dta) => {
        if (err) res.status(400).json({ error: "no questions" });
        User.find({_id:req.params.uid}).then(userData => {
          if(!userData) res.status(404).json({error:"user not found"});
          let userQuiz;
          userData[0].quizs.forEach(itm => {
            if (Object.keys(itm)[0] === req.params.qid) {
              userQuiz = itm[req.params.qid];
            }
          });
          let dtaf = JSON.parse(JSON.stringify(dta));
          dtaf.forEach(im => (im.userAns = userQuiz[im._id].ans));
          // console.log(dtaf);
        let quizFull = {
          questionsFull: dtaf,
          ...quiz.toObject()
        };
        res.status(200).json({ quiz: quizFull });
      }
    );
  });

  });
});


router.post("/submit", userAdmin, (req, res) => {
  if (!req.body.userId || !req.body.qid || req.body.anss === null)
    res.status(400).json({ error: "bad request" });
  Quiz.find({ _id: req.body.qid }).then(data => {
    if (!data) res.status(400).json({ error: "bad request" });
    let quiz = data[0];
    let questionids = quiz.questions;
    questionids = questionids.map(item => moongose.Types.ObjectId(item));
    let submitAns = req.body.anss;
    Question.find(
      {
        _id: { $in: questionids }
      },
      (err, dta) => {
        if (err) res.status(400).json({ error: "no questions" });
        dta.forEach(item => {submitAns[item._id].realAns = item.ans});
        User.update({_id:req.body.userId},{$push:{quizs:{[req.body.qid]:submitAns}}},(err,afft,data)=>{
          if(err) res.status(400).error({error:"bad request"});
          res.status(200).json({ ok:"ok" });
        });
      }
    );
  });
});

module.exports = router;
