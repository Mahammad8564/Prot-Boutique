"use strict";
module.exports = function (sequelize, DataTypes) {
    var Material = sequelize.define("Material", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Material type must be unique.'
            },
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
            classMethods: {
                associate: function (models) {
                  Material.belongsTo(models.Company, {
                      foreignKey: {
                          allowNull: false
                      }
                  });
                  Material.belongsTo(models.Company, {
                    onDelete: "CASCADE",
                    foreignKey: {
                      allowNull: false
                    }
                    // as: 'createdBy'
                  });
                }
            }
        }
     //,{
     //   indexes: [
     //       // Create a unique index title
     //       {
     //           unique: true,
     //           fields: ['title']
     // }]}
    );

    return Material;
};
