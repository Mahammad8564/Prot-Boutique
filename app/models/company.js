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
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  return Company;
};
