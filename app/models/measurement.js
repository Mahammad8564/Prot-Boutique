"use strict";
module.exports = function (sequelize, DataTypes) {
    var Measurement = sequelize.define("Measurement", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Measurement must be unique.'
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
                    Measurement.hasMany(models.DesignMeasurement);

                    Measurement.belongsTo(models.Company, {

                        foreignKey: {
                            allowNull: false
                        }
                    });

                    Measurement.belongsTo(models.Company, {
                      onDelete: "CASCADE",
                      foreignKey: {
                        allowNull: false
                      }
                      // as: 'createdBy'
                    });
                }
            }
        }


    );

    return Measurement;
};
