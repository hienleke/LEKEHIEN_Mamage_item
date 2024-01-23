const Category = require("../models/category");
const Item = require("../models/item");

const associated = () => {
     Category.hasMany(Item, {
          as: "items",
          foreignKey: "id",
     });

     Item.belongsTo(Category);
};
module.exports = associated;
