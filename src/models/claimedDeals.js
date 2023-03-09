const claimedDealsModel = (sequelize, DataTypes) => sequelize.define('claimedDeals', {
 
  user_id: {
    type: DataTypes.INTEGER,
  },
  deal_id: {
    type: DataTypes.INTEGER,
  },
  server_datetime: {
    type: DataTypes.DATE,
  },
  datetime_utc: {
    type: DataTypes.DATE,
  },
  amount: {
    type: DataTypes.FLOAT,
  },
  currency: {
    type: DataTypes.STRING,
  },
});
  
    
  
    module.exports = claimedDealsModel;

    