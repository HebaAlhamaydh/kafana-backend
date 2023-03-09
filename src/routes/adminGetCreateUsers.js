'use strict';
const express = require('express');
const usersRouter=express.Router();
const {users}=require('../models/index');
const Collection=require("../models/data-collection");
const bearer = require('../middlewares/bearerAuth');
const acl=require("../middlewares/acl");

const allUsers=new Collection(users);

usersRouter.get("/admin/users", bearer, handleGetAlls);
usersRouter.post("/admin/addUser", bearer, handleAddUser);//not work
usersRouter.delete("/admin/deletUser", bearer, handleDelete);

///////Admin get all users///////
async function handleGetAlls(req, res) {
  try {
    if(req.user.role === 'admin') {
      const userRecords = await allUsers.read();
      const list = userRecords.map(user => user.username);
      res.status(200).json(list);
    } else {
      res.status(404).send("Access denied");
    }
    } catch (e) {
      console.error(e);
      next(e);
    }
}

//////Admin delete one or more users///

async function handleDelete(req, res) {
  const tokenId = req.user.id;
  const role = req.user.role;
  const userIds = req.body.userIds;
  try {
    
    if ( role === "admin") {
      const deletes = await users.destroy({ where: { id: userIds }});
      res.status(204).send("Deleted successfully");
    } else {
      res.status(404).send("Access denied");
    }
  } catch (err) {
    res.status(404).send(err);
  }
}
////////////////////Admin Add new user//////
async function handleAddUser(req, res) {
  try {
 
    if(req.user.role === 'admin') {
      const obj =req.body
    const record = await users.create(obj);
      res.status(201).json(record);
    } else {
      res.status(404).send("Access denied");
    }
    } catch (e) { console.log(e);res.status(500).send('Error Creating User'); }
}


module.exports=usersRouter;