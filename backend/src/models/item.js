const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/connectDB");

const Item = sequelize.define(
     "Item",
     {
          name: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          description: {
               type: DataTypes.TEXT,
          },
          price: {
               type: DataTypes.DECIMAL(10, 2),
               allowNull: false,
          },
          status: {
               type: DataTypes.ENUM("active", "inactive"),
               defaultValue: "active",
          },
     },
     {
          timestamps: true,
          updatedAt: "updated_at",
          createdAt: "created_at",
     }
);

module.exports = Item;
