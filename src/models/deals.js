const dealsModel = (sequelize, DataTypes) => sequelize.define('deals', {
  server_datetime: {
    type: DataTypes.DATE,
  },
  datetime_utc: {
    type: DataTypes.DATE,
  },
  update_datetime_utc: {
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
  userID: {
    type: DataTypes.INTEGER,
  },
});
  
    module.exports = dealsModel;