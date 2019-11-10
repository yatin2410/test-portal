const express = require("express");
const router = express.Router();
const authAdmin = require("./authAdmin");
const userAdmin = require("./auth");
const Quiz = require("../../models/Quiz");
const validateQuizInput = require("../../validation/quiz");
const moongose = require("mongoose");
const Question = require("../../models/Question");
const isEmpty = require("is-empty");
const Validator = require("validator");
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


router.get("/user/:group", userAdmin, (req, res) => {
  const group = req.params.group;
  console.log(group);
  Quiz.find({groups:group}).then(data => {
    console.log(data);
    res.status(200).json(data);
  });
});

router.get("/user/quiz/:id",userAdmin,(req,res) => {
  if(req.params.id==undefined){
    res.status(404).json({error:"quiz not found"});
  }
  Quiz.find({_id:req.params.id}).then((data)=>{
    if(!data) res.status(404).json({error:"quiz not found"});
      let quiz = data[0];
      let questionids = quiz.questions;
      questionids = questionids.map((item)=>moongose.Types.ObjectId(item));
      console.log(questionids);
      Question.find({
        '_id':{ $in: questionids}
      },
      (err,dta)=>{
        if(err) res.status(400).json({error:"no questions"});
        dta.forEach((item) => item.ans = []);
        let quizFull = {
          questionsFull:dta,
          ...quiz.toObject(),
        };
        res.status(200).json({quiz:quizFull});
      });
  });
});

function validateRandomQuiz(obj,easyQ,mediumQ,hardQ){
  let errors = {};
  if(isEmpty(obj.easy)){
    errors.easy = "It must be a number";
  }
  if(isEmpty(obj.medium)){
    errors.medium = "It must be a number";
  }
  if(isEmpty(obj.hard)){
    errors.hard = "It must be a number";
  }
  if(!Validator.isNumeric(obj.easy)){
    errors.easy = "It must be a number";
  }
  if(!Validator.isNumeric(obj.medium)){
    errors.medium = "It must be a number";
  }
  if(!Validator.isNumeric(obj.hard)){
    errors.hard = "It must be a number";
  }
  if( Number(obj.easy) > easyQ.length ){
    errors.easy = "Select a number between 0 and " + easyQ.length;
  }
  if( Number(obj.medium) > mediumQ.length ){
    errors.medium = "Select a number between 0 and " + mediumQ.length;
  }
  if( Number(obj.hard) > hardQ.length ){
    errors.hard = "Select a number between 0 and " + hardQ.length;
  }
  return errors;
}

router.post("/random/:id", authAdmin, (req, res) => {
  if(!req.params.id) res.status(400).json({error:"bad request"});
  let easyQ, mediumQ, hardQ;
  Question.find({difficulty:"1"}).then(data=>{
    easyQ = data;
    Question.find({difficulty:"2"}).then(dta=>{
    mediumQ = dta;
      Question.find({difficulty:"3"}).then(da=>{
        hardQ = da;
        let errors = validateRandomQuiz(req.body,easyQ,mediumQ,hardQ);
        console.log(errors,isEmpty(errors));
        if(!isEmpty(errors)){
          res.status(404).json(errors);
        }
        else{
        let questionids = [];
        let cnt= 0;
        console.log(questionids);
        while(cnt !== Number(req.body.easy)){
          let  r = Math.floor(Math.random() * easyQ.length);
          if(questionids.indexOf(easyQ[r]._id)===-1) {
            questionids.push(easyQ[r]._id);
            cnt++;
          }
        }
        console.log(questionids);
        cnt= 0;
        while(cnt !== Number(req.body.medium)){
          let  r = Math.floor(Math.random() * mediumQ.length);
          if(questionids.indexOf(mediumQ[r]._id)===-1) {
            questionids.push(mediumQ[r]._id);
            cnt++;
          }
        }
        cnt= 0;
        while(cnt !== Number(req.body.hard)){
          let  r = Math.floor(Math.random() * hardQ.length);
          if(questionids.indexOf(hardQ[r]._id)===-1) {
            questionids.push(hardQ[r]._id);
            cnt++;
          }
        }
        console.log(questionids);
        Quiz.update(
          {_id:req.params.id},
          {
            questions: questionids
          },
          (err,afft,data)=>{
            console.log(err);
            if(err) res.status(400).json({error:"bad request"});
            res.status(200).json({ok:"ok"});
          });
        }
      });
    });
  });
});

module.exports = router;
