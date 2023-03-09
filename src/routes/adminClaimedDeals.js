"use strict";

const { claimedDeals, users } = require("../models/index");
const express = require("express");
const claimedDealsRouter = express.Router();
const bearer = require("../middlewares/bearerAuth");


// // for admin
claimedDealsRouter.get("/admin/allClaimedDeals", bearer, handleAllClaimedDeals);
/////Admin search for claimed deals  by user id
claimedDealsRouter.post("/admin/byUserId", bearer, handleAllClaimedDealsByUserId);




// admin read all claimed deals 

async function handleAllClaimedDeals(req, res) {
  if(req.user.role === 'admin') {

    const findAllClaimedDeals= await claimedDeals.findAll();
    res.status(201).send(findAllClaimedDeals);
  }else {
    res.status(404).send("Access denied");
  }
}

// for Admin get claimed deals by userid
async function handleAllClaimedDealsByUserId(req, res) {
  try {
    if(req.user.role === 'admin') {
      const userId = req.body.userId;
   
    const users = await claimedDeals.findOne({where: {user_id: userId}});
    res.status(201).json(users);
  }else {
    res.status(404).send("Access denied");
  }

  } catch (err) {
    console.log(err);
  }

}

module.exports = claimedDealsRouter;
