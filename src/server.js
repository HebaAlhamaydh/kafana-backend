'use strict';
require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT || 5050;
const express = require("express");
const app = express();
app.use(cors("*"));
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");

const signup=require("./routes/signup")
const signin=require("./routes/signin")
const gitCreateUsers=require("./routes/adminGetCreateUsers")
const claimedDeals=require('./routes/adminClaimedDeals')
const deals=require('./routes/userDeals')
const statusDeals=require('./routes/adminDeals')
const userClaimedDeals=require('./routes/userClaimedDeals')

// const v1Routes=require("./routes/v1");
// const v2Router=require("./routes/model");


app.get("/", (req, res) => {
    res.send("Welcome To Homepage");
  });
  
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
///router
app.use(signup);
app.use(signin);
app.use(gitCreateUsers)
app.use(deals)
app.use(claimedDeals)
app.use(statusDeals)
app.use(userClaimedDeals)
// app.use('/v2',v2Router);
// app.use('/v1',v1Routes);

app.use("*", notFoundHandler);
app.use(errorHandler); 

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};