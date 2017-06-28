"use strict";
module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    CompanyName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Company name must be unique.'
      },
    },
    InitialName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Company name must be unique.'
      },
    },url: {
      type: DataTypes.STRING,
      allowNull: true
      },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },{
      classMethods: {
          associate: function (models) {

              Company.hasMany(models.Customer);
              Company.hasMany(models.Design);
              Company.hasMany(models.Material);
              Company.hasMany(models.Measurement);
              Company.hasMany(models.Order);
              Company.hasMany(models.OrderStatus);
              Company.hasMany(models.Style);
              Company.hasMany(models.User);


          }
      }
  });

  return Company;
};
