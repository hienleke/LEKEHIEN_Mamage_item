// backend/controllers/itemController.js
const { Op } = require("sequelize");
const Category = require("../models/category");
const Item = require("../models/item");
const { buildWhereItemClause } = require("../utils/filterClause");
const config = require("../utils/config");

const itemController = {
     getAllItems: async (req, res) => {
          try {
               const page = req.query.page || 1;
               let pageSize = config.get("filter.pageSize") || 10;
               const items = await Item.findAndCountAll({
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                    include: [
                         {
                              model: Category,
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
                         },
                    ],
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
          const { name, description, price, CategoryId } = req.body;
          try {
               const newItem = await Item.create({ name, description, price, CategoryId });
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

               item.status = "inactive";
               await item.save();

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
               const page = req.query.page || 1;
               pageSize = config.get("filter.pageSize") || 10;
               const whereClause = buildWhereItemClause(req.query);
               const items = await Item.findAndCountAll({
                    where: whereClause,
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                    include: [
                         {
                              model: Category,
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
               res.status(500).json({ error: "Internal server error", message: error.message });
          }
     },
};

module.exports = itemController;
