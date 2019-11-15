const express = require("express");
const router = express.Router();
const authAdmin = require("./authAdmin");
const Question = require("../../models/Question");
const questionValidator = require("../../validation/question");

router.post("/", authAdmin, (req, res) => {
  const { errors, isValid } = questionValidator(req.body);
  if (!isValid) {
    res.status(400).json(errors);
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
    res.status(400).json(errors);
  } else {
    Question.find({ _id: req.body._id }).then(data => {
      if (!data) res.status(404).json({ ans: "_id is not found" });
      Question.update(
        { _id: req.body._id },
        { ...req.body },
        (err, afft, data) => {
          if (err) res.status(400).json({ error: "unexpected error" });
          else res.status(200).json({ ok: "ok" });
        }
      );
    });
  }
});

router.get("/", authAdmin, (req, res) => {
  Question.find().then(data => {
    res.status(200).json(data);
  });
});

router.get("/:id", authAdmin, (req, res) => {
  const _id = req.params.id;
  Question.find({ _id: _id }).then(data => {
    res.status(200).json(data);
  });
});

router.delete("/", authAdmin, (req, res) => {
  console.log("in delete");
  Question.deleteOne({ _id: req.body._id }, err => {
    if (err) res.status(400).json({ error: "_id does not exist" });
    res.status(200).json({ ok: "ok" });
  });
});

module.exports = router;
