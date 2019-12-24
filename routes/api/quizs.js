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
    return res.status(400).json(errors);
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
    return res.status(400).json(errors);
  } else {
    const newQuiz = new Quiz({
      ...req.body
    });
    Quiz.find({ _id: req.body._id }).then(data => {
      if (!data) return res.status(400).json({ error: "some errors" });
      Quiz.update(
        { _id: req.body._id },
        {
          ...req.body
        },
        (err, afft, data) => {
          if (err) return res.status(400).json({ error: "some error" });
          return res.status(200).json({ ok: "ok" });
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
    return res.status(400).json(errors);
  } else {
    Quiz.find({ _id: req.body._id }).then(data => {
      if (!data) return res.status(404).json({ ans: "_id is not found" });
      Quiz.update({ _id: req.body._id }, { ...req.body }, (err, afft, data) => {
        if (err) return res.status(400).json({ error: "unexpected error" });
        else return res.status(200).json({ ok: "ok" });
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
    return res.status(400).json({ error: "cant find quiz" });
  }
  Quiz.find({ _id: req.params.id }).then(data => {
    if (!data) return res.status(404).json({ error: "cant find quiz" });
    return res.status(200).json(data[0].questions);
  });
});

router.get("/:id", authAdmin, (req, res) => {
  if (req.params.id == null) {
    return res.status(400).json({ error: "cant find quiz" });
  }
  Quiz.find({ _id: req.params.id }).then(data => {
    if (!data) return res.status(404).json({ error: "cant find quiz" });
    return res.status(200).json(data[0]);
  });
});

router.delete("/", authAdmin, (req, res) => {
  Quiz.deleteMany({ _id: req.body._id }, err => {
    if (err) return res.status(400).json({ error: "no quiz in this group" });
    Quiz.deleteOne({ group: req.body._id }, err => {
      if (err) return res.status(400).json({ error: "quiz does not exist" });
      return res.status(200).json({ ok: "ok" });
    });
  });
});

router.get("/showquestions/:id", authAdmin, (req, res) => {
  if (req.params.id == undefined) {
    return res.status(404).json({ error: "quiz not found" });
  }
  Quiz.find({ _id: req.params.id }).then(data => {
    if (!data) return res.status(404).json({ error: "quiz not found" });
    let questionids = data[0].questions;
    questionids = questionids.map(item => moongose.Types.ObjectId(item));
    Question.find(
      {
        _id: { $in: questionids }
      },
      (err, data) => {
        if (err) return res.status(400).json({ error: "no questions" });
        return res.status(200).json({ data });
      }
    );
  });
});

router.get("/user/:group", userAdmin, (req, res) => {
  const group = req.params.group;
  Quiz.find({ groups: group }).then(data => {
    return res.status(200).json(data);
  });
});

router.get("/user/quiz/:qid/:uid", userAdmin, (req, res) => {
  if (req.params.qid == undefined || req.params.uid == undefined) {
    return res.status(404).json({ error: "Bad Request" });
  }
  Quiz.find({ _id: req.params.qid }).then(data => {
    if (!data) return res.status(404).json({ error: "quiz not found" });
    let quiz = data[0];
    let questionids = quiz.questions;
    questionids = questionids.map(item => moongose.Types.ObjectId(item));
    Question.find(
      {
        _id: { $in: questionids }
      },
      (err, dta) => {
        if (err) return res.status(400).json({ error: "no questions" });
        dta.forEach(item => (item.ans = []));
        User.find({ _id: req.params.uid }).then(userData => {
          if (!userData)
            return res.status(404).json({ error: "user not found" });
          let userQuiz = null;
          if (userData[0].quizs !== null) {
            userData[0].quizs.forEach(itm => {
              if (itm.qid === req.params.qid) {
                userQuiz = itm;
              }
            });
          }
          if (userQuiz == null) {
            let obj = {};
            obj.qid = req.params.qid;
            obj.startTime = new Date();
            User.updateOne(
              { _id: req.params.uid },
              { $push: { quizs: obj } },
              (err, afft, da) => {
                if (err)
                  return res.status(400).json({ error: "can not push quiz" });
                User.find({ _id: req.params.uid }).then(userData => {
                  if (!userData)
                    return res.status(404).json({ error: "user not found" });
                  let userQuiz = null;
                  if (userData[0].quizs !== null) {
                    userData[0].quizs.forEach(itm => {
                      if (itm.qid === req.params.qid) {
                        userQuiz = itm;
                      }
                    });
                  }
                  let dtaf = JSON.parse(JSON.stringify(dta));
                  dtaf.forEach(im =>
                    userQuiz.qdata && userQuiz.qdata[im._id]
                      ? (im.userAns = userQuiz.qdata[im._id].ans)
                      : (im.userAns = [])
                  );
                  let quizFull = {
                    questionsFull: dtaf,
                    ...quiz.toObject(),
                    startTime: userQuiz.startTime,
                    submitTime: userQuiz.submitTime
                  };
                  return res.status(200).json({ quizFull });
                });
              }
            );
          } else {
            let dtaf = JSON.parse(JSON.stringify(dta));
            dtaf.forEach(im =>
              userQuiz.qdata && userQuiz.qdata[im._id]
                ? (im.userAns = userQuiz.qdata[im._id].ans)
                : (im.userAns = [])
            );
            let quizFull = {
              questionsFull: dtaf,
              ...quiz.toObject(),
              startTime: userQuiz.startTime,
              submitTime: userQuiz.submitTime
            };
            return res.status(200).json({ quizFull });
          }
        });
      }
    );
  });
});

router.get("/user/result/:qid/:uid", userAdmin, (req, res) => {
  if (req.params.qid == undefined || req.params.uid == undefined) {
    return res.status(404).json({ error: "quiz not found" });
  }
  Quiz.find({ _id: req.params.qid }).then(data => {
    if (!data) return res.status(404).json({ error: "quiz not found" });
    let quiz = data[0];
    if (new Date().getTime() <= new Date(quiz.endDate).getTime()) {
      return res.status(400).json({ error: "quiz is not ended" });
      return;
    }
    let questionids = quiz.questions;
    questionids = questionids.map(item => moongose.Types.ObjectId(item));
    Question.find(
      {
        _id: { $in: questionids }
      },
      (err, dta) => {
        if (err) return res.status(400).json({ error: "no questions" });
        User.find({ _id: req.params.uid }).then(userData => {
          if (!userData)
            return res.status(404).json({ error: "user not found" });
          let userQuiz;
          userData[0].quizs.forEach(itm => {
            if (itm.qid === req.params.qid) {
              userQuiz = itm.qdata;
            }
          });
          let dtaf = JSON.parse(JSON.stringify(dta));
          dtaf.forEach(
            im => (im.userAns = userQuiz[im._id] ? userQuiz[im._id].ans : [])
          );
          let quizFull = {
            questionsFull: dtaf,
            ...quiz.toObject()
          };
          return res.status(200).json({ quizFull });
        });
      }
    );
  });
});

router.post("/submit", userAdmin, (req, res) => {
  if (!req.body.userId || !req.body.qid || req.body.anss === null) {
    return res.status(400).json({ error: "bad request" });
  }
  Quiz.find({ _id: req.body.qid }).then(data => {
    if (!data) return res.status(400).json({ error: "bad request" });
    let quiz = data[0];
    let questionids = quiz.questions;
    questionids = questionids.map(item => moongose.Types.ObjectId(item));
    let submitAns = req.body.anss;
    Question.find(
      {
        _id: { $in: questionids }
      },
      (err, dta) => {
        if (err) return res.status(400).json({ error: "no questions" });
        dta.forEach(item => {
          submitAns[item._id].realAns = item.ans;
        });
        User.updateOne(
          { _id: req.body.userId, "quizs.qid": req.body.qid },
          {
            $set: {
              "quizs.$.qdata": submitAns,
              "quizs.$.submitTime": req.body.submitTime
            }
          },
          (err, afft, da) => {
            if (err) return res.status(400).error({ error: "bad request" });
            return res.status(200).json({ ok: "ok" });
          }
        );
      }
    );
  });
});

function validateRandomQuiz(obj, easyQ, mediumQ, hardQ) {
  let errors = {};
  if (isEmpty(obj.easy)) {
    errors.easy = "It must be a number";
  }
  if (isEmpty(obj.medium)) {
    errors.medium = "It must be a number";
  }
  if (isEmpty(obj.hard)) {
    errors.hard = "It must be a number";
  }
  if (!Validator.isNumeric(obj.easy)) {
    errors.easy = "It must be a number";
  }
  if (!Validator.isNumeric(obj.medium)) {
    errors.medium = "It must be a number";
  }
  if (!Validator.isNumeric(obj.hard)) {
    errors.hard = "It must be a number";
  }
  if (Number(obj.easy) > easyQ.length) {
    errors.easy = "Select a number between 0 and " + easyQ.length;
  }
  if (Number(obj.medium) > mediumQ.length) {
    errors.medium = "Select a number between 0 and " + mediumQ.length;
  }
  if (Number(obj.hard) > hardQ.length) {
    errors.hard = "Select a number between 0 and " + hardQ.length;
  }
  return errors;
}

router.post("/random/:id", authAdmin, (req, res) => {
  if (!req.params.id) return res.status(400).json({ error: "bad request" });
  let easyQ, mediumQ, hardQ;
  Question.find({ difficulty: "1" }).then(data => {
    easyQ = data;
    Question.find({ difficulty: "2" }).then(dta => {
      mediumQ = dta;
      Question.find({ difficulty: "3" }).then(da => {
        hardQ = da;
        let errors = validateRandomQuiz(req.body, easyQ, mediumQ, hardQ);
        if (!isEmpty(errors)) {
          return res.status(404).json(errors);
        } else {
          let questionids = [];
          let cnt = 0;
          while (cnt !== Number(req.body.easy)) {
            let r = Math.floor(Math.random() * easyQ.length);
            if (questionids.indexOf(easyQ[r]._id) === -1) {
              questionids.push(easyQ[r]._id);
              cnt++;
            }
          }
          cnt = 0;
          while (cnt !== Number(req.body.medium)) {
            let r = Math.floor(Math.random() * mediumQ.length);
            if (questionids.indexOf(mediumQ[r]._id) === -1) {
              questionids.push(mediumQ[r]._id);
              cnt++;
            }
          }
          cnt = 0;
          while (cnt !== Number(req.body.hard)) {
            let r = Math.floor(Math.random() * hardQ.length);
            if (questionids.indexOf(hardQ[r]._id) === -1) {
              questionids.push(hardQ[r]._id);
              cnt++;
            }
          }
          Quiz.update(
            { _id: req.params.id },
            {
              questions: questionids
            },
            (err, afft, data) => {
              if (err) return res.status(400).json({ error: "bad request" });
              return res.status(200).json({ ok: "ok" });
            }
          );
        }
      });
    });
  });
});

function isSame(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;
  a.sort();
  b.sort();
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
function countCorrect(arr) {
  let cnt = 0;
  for (let item in arr) {
    if (isSame(arr[item].ans, arr[item].realAns)) {
      cnt++;
    }
  }
  return cnt;
}

function countAttemp(arr) {
  let cnt = 0;
  for (let item in arr) {
    if (arr[item].ans.length != 0) {
      cnt++;
    }
  }
  return cnt;
}

function countPer(qdata, total) {
  return ((countCorrect(qdata) * 100) / Number(total)).toFixed(2);
}

router.get("/results/all", authAdmin, (req, res) => {
  User.find().then(users => {
    Quiz.find().then(quizs => {
      // users attempted, total passed, total failed, pertopass, name, avg. percentage

      let results = [];
      quizs.forEach(item => {
        let obj = {};
        obj.name = item.name;
        obj.qid = item._id;
        obj.perToPass = item.perToPass;
        obj.totalQue = item.questions.length;
        obj.totalPer = 0;
        obj.passed = 0;
        obj.failed = 0;
        obj.total = 0;
        results.push(obj);
      });
      users.forEach(item => {
        item.quizs.forEach(itm => {
          for (let i = 0; i < results.length; i++) {
            if (results[i].qid == itm.qid) {
              let per = countPer(itm.qdata, results[i].totalQue);
              results[i].totalPer += Number(per);
              results[i].total++;
              if (per >= results[i].perToPass) {
                results[i].passed++;
              } else {
                results[i].failed++;
              }
            }
          }
        });
      });
      res.status(200).json(results);
    });
  });
});

router.get("/results/:id", authAdmin, (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "bad request" });
  User.find().then(users => {
    Quiz.find({ _id: id }).then(quiz => {
      // users attempted, total passed, total failed, pertopass, name, avg. percentage
      if (!quiz[0]) return res.status(404).json({ error: "can not find quiz" });
      let results = [];
      let totalQue = quiz[0].questions.length;
      let perToPass = quiz[0].perToPass;
      users.forEach(item => {
        item.quizs.forEach(itm => {
          if (id == itm.qid) {
            let obj = {};
            let per = countPer(itm.qdata, totalQue);
            (obj.name = item.name), (obj.correct = countCorrect(itm.qdata));
            obj.per = per;
            obj.total = totalQue;
            obj.attempted = countAttemp(itm.qdata);
            obj.perToPass = perToPass;
            obj._id = item._id;
            obj.result = per >= perToPass ? "Pass" : "Fail";
            results.push(obj);
          }
        });
      });
      res.status(200).json(results);
    });
  });
});

router.get("/admin/states", authAdmin, (req, res) => {
  let users = {},
    quizs = {},
    questions = {};
  quizs.total = 0;
  quizs.archived = 0;
  quizs.ongoing = 0;
  quizs.upcoming = 0;
  questions.total = 0;
  questions.easy = 0;
  questions.medium = 0;
  questions.hard = 0;
  User.collection
    .find()
    .count()
    .then(cnt => {
      users.total = cnt;
      User.collection
        .find({ IsAdmin: true })
        .count()
        .then(cntAdmin => {
          users.admin = cntAdmin;
          users.user = users.total - users.admin;
          Question.collection
            .find({ difficulty: "1" })
            .count()
            .then(cnteasy => {
              questions.easy = cnteasy;
              Question.collection
                .find({ difficulty: "2" })
                .count()
                .then(cntmedium => {
                  questions.medium = cntmedium;
                  Question.collection
                    .find({ difficulty: "3" })
                    .count()
                    .then(cnthard => {
                      questions.hard = cnthard;
                      questions.total =
                        questions.easy + questions.medium + questions.hard;
                      Quiz.find().then(quizsR => {
                        quizsR.forEach(item => {
                          if (
                            new Date().getTime() >
                            new Date(item.endDate).getTime()
                          ) {
                            quizs.archived++;
                          } else if (
                            new Date().getTime() >
                              new Date(item.startDate).getTime() &&
                            new Date().getTime() <
                              new Date(item.endDate).getTime()
                          ) {
                            quizs.ongoing++;
                          } else {
                            quizs.upcoming++;
                          }
                        });
                        quizs.total = quizsR.length;
                        res.status(200).json({ users, quizs, questions });
                      });
                    });
                });
            });
        });
    });
});

module.exports = router;
