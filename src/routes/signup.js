'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const signUpRouter = express.Router();

const { users } = require('../models/index');

signUpRouter.post('/signup',async(req,res)=>{
  try {
    const { role,email, username, password, phone,gender,date_Of_Birth,photo_url } =req.body
    const passwordhash = await bcrypt.hash(password, 10);
      const record = await users.create({ username: username, password: passwordhash, role: role, email: email,gender: gender, date_Of_Birth: date_Of_Birth
        , phone: phone,photo_url:photo_url});
      res.status(201).json(record);
    } catch (e) { res.status(500).send('Error Creating User'); }

})

module.exports=signUpRouter;