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

router.get("/user/quiz/:qid/:uid", userAdmin, (req, res) => {
  if (req.params.qid == undefined || req.params.uid==undefined) {
    res.status(404).json({ error: "Bad Request" });
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
        dta.forEach(item => (item.ans = []));
        User.find({_id:req.params.uid}).then(userData => {
          if(!userData) res.status(404).json({error:"user not found"});
          let userQuiz = null;
          if(userData[0].quizs!==null){
            userData[0].quizs.forEach(itm => {
              if (itm.qid === req.params.qid) {
                userQuiz = itm;
              }
            });  
          }
          // console.log(userQuiz);
          if(userQuiz==null){
            let obj = {};
            obj.qid = req.params.qid;
            obj.startTime = (new Date());
            // console.log(obj);
            // console.log(req.params.uid);
            User.updateOne({_id:req.params.uid},{$push:{quizs:obj}},(err,afft,da)=>{
              if(err) res.status(400).json({error:"can not push quiz"});
              User.find({_id:req.params.uid}).then(userData => {
                if(!userData) res.status(404).json({error:"user not found"});
                let userQuiz = null;
                if(userData[0].quizs!==null){
                  userData[0].quizs.forEach(itm => {
                    if (itm.qid === req.params.qid) {
                      userQuiz = itm;
                    }
                  });  
                }
                let dtaf = JSON.parse(JSON.stringify(dta));
                dtaf.forEach(im => (userQuiz.qdata && userQuiz.qdata[im._id] ? im.userAns = userQuiz.qdata[im._id].ans : im.userAns = []));
                let quizFull = {
                  questionsFull: dtaf,
                  ...quiz.toObject(),
                  startTime: userQuiz.startTime,
                };
                res.status(200).json({ quizFull });            
              });
      
            });
          }
          else{
            let dtaf = JSON.parse(JSON.stringify(dta));
            dtaf.forEach(im => (userQuiz.qdata && userQuiz.qdata[im._id] ? im.userAns = userQuiz.qdata[im._id].ans : im.userAns = []));
            let quizFull = {
              questionsFull: dtaf,
              ...quiz.toObject(),
              startTime: userQuiz.startTime,
            };
            res.status(200).json({ quizFull });    
          }
        });
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
            if (itm.qid === req.params.qid) {
              userQuiz = itm.qdata;
            }
          });
          let dtaf = JSON.parse(JSON.stringify(dta));
          dtaf.forEach(im => (im.userAns = userQuiz[im._id].ans));
          // console.log(dtaf);
          console.log(quiz);
        let quizFull = {
          questionsFull: dtaf,
          ...quiz.toObject()
        };
        console.log(quizFull);
        res.status(200).json({ quizFull });
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
        console.log(submitAns);
        User.updateOne({_id:req.body.userId,'quizs.qid':req.body.qid},{$set:{'quizs.$.qdata':submitAns}},(err,afft,da)=>{
          if(err) res.status(400).error({error:"bad request"});
          console.log(da);
          res.status(200).json({ ok:"ok" });
        });
      }
    );
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
