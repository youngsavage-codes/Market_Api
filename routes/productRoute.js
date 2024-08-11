const express = require("express");
const route = express.Router();
const ProductController = require("../controller/productController");

const productController = new ProductController();

route.post("/product/create", productController.createProduct);
route.get("/product/", productController.getAllProduct);
route.get("/product/:id", productController.getSingleProduct);
route.put("/product/:id", productController.updateProductDetails);
route.delete("/product/:id", productController.deleteProduct);

module.exports = route;