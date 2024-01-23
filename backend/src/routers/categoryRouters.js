// backend/routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const categoryController = require("../controllers/categoryController");

// Get all categories with optional filtering and pagination
router.get("/", auth, categoryController.getAllCategories);

// Filter categories by status and name with pagination
router.get("/filter/", auth, categoryController.getFilter);

// Get category by ID
router.get("/:id", auth, categoryController.getCategoryById);

// Create a new category
router.post("/", auth, categoryController.createCategory);

// Update an existing category
router.put("/:id", auth, categoryController.updateCategory);

// Delete a category
router.delete("/:id", auth, categoryController.deleteCategory);

module.exports = router;
