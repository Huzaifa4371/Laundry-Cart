const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const user = require("../models/usermodel");
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Add New User / Registration 
router.post("/Adduser",async(req,res)=>{
    try {
        const {name,phone,district,pincode,email,state,address,password} = req.body;
        const check_userEmail = await user.findOne({email:email});
        const check_userphone = await user.findOne({phone:phone});
        if (check_userEmail || check_userphone){
            return res.json({
                message : "Email or Phone Number Exist Allready"
            })
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUserAdd = {...req.body,password:hashedPassword}
        const newUser = await user.create(newUserAdd);
        res.json({user : newUser});       
    } catch (err) {
        res.json({
            message : "error"
        })
    }
}) 

module.exports = router;