
"use strict";

const express = require("express");
const profileUserRouter = express.Router();
const { users } = require("../models/index");
const bearer = require("../middlewares/bearerAuth");

profileUserRouter.get("/profile/user", bearer, handleProfileUser);

async function handleProfileUser(req, res) {
    let tokenId = req.user.id;
    let role = req.user.role;
  
    try {
        const found = await users.findOne({ where: { id: tokenId } });

        if ((found ) || (role == "admin" && found)) {
     
        res.status(200).json(found);
      } else {
        res.status(404).send("Access denied");
      }
      } catch (e) {
        console.error(e);
        next(e);
      }
  }
  
module.exports=profileUserRouter;