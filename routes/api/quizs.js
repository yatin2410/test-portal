const express = require("express");
const router = express.Router();
const authAdmin = require("./authAdmin");
const Quiz = require("../../models/Quiz");
const validateQuizInput = require("../../validation/quiz");
const moongose = require("mongoose");
const Question = require("../../models/Question");

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
    Quiz.find({_id:req.body._id}).then(data => {
      if(!data) res.status(400).json({error:"some errors"});
      Quiz.update(
        {_id:req.body._id},
        {
          ...req.body
        },
        (err,afft,data)=>{
          if(err) res.status(400).json({error:"some error"});
          res.status(200).json({ok:"ok"});
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
    if(req.params.id==undefined){
      res.status(404).json({error:"quiz not found"});
    }
    Quiz.find({_id:req.params.id}).then((data)=>{
      if(!data) res.status(404).json({error:"quiz not found"});
        let questionids = data[0].questions;
        questionids = questionids.map((item)=>moongose.Types.ObjectId(item));
        console.log(questionids);
        Question.find({
          '_id':{ $in: questionids}
        },
        (err,data)=>{
          if(err) res.status(400).json({error:"no questions"});
          res.status(200).json({data});
        });
    });
});

module.exports = router;
