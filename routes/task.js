const express = require("express");
const router = express.Router();
const {Tasks,validate} = require("../models/task");
const asyncMiddleware=require("../middleware/async");

router.get('/', asyncMiddleware(async (req, res) => {
  const task=await Tasks.find({});
  res.json(task);
}));

router.get("/:id", asyncMiddleware(async(req, res) => {
  res.json(await Tasks.findById({_id: req.params.id}));
}));

router.post("/", asyncMiddleware(async (req, res) => {
  const {error}=validate(req.body);
  if(error){
      return res.status(404).json(error.details[0].message);
  }
  const task=new Tasks({
      name:req.body.name,
    completed:req.body.completed
  });
    await task.save();
    res.json(task);
}));

router.patch("/:id", asyncMiddleware(async(req, res) => {
    
    const task=await Tasks.findById({_id:req.params.id});
    if(!task){
        return res.status(404).send("Invalid ID");
    }
    const {error}=validate(req.body);
    if(error){
        return res.status(404).send(error.details[0].message);
    }

    task.set({
        name:req.body.name,
        completed:req.body.completed
    })
    

   const result=await task.save();
  res.json(result);
}));

router.delete("/:id", asyncMiddleware(async(req, res) => {
  const result=await Tasks.deleteOne({_id: req.params.id});
  res.json(result)
}));

module.exports = router;
