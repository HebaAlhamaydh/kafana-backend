const dealsModel = (sequelize, DataTypes) => sequelize.define('deals', {
  server_dateTime: {
    type: DataTypes.DATE,
  },
  datetime_utc: {
    type: DataTypes.DATE,
  },
  update_dateTime_utc: {
    type: DataTypes.DATE,
  },
  last_login_dateTime_utc:{
    type: DataTypes.DATE,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('Active', 'In Active', 'Deleted', 'Expired'),
  },
  amount: {
    type: DataTypes.FLOAT,
  },
  currency: {
    type: DataTypes.STRING,
  },
  // userID: {
  //   type: DataTypes.INTEGER,
  // },
});
  
    module.exports = dealsModel;