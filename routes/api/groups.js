const express = require("express");
const router = express.Router();
const auth = require("./auth");
const Group = require("../../models/Group");

router.get("/",(req,res)=>{
    Group.find().then(data => {
        res.send(data);
    });
});

router.post("/",auth,(req,res)=>{
    if(req.body.group === undefined){
        res.status(400).send({group:"Group name is required."});
    }
    console.log(req.body.group);
    Group.findOne({group : req.body.group}).then((grp)=>{
        console.log(grp);
        if(grp) {
            return res.status(400).json({group:"Group name is already in list"});
        }
        else{
            const group = new Group({
                group : req.body.group
            });
            group.save().then(data => res.json(data)).catch(err=>console.log(err));
        }
    });
});

module.exports = router;
