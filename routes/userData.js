const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
// require("dotenv").config();
const userdata = require("../models/userDataModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const displayAllorders = await userdata.find({user : req.user._id}).populate('user');
    res.status(200).json({orders : displayAllorders});
  } catch (err) {
    res.json({ message: "error" });
  }
});

router.post("/", async(req, res) => {
  try {
    const newOrder = await userdata.create({...req.body,user:req.user._id});
    res.status(200).json({message: "Success"});
  } catch (err) {
    res.status(400).json({message : err.message})
  }
});

router.patch("/:id", async(req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const updatedata = await userdata.updateOne({_id:id},{status:"Order Cancelled"});
    console.log(updatedata);
    res.status(200).json({message: "Success"});
  } catch (err) {
    res.status(400).json({message : err.message})
  }
});

router.get("/username",async(req,res)=>{
  try {
    res.json({name:req.user.name})
  } catch (err) {
    res.json({message:err.message})
  }
})

module.exports = router;
