const express = require("express");
const router = express.Router();
const authAdmin = require("./authAdmin");
const Question = require("../../models/Question");
const questionValidator = require("../../validation/question");

router.post("/",authAdmin,(req,res)=>{
    const {errors, isValid} = questionValidator(req.body);
    if(!isValid){
        res.status(400).json(errors);
    }
    else{
        const newQuetion = new Question({
            type: req.body.type,
            category: req.body.category,
            question: req.body.question,
            o1: req.body.o1,
            o2: req.body.o2,
            o3: req.body.o3,
            o4: req.body.o4,
            ans: req.body.ans,
        });
        newQuetion
        .save()
        .then(question => res.status(200).json({question:question}))
        .catch(err => console.log(err));
    }
});

module.exports = router;
