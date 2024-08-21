const {
    createStoreLogic, 
    fetchStoresLogic, 
    fetchStoreLogic, 
    updateStoreLogic, 
    deleteStoreLogic
} = require("../businessLogics/storeLogic");
const asyncHandler = require("express-async-handler");

class StoreController {
    createStore = asyncHandler(async (req, res) => {
        await createStoreLogic(req, res);
    })
    fetchStores = asyncHandler(async (req, res) => {
        await fetchStoresLogic(req, res);
    })
    fetchStore = asyncHandler(async (req, res) => {
        await fetchStoreLogic(req, res);
    })
    updateStore = asyncHandler(async (req, res) => {
        await updateStoreLogic(req, res);
    })
    deleteStore = asyncHandler(async (req, res) => {
        await deleteStoreLogic(req, res);
    })
}

module.exports = StoreController;