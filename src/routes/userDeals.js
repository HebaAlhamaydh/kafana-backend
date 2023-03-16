"use strict";

// **service table to get and post and update and delete services**

const express = require("express");
const router = express.Router();
const  {deals} = require("../models/index");
const bearer = require("../middlewares/bearerAuth");


router.get("/deal",  handleGetAll);
// router.get("/deal/:id", bearer, handleGetOne);
// router.put("/deal/:id", bearer, handleUpdate);
// router.delete("/deal/:id", bearer, handleDelete);


// Get All Records for user
async function handleGetAll(req, res) {
 
  let allRecords = await deals.findAll({
    where: [
      { status: "Active" },
    ],
  });

  res.status(200).json(allRecords);
}



// Get one Records
// async function handleGetOne(req, res) {
//   const id = req.params.id;

//   let readOne = await deals.findOne({
//     where: [{ id: id }, { status: "Active" }],
//   });
//   console.log("time is", readOne);

//   if (!readOne) res.status(404).send("Error");
 
// }



// // Update records
// // user can update on his deal or... but not allow edit on deal users.

// async function handleUpdate(req, res) {
//   const tokenId = req.user.id;
//   const role = req.user.role;
//   const newUpdate = req.body;

//   let ID = req.params.id;
//   const found = await deals.findOne({ where: { id: ID } });

//   if (tokenId === found.userID ) {
//     let updatesStatus = await found.update({status:null});
//     let updatesDeal = await found.update(newUpdate);
//     res.status(201).json(updatesDeal);
//   } else {
//     res.status(404).send("can't find the user !");
//   }
// }

// // Delete records
// async function handleDelete(req, res) {
//   // const tokenId = req.user.id;
//   const role = req.user.role;
//   const ID = req.params.id;
//   try {
//     const foundUser = await deals.findOne({ where: { id: ID } });

//     if ( role === "admin") {
//       const deletes = await foundUser.destroy(foundUser.id);
//       res.status(204).send("Deleted successfully");
//     } else {
//       res.status(404).send("Access denied");
//     }
//   } catch (err) {
//     res.status(404).send(err);
//   }
// }

module.exports = router;
