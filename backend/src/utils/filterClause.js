// itemFilter.js
const { Op } = require("sequelize");
const validKeys_item = ["name", "status", "price", "created_at", "updated_at", "category_name", "category", "page", "sort", "limit"];

const buildWhereItemClause = (queryParams) => {
     let whereClause = {};
     for (let item in queryParams) {
          let KeyandOperator = item.split(".");
          let key = KeyandOperator[0];
          let operator = KeyandOperator[1];
          if (!validKeys_item.includes(KeyandOperator[0])) {
               throw new Error("Invalid 'key' parameter. ", KeyandOperator[0]);
          }
          if (!operatorMapping[`${KeyandOperator[1]}`]) {
               throw new Error("Invalid 'operator' parameter. ", KeyandOperator[1]);
          }

          whereClause[key] = { [operatorMapping[`${operator}`]]: queryParams[item] };
     }

     return whereClause;
};

const operatorMapping = {
     eq: Op.eq,
     ne: Op.ne,
     gt: Op.gt,
     gte: Op.gte,
     lt: Op.lt,
     lte: Op.lte,
     like: Op.like,
     notLike: Op.notLike,
     iLike: Op.iLike,
     notILike: Op.notILike,
     in: Op.in,
     notIn: Op.notIn,
     is: Op.is,
     not: Op.not,
     between: Op.between,
     notBetween: Op.notBetween,
     // Add more operators as needed
};

module.exports = { buildWhereItemClause };
