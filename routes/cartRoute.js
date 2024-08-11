const express = require("express");
const router = express.Router();
const CartController = require("../controller/cartController");

const cartController = new CartController();

// Get a customer's cart
router.get("/cart/:id", cartController.customerCart);

// Add items to a customer's cart
router.post("/cart/add/", cartController.addItem);

// Remove an item from a customer's cart
router.post("/cart/remove/", cartController.removeItem);

// Update item quantity in a customer's cart
router.post("/cart/update-quantity", cartController.updateQuantity);

// Clear a customer's cart
router.post("/cart/clear", cartController.clearCart);

module.exports = router;