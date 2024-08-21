const StoreService = require("../services/shopService");
const mongoose = require("mongoose");

const storeService = new StoreService();

const createStoreLogic = async (req, res) => {
    try{
        const {customerId, name, description, contactDetails} = req.body;
        if(!customerId, !name, ! contactDetails)
        {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const store = {customerId, name, description, contactDetails}

        const newStore = await storeService.createStore(store);

        // Return success response with the created product
        res.status(201).json({
            message: "Product created successfully",
            product: newStore
        });
        
    } 
    catch(err)
    {
        // Return error response
        res.status(500).json({ error: err.message });
    }
}

const fetchStoresLogic = async (req, res) => {
    try {
        const stores = await storeService.fetchStores();
        res.status(201).json({
            message: "Stores fetched successfully",
            product: stores
        })
    }
    catch(err)
    {
        // Return error response
        res.status(500).json({ error: err.message });
    }
}

const fetchStoreLogic = async (req, res) => {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({ error: "Invalid store ID provided" })
        }
        const store = await storeService.fetchStore(id);

        if (!store) {
            return res.status(404).json({ error: "Store not found" });
        }

        res.status(201).json({message: "Store fetched successfully", store: store})
    }
    catch (err)
    {
        // Return error response
        res.status(500).json({ error: err.message });
    }
}

const updateStoreLogic = async (req, res) => {
    try {
        const {id} = req.params
        const {customerId, name, description, contactDetails} = req.body;
        
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({ error: "Invalid store ID provided" })
        }
    
        const data = {customerId, name, description, contactDetails};
    
        const store = await storeService.updateStore(id, data);

        res.status(201).json({message: "Store fetched successfully", store: store})
    }
    catch(err)
    {
        // Return error response
        res.status(500).json({ error: err.message });
    }
}

const deleteStoreLogic = async (req, res) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({ error: "Invalid store ID provided" })
        }

        const store = await storeService.deleteStore(id);

        res.status(201).json({message: "Store fetched successfully", store: store})
    }
    catch (err)
    {
        // Return error response
        res.status(500).json({ error: err.message });
    }
}

module.exports = {createStoreLogic, fetchStoresLogic, fetchStoreLogic, updateStoreLogic, deleteStoreLogic}