const ProductService = require("../services/productService");
const mongoose = require("mongoose");

const productService = new ProductService();

// CREATE PRODUCT
const createProductLogic = async (req, res) => {
    try {
        const { name, description, category, brand, price, stock, images, ratings, variants, tags } = req.body;

        // Check for required fields
        if (!name || !category || !price || !images || !brand || !stock || !variants) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Create product data object
        const productData = { name, description, category, brand, price, stock, images, ratings, variants, tags };

        // Create the new product
        const newProduct = await productService.createProduct(productData);

        // Return success response with the created product
        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });

    } catch (err) {
        // Return error response
        res.status(500).json({ error: err.message });
    }
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
    try{
       const products = await productService.getAllProducts();
       res.status(201).json({
        message: "Products fetched successfully",
        product: products
       })
    } catch (err) 
    {
        // Return error response
        res.status(500).json({ error: err.message });
    }
}

const getSingleProduct = async (req, res) => {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({ error: "Invalid product ID provided" })
        }

        const product = await productService.getSingleProduct(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(201).json({message: "Product fetched successfully", product: product})
    } catch(err) 
    {
        // Return error response
        res.status(500).json({ error: err.message });
    }
}

const updateProductDetails = async (req, res) => {
    try {  
        const { name, description, category, brand, price, stock, images, ratings, variants, tags } = req.body;
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({ error: "Invalid product ID provided" })
        }

        // Create product data object
        const productData = { name, description, category, brand, price, stock, images, ratings, variants, tags };

        const updatedProduct = await productService.updateProduct(id, productData);

        res.status(201).json({message: "Product fetched successfully", product: updatedProduct})
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteProduct =async (req, res) => {
    try {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({ error: "Invalid product ID provided" })
        }

        const deletedProduct = await productService.deleteProduct(id);
        res.status(201).json({message: "Product fetched successfully", product: deletedProduct})
    }   
    catch (err)
    {
         // Return error response
         res.status(500).json({ error: err.message });
    }
}

module.exports = { createProductLogic, getAllProducts, getSingleProduct, updateProductDetails, deleteProduct };
