const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/connectDB");

const Category = sequelize.define(
     "Category",
     {
          name: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          description: {
               type: DataTypes.TEXT,
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

module.exports = Category;
