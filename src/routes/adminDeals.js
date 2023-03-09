"use strict";

const express = require("express");
const StatusRouter = express.Router();
const { deals } = require("../models/index");
const bearer = require("../middlewares/bearerAuth");


StatusRouter.get("/allDealAdmin", bearer, handleGetAlls);
StatusRouter.post("/createDeal", bearer, handleCreate);
StatusRouter.put("/allDealAdmin/:id", bearer, handleUpdateStatus);



//Admin git all deals
async function handleGetAlls(req, res) {
  console.log(req.user.role === "admin");
  if (req.user.role === "admin") {
    let allRecords = await deals.findAll();

    res.status(200).json(allRecords);
  }else{
    res.status(404).send('Access denied')
  }
}
// Admin add new deal
async function handleCreate(req, res) {
  const tokenId = req.user.id;
  const obj = req.body;
  
    if ( req.user.role === "admin" ) {
      
      let newRecord = await deals.create(obj);
      res.status(201).json(newRecord);
    } else {
      res.status(404).send("you are not allowed to post here");
    }
  
}

//Admin update Deal status 
async function handleUpdateStatus(req, res) {
const {id} = req.params;
const {status} =req.body;
    if (req.user.role === "admin") {
      const findDeal = await deals.findOne({where:{id:id}})
        const updateStatus = await  findDeal.update({status:status})
        res.status(201).send('Update successfully')

    }else{
      res.status(404).send('Access denied')
    }
  }


module.exports = StatusRouter;
