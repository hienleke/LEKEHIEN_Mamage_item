const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");

const itemController = require("../controllers/itemController");

// Get all items with optional filtering and pagination
router.get("/", auth, itemController.getAllItems);

// Filter items by price and category with pagination
router.get("/filter", auth, itemController.getFilter);
// Get item by ID
router.get("/:id", auth, itemController.getItemById);

// Create a new item
router.post("/", auth, itemController.createItem);

// Update an existing item
router.put("/:id", auth, itemController.updateItem);

// Delete an item
router.delete("/:id", auth, itemController.deleteItem);

module.exports = router;
