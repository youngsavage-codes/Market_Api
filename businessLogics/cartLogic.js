const CartService = require("../services/cartService");
const mongoose = require("mongoose");

const cartService = new CartService();

const allCustomerCartLogic = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid customer ID" });
        }

        const customerCart = await cartService.getCart(id);

        res.status(200).json({
            message: "Cart fetched successfully",
            cart: customerCart
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addItemsLogic = async (req, res) => {
    try {
        const { customerId, items } = req.body;

        // Validate customer ID
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ error: "Invalid customer ID" });
        }

        // Validate product IDs in items array
        for (let item of items) {
            if (!mongoose.Types.ObjectId.isValid(item.product)) {
                return res.status(400).json({ error: `Invalid product ID: ${item.product}` });
            }
        }

        // Add each item to the cart
        let updatedCart;
        for (let item of items) {
            updatedCart = await cartService.addItemToCart(customerId, item);
        }

        res.status(200).json({
            message: "Item(s) added to cart successfully",
            cart: updatedCart
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeItemsLogic = async (req, res) => {
    try {
        const { customerId, productId, variant } = req.body;

        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ error: "Invalid customer ID" });
        }

        const updatedCart = await cartService.removeItemFromCart(customerId, productId, variant);

        res.status(200).json({
            message: "Item removed from cart successfully",
            cart: updatedCart
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateItemQuantityLogic = async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body;

        // Validate customerId and productId
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ error: "Invalid customer ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        // Validate quantity
        if (typeof quantity !== 'number' || quantity < 0) {
            return res.status(400).json({ error: "Invalid quantity" });
        }

        // Update item quantity in the cart
        const updatedCart = await cartService.updateItemQuantity(customerId, productId, quantity);

        // Return the updated cart
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Clear Cart Logic
const clearCartLogic = async (req, res) => {
    try {
        const { customerId } = req.body;

        // Validate customer ID
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ error: "Invalid customer ID" });
        }

        const clearedCart = await cartService.clearCart(customerId);

        res.status(200).json({
            message: "Cart cleared successfully",
            cart: clearedCart
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addItemsLogic, removeItemsLogic, allCustomerCartLogic, updateItemQuantityLogic, clearCartLogic }