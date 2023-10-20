const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
        },
        number:{
            type: DataTypes.STRING,
        },
    });
  
    return Phone;
};