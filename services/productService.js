const Product = require("../model/productModel");

class ProductService {
    // Create a new product
    async createProduct(data) {
        const product = new Product(data); // Pass data directly to the constructor
        await product.save();
        return product;
    }

    // Get a single product by ID
    async getSingleProduct(id) {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }

    // Get all products
    async getAllProducts() {
        const products = await Product.find();
        return products;
    }

    // Update a product by ID
    async updateProduct(id, updateData) {
        const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }

    // Delete a product by ID
    async deleteProduct(id) {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }
}

module.exports = ProductService;
