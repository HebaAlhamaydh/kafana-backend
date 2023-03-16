"use strict";

const { claimedDeals, deals } = require("../models/index");
const express = require("express");
const userclaimedDealsRouter = express.Router();
const bearer = require("../middlewares/bearerAuth");

///user send claim deal request , delete this request and get his claim deal requests
userclaimedDealsRouter.post("/userClaimedDeals", bearer, handleUserClaimedDeals);
userclaimedDealsRouter.get("/userClaimedDeals", bearer, handleUserAllClaimedDeals);
userclaimedDealsRouter.delete("/userdeleteClaimedDeals/:id", bearer, handelDeleteRequest);


////user claimed deals send request
async function handleUserClaimedDeals(req, res) {
  const tokenId = req.user.id;
  const obj = req.body;
  let activeRecords = await deals.findAll({
    where: [
      { status: "Active" },
    ],
  });
 console.log(activeRecords);
  if(activeRecords  ){
    let newRecord = await claimedDeals.create(obj);
    res.status(201).json(newRecord);
  }
  else {
    res.status(404).send("No Active Deals");
  }
    
}
  
// delete request claim deal from user
async function handelDeleteRequest(req, res) {
  const { id } = req.params;
  const tokenId = req.user.id;

  const findUserId = await claimedDeals.findOne({ where: { id: id } });
    const check = await claimedDeals.destroy({ where: { id: id } });
    if (!check) res.status(404).send("Error");
    res.status(204).send("deleted");
 
}

//user  can read his claim deal requests
async function handleUserAllClaimedDeals(req, res) {
  const token = req.user.id;

  const myRequest = await claimedDeals.findAll({
    where: { user_id: token },
  });
  res.status(200).send(myRequest);
}

module.exports = userclaimedDealsRouter;
