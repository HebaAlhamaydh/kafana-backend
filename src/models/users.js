'use strict';
require("dotenv").config();


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.API_SECRET || "Heba";

const userModel = (sequelize, DataTypes) => {
 const users = sequelize.define("users", {

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    server_DateTime:{
        type: DataTypes.DATE,
    },
    dateTime_UTC:{
        type: DataTypes.DATE,
    },
    Update_DateTime_UTC:{
        type: DataTypes.DATE,
    },
    Last_Login_DateTime_UTC:{
        type: DataTypes.DATE,
    },
    date_Of_Birth: {
        type: DataTypes.DATE,
       
      },
    phone: {
      type: DataTypes.STRING,
     
    },
    gender: {
        type: DataTypes.STRING,

      },
      status: {
        type: DataTypes.ENUM('Active', 'In Active', 'Deleted', 'Expired'),
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'writer', 'editor', 'user'),
        defaultValue: 'user',
    },
    token: {
        type: DataTypes.VIRTUAL,
        // get() {return jwt.sign({ username: this.username }, SECRET);}
           
    },
      email: {
        type: DataTypes.STRING,
      },
      photo_url: { 
        type: DataTypes.STRING } ,
    actions: {
        // {'read', 'create', 'update', 'delete'}
        type: DataTypes.VIRTUAL,
        get() {
            //acl >>> access control list
            const acl = {
                user: ['read'],
                writer: ['read', 'create'],
                editor: ['read', 'create', 'update'],
                admin: ['read', 'create', 'update', 'delete']
            }
            return acl[this.role];
        }
           }
});
    
users.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username: username } })
    const valid = await bcrypt.compare(password, user.password)
    console.log(valid)
    if (valid) {
        let newToken = jwt.sign({ username: user.username }, SECRET,{expiresIn : '15 min'});
           console.log('********', newToken);
        user.token = newToken;
        return user;
    }
    else {
        throw new Error("Invalid user");
    }
}
users.authenticateBearer = async function (token) {
    const parsedToken = jwt.verify(token, SECRET);
    console.log('parsedToken >>>>>>>>>>>>>>>>>>', parsedToken);
    const user = await this.findOne({ where: { username: parsedToken.username } });
    if (user.username) {
        return user;
    } else {
        throw new Error("Invalid Token");
    }
}
return users;
}
module.exports = userModel;
