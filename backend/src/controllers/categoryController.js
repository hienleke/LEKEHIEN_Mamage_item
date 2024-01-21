// backend/controllers/categoryController.js
const { Op } = require("sequelize");
const Category = require("../models/category");
const logger = require("../utils/logger");
const buildWhereCategoryClause = require("../utils/filterClause");

const categoryController = {
     getAllCategories: async (req, res) => {
          try {
               const { status, name, page = 1, pageSize = 10 } = req.query;

               const whereClause = {};

               if (status) {
                    whereClause.status = status;
               }

               if (name) {
                    whereClause.name = {
                         [Op.iLike]: `%${name}%`, // Case-insensitive search
                    };
               }

               const categories = await Category.findAndCountAll({
                    where: whereClause,
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
               });

               res.status(200).json({
                    categories: categories.rows,
                    totalItems: categories.count,
                    totalPages: Math.ceil(categories.count / pageSize),
                    currentPage: +page,
               });
          } catch (error) {
               console.error("Error fetching categories:", error);
               res.status(500).json({ error: "Internal server error" });
          }
     },

     getCategoryById: async (req, res) => {
          const categoryId = req.params.id;
          try {
               const category = await Category.findByPk(categoryId);
               if (!category) {
                    return res.status(404).json({ error: "Category not found" });
               }
               res.status(200).json(category);
          } catch (error) {
               console.error("Error fetching category by ID:", error);
               res.status(500).json({ error: "Internal server error" });
          }
     },

     createCategory: async (req, res) => {
          const { name, description } = req.body;
          try {
               const newCategory = await Category.create({ name, description });
               res.status(201).json(newCategory);
          } catch (error) {
               console.error("Error creating category:", error);
               res.status(500).json({ error: "Internal server error" });
          }
     },

     updateCategory: async (req, res) => {
          const categoryId = req.params.id;
          const { name, description } = req.body;
          try {
               const category = await Category.findByPk(categoryId);
               if (!category) {
                    return res.status(404).json({ error: "Category not found" });
               }
               await category.update({ name, description });
               res.status(200).json(category);
          } catch (error) {
               console.error("Error updating category:", error);
               res.status(500).json({ error: "Internal server error" });
          }
     },
     deleteCategory: async (req, res) => {
          const categoryId = req.params.id;

          try {
               const category = await Category.findByPk(categoryId);

               if (!category) {
                    return res.status(404).json({ error: "Category not found" });
               }

               // Update the status to "inactive" instead of destroying the category
               category.status = "inactive";
               await category.save();

               // Return the updated category
               res.status(200).json({
                    status: "success",
                    deletedCategory: category,
               });
          } catch (error) {
               console.error("Error marking category as inactive:", error);
               logger.error("Category not found:", categoryId);
               res.status(500).json({ error: "Internal server error" });
          }
     },

     // Filter categories by status and name with pagination
     getFilter: async (req, res) => {
          try {
               const { status, name, page = 1, pageSize = 10 } = req.query;

               const whereClause = {};

               if (status) {
                    whereClause.status = status;
               }

               if (name) {
                    whereClause.name = {
                         [Op.iLike]: `%${name}%`, // Case-insensitive search
                    };
               }

               const categories = await Category.findAndCountAll({
                    where: whereClause,
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
               });

               res.status(200).json({
                    categories: categories.rows,
                    totalItems: categories.count,
                    totalPages: Math.ceil(categories.count / pageSize),
                    currentPage: +page,
               });
          } catch (error) {
               console.error("Error fetching filtered categories:", error);
               res.status(500).json({ error: "Internal server error" });
          }
     },
};

module.exports = categoryController;
