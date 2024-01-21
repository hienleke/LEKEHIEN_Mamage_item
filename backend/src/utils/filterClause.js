// itemFilter.js
const { Op } = require("sequelize");

const buildWhereItemClause = (queryParams) => {
     const { key, value } = queryParams;

     const validKeys = ["name", "status", "price", "created_at", "updated_at", "category_name", "category"];
     if (!validKeys.includes(key)) {
          throw new Error("Invalid 'key' parameter.");
     }

     const whereClause = {};
     if (key === "price") {
          whereClause[key] = {
               [Op.lte]: value,
          };
     } else if (key === "category") {
          whereClause["$Category.id$"] = value;
     } else {
          whereClause[key] = value;
     }

     return whereClause;
};

const buildWhereCategoryClause = (queryParams) => {
     const { key, value } = queryParams;

     const validKeys = ["name", "status", "price", "created_at", "updated_at", "category_name", "category"];
     if (!validKeys.includes(key)) {
          throw new Error("Invalid 'key' parameter.");
     }

     const whereClause = {};
     if (key === "price") {
          whereClause[key] = {
               [Op.lte]: value,
          };
     } else if (key === "category") {
          whereClause["$Category.id$"] = value;
     } else {
          whereClause[key] = value;
     }

     return whereClause;
};

module.exports = { buildWhereItemClause, buildWhereCategoryClause };
