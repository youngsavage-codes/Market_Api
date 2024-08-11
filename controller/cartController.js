const { addItemsLogic, removeItemsLogic, allCustomerCartLogic, updateItemQuantityLogic, clearCartLogic } = require("../businessLogics/cartLogic");
const asyncHandler = require("express-async-handler");

class CartController {

    customerCart = asyncHandler(async (req, res) => {
        await allCustomerCartLogic(req, res);
    })

    addItem = asyncHandler(async (req, res) => {
        await addItemsLogic(req, res);
    })

    removeItem = asyncHandler(async (req, res) => {
        await removeItemsLogic(req, res);
    })

    updateQuantity = asyncHandler(async (req, res) => {
        await updateItemQuantityLogic(req, res);
    })

    clearCart = asyncHandler(async (req, res) => {
        await clearCartLogic(req, res)
    })
}

module.exports = CartController;
