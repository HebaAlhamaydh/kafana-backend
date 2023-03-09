"use strict";
require('dotenv').config();

// Connects to our database depending on the URI as an environmental variable
const { Sequelize, DataTypes } = require("sequelize");

const dealsModel  = require('./deals');
const userModel=require('./users');
const Collection =require('./data-collection');
const claimedDealsModel = require('./claimedDeals');


const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl :{require: true,
                    rejectUnauthorized: false},
                native: true
            }
        } : {};


// we are going to use this to connect to Postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const userTable = userModel(sequelize, DataTypes);//use sequelize to creat model
// const userCollection=new Collection(userTable);

const claimedDealsTable = claimedDealsModel(sequelize, DataTypes);
// const claimedDealsCollection=new Collection(claimedDealsTable);

const dealsTable = dealsModel(sequelize, DataTypes);
// const dealsCollection=new Collection(dealsTable);



//relations
userTable.hasMany(claimedDealsTable); // user many claimedDeals
userTable.hasMany(dealsTable);
dealsTable.hasMany(claimedDealsTable);
claimedDealsTable.belongsTo(userTable); // claimedDeals one user
claimedDealsTable.belongsTo(dealsTable); 
// dealsTable.belongsTo(userTable); 


module.exports = {
    sequelize: sequelize,
    DataTypes:DataTypes,

    deals:dealsTable,
    claimedDeals:claimedDealsTable,
    users:userTable
};

