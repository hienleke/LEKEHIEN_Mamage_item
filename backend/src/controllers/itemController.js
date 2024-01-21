// backend/controllers/itemController.js
const { Op } = require("sequelize");
const Category = require("../models/category");
const Item = require("../models/item");

const itemController = {
     getAllItems: async (req, res) => {
          try {
               const { price, categoryId, page = 1, pageSize = 10 } = req.query;

               const whereClause = {};
               if (price) {
                    whereClause.price = {
                         [Op.lte]: price,
                    };
               }

               if (categoryId) {
                    whereClause.categoryId = categoryId;
               }

               const items = await Item.findAndCountAll({
                    where: whereClause,
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                    include: [
                         {
                              model: Category,
                              as: "category", // Specify the alias
                         },
                    ], // Include associated Category in the result
               });

               res.status(200).json({
                    items: items.rows,
                    totalItems: items.count,
                    totalPages: Math.ceil(items.count / pageSize),
                    currentPage: +page,
               });
          } catch (error) {
               console.error("Error fetching items:", error);
               res.status(500).json({ error: "Internal server error" });
          }
     },

     getItemById: async (req, res) => {
          const itemId = req.params.id;
          try {
               const item = await Item.findByPk(itemId, {
                    include: [
                         {
                              model: Category,
                              as: "category", // Specify the alias
                         },
                    ], // Include associated Category in the result
               });
               if (!item) {
                    return res.status(404).json({ error: "Item not found" });
               }
               res.status(200).json(item);
          } catch (error) {
               console.error("Error fetching item by ID:", error);
               res.status(500).json({ error: "Internal server error" });
          }
     },

     createItem: async (req, res) => {
          const { name, description, price, categoryId } = req.body;
          try {
               const newItem = await Item.create({ name, description, price, categoryId });
               res.status(201).json(newItem);
          } catch (error) {
               console.error("Error creating item:", error);
               res.status(500).json({ error: "Internal server error" });
          }
     },

     updateItem: async (req, res) => {
          const itemId = req.params.id;
          const { name, description, price, categoryId } = req.body;
          try {
               const item = await Item.findByPk(itemId);
               if (!item) {
                    return res.status(404).json({ error: "Item not found" });
               }
               await item.update({ name, description, price, categoryId });
               res.status(200).json(item);
          } catch (error) {
               console.error("Error updating item:", error);
               res.status(500).json({ error: "Internal server error" });
          }
     },

     deleteItem: async (req, res) => {
          const itemId = req.params.id;

          try {
               const item = await Item.findByPk(itemId);

               if (!item) {
                    return res.status(404).json({ error: "Item not found" });
               }

               // Update the status to "inactive" instead of destroying the item
               item.status = "inactive";
               await item.save();

               // Return the updated item
               res.status(200).json({
                    status: "success",
                    deletedItem: item,
               });
          } catch (error) {
               console.error("Error marking item as inactive:", error);
               res.status(500).json({ error: "Internal server error" });
          }
     },

     // Filter items by price and category with pagination
     getFilter: async (req, res) => {
          try {
               const { price, categoryId, page = 1, pageSize = 10 } = req.query;

               const whereClause = {};

               if (price) {
                    whereClause.price = {
                         [Op.lte]: price,
                    };
               }

               if (categoryId) {
                    whereClause.categoryId = categoryId;
               }

               const items = await Item.findAndCountAll({
                    where: whereClause,
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                    include: [
                         {
                              model: Category,
                              as: "category", // Specify the alias
                         },
                    ],
               });

               res.status(200).json({
                    items: items.rows,
                    totalItems: items.count,
                    totalPages: Math.ceil(items.count / pageSize),
                    currentPage: +page,
               });
          } catch (error) {
               console.error("Error fetching filtered items:", error);
               res.status(500).json({ error: "Internal server error" });
          }
     },
};

module.exports = itemController;
