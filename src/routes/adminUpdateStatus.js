
"use strict";

const express = require("express");
const adminStatusRouter = express.Router();
const { users } = require("../models/index");
const bearer = require("../middlewares/bearerAuth");


//Admin update user status 
adminStatusRouter.put("/updateStatus/:id", bearer, handleUpdateStatus);
async function handleUpdateStatus(req, res) {
    const {id} = req.params;
    const {status} =req.body;
    
        if (req.user.role === "admin") {
        const findUser = await users.findOne({where:{id:id}})
        const updateStatus = await  findUser.update({status:status})
        res.status(201).send('Update successfully')
    }
    else {
        res.status(404).send("you are not allowed to update ");
    }
          
    
        
      }
      module.exports = adminStatusRouter;