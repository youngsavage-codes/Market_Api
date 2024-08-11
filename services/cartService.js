const Cart = require("../model/cartModel.js");

class CartService {
    // Create a new cart for a customer
    async createCart(customerId) {
        const cart = new Cart({ customerId });
        await cart.save();
        return cart;
    }

    // Get cart by customer ID
    async getCart(customerId) {
        const cart = await Cart.findOne({ customerId }).populate('items.product');
        if (!cart) {
            return this.createCart(customerId);
        }
        return cart;
    }

    // Add an item to the cart
    async addItemToCart(customerId, itemData) {
        let cart = await Cart.findOne({ customerId });

        if (!cart) {
            cart = await this.createCart(customerId);
        }

        const existingItemIndex = cart.items.findIndex(item =>
            item.product.toString() === itemData.product.toString()
        );

        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += itemData.quantity;
        } else {
            cart.items.push(itemData);
        }

        await cart.save();
        return cart;
    }

    // Remove an item from the cart
    async removeItemFromCart(customerId, productId) {
        let cart = await Cart.findOne({ customerId });

        if (!cart) {
            cart = await this.createCart(customerId);
        }

        cart.items = cart.items.filter(item => !(item.product.toString() === productId.toString()));


        await cart.save();
        return cart;
    }

    // Update the quantity of a specific item in the cart
    async updateItemQuantity(customerId, productId,  quantity) {
        let cart = await Cart.findOne({ customerId });

        if (!cart) {
            throw new Error("Cart not found");
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());

        if (itemIndex >= 0) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1); // Remove the item if quantity is 0 or less
            } else {
                cart.items[itemIndex].quantity = quantity; // Update the quantity
            }
        } else {
            throw new Error("Item not found in cart");
        }

        this.calculateCartTotals(cart);

        await cart.save();
        return cart;
    }

    // Clear the cart
    async clearCart(customerId) {
        let cart = await Cart.findOne({ customerId });

        if (!cart) {
            throw new Error("Cart not found");
        }

        cart.items = [];

        await cart.save();
        return cart;
    }
}

module.exports = CartService;
