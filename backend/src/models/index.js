const Category = require("../models/category");
const Item = require("../models/item");

const associated = () => {
     Category.hasMany(Item, {
          as: "items",
     });

     Item.belongsTo(Category, {
          foreignKey: "categoryId",
          as: "category",
     });
};
module.exports = associated;
