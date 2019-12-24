const express = require("express");
const router = express.Router();
const authAdmin = require("./authAdmin");
const Question = require("../../models/Question");
const questionValidator = require("../../validation/question");

router.post("/", authAdmin, (req, res) => {
  const { errors, isValid } = questionValidator(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const newQuetion = new Question({
      type: req.body.type,
      category: req.body.category,
      question: req.body.question,
      o1: req.body.o1,
      o2: req.body.o2,
      o3: req.body.o3,
      o4: req.body.o4,
      ans: req.body.ans,
      difficulty: req.body.difficulty
    });
    newQuetion
      .save()
      .then(question => res.status(200).json({ question: question }))
      .catch(err => console.log(err));
  }
});

router.put("/", authAdmin, (req, res) => {
  const { errors, isValid } = questionValidator(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    Question.find({ _id: req.body._id }).then(data => {
      if (!data) return res.status(404).json({ ans: "_id is not found" });
      Question.update(
        { _id: req.body._id },
        { ...req.body },
        (err, afft, data) => {
          if (err) return res.status(400).json({ error: "unexpected error" });
          else return res.status(200).json({ ok: "ok" });
        }
      );
    });
  }
});

router.get("/", authAdmin, (req, res) => {
  let pageOptions = {
    page: req.query.page || 0,
    limit: 50
  };
  let search = req.query.search;
  search = String(search).toUpperCase();
  obj = { question: new RegExp(search, "i") };
  if (search === "TECHNICAL" || search === "APTITUDE") {
    obj = { category: search === "TECHNICAL" ? 1 : 2 };
  } else if (search === "MCSA" || search === "MCMA") {
    obj = { type: search === "MCSA" ? 1 : 2 };
  } else if (search === "EASY" || search === "MEDIUM" || search === "HARD") {
    obj = { difficulty: search === "EASY" ? 1 : search === "MEDIUM" ? 2 : 3 };
  }
  Question.find(obj)
    .sort({ $natural: -1 })
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

router.get("/:id", authAdmin, (req, res) => {
  const _id = req.params.id;
  Question.find({ _id: _id }).then(data => {
    res.status(200).json(data);
  });
});

router.delete("/", authAdmin, (req, res) => {
  Question.deleteOne({ _id: req.body._id }, err => {
    if (err) return res.status(400).json({ error: "_id does not exist" });
    res.status(200).json({ ok: "ok" });
  });
});

module.exports = router;
