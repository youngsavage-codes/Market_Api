const {createProductLogic, getAllProducts, getSingleProduct, updateProductDetails, deleteProduct} = require("../businessLogics/productLogic");
const asyncHandler = require("express-async-handler");

class ProductController {
    createProduct = asyncHandler(async (req, res) => {
        await createProductLogic(req, res);
    })
    getAllProduct = asyncHandler(async (req, res) => {
        await getAllProducts(req, res)
    })
    getAllProduct = asyncHandler(async (req, res) => {
        await getAllProducts(req, res)
    })
    getSingleProduct = asyncHandler(async (req, res) => {
        await getSingleProduct(req, res);
    })
    updateProductDetails = asyncHandler(async (req, res) => {
        await updateProductDetails(req, res)
    })
    deleteProduct = asyncHandler(async (req, res) => {
        await deleteProduct(req, res);
    })
}

module.exports = ProductController;