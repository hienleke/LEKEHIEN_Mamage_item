const { Op } = require("sequelize");
const { buildWhereItemClause, buildWhereCategoryClause } = require("../src/utils/filterClause");

describe("buildWhereItemClause", () => {
     it("should build correct where clause for items", () => {
          const queryParams = {
               "name.eq": "ItemName",
               "price.gte": 10,
               "category.eq": 1,
          };

          const result = buildWhereItemClause(queryParams);

          expect(result).toEqual({
               name: { [Op.eq]: "ItemName" },
               price: { [Op.gte]: 10 },
               "$Category.id$": 1,
          });
     });

     it('should handle "like" operator for name', () => {
          const queryParams = {
               "name.like": "Item",
          };

          const result = buildWhereItemClause(queryParams);

          expect(result).toEqual({
               name: { [Op.like]: "Item" },
          });
     });

     it('should handle "notBetween" operator for price', () => {
          const queryParams = {
               "price.notBetween": [10, 20],
          };

          const result = buildWhereItemClause(queryParams);

          expect(result).toEqual({
               price: { [Op.notBetween]: [10, 20] },
          });
     });

     // Add more test cases as needed
});

describe("buildWhereCategoryClause", () => {
     it("should build correct where clause for categories", () => {
          const queryParams = {
               "name.eq": "CategoryName",
               "status.ne": "inactive",
          };

          const result = buildWhereCategoryClause(queryParams);

          expect(result).toEqual({
               name: { [Op.eq]: "CategoryName" },
               status: { [Op.ne]: "inactive" },
          });
     });

     it('should handle "like" operator for name', () => {
          const queryParams = {
               "name.like": "Category",
          };

          const result = buildWhereCategoryClause(queryParams);

          expect(result).toEqual({
               name: { [Op.like]: "Category" },
          });
     });
});
