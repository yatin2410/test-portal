const express = require("express");
const router = express.Router();
const authAdmin = require("./authAdmin");
const Group = require("../../models/Group");
const User = require("../../models/User");

router.get("/",(req,res)=>{
    Group.find().then(data => {
        res.status(200).json(data);
    });
});

router.post("/",authAdmin,(req,res)=>{
    if(req.body.group === undefined){
        return res.status(400).send({group:"Group name is required."});
    }
    Group.findOne({group : req.body.group}).then((grp)=>{
        if(grp || req.body.group==='Admin') {
            return res.status(400).json({group:"Group name is already in list"});
        }
        else{
            const group = new Group({
                group : req.body.group
            });
            group.save().then(data => res.status(200).json(data)).catch(err=>console.log(err));
        }
    });
});

router.delete("/", authAdmin, (req, res) => {
    User.deleteMany({group: req.body.group},err => {
        if(err) return res.status(400).json({error: "no users in this group"});
        Group.deleteOne({ group: req.body.group }, err => {
            if (err) return res.status(400).json({ error: "group does not exist" });
            return res.status(200).json({ ok: "ok" });
          });      
    })
});
  

module.exports = router;
