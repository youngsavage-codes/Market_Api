const express = require("express")
const route =  express.Router();
const StoreController = require("../controller/storeController")

const storeController = new StoreController()

route.post("/store/create", storeController.createStore);
route.get("/stores/", storeController.fetchStores);
route.get("/store/:id", storeController.fetchStore);
route.put("/store/:id", storeController.updateStore);
route.delete("/store/:id", storeController.deleteStore);

module.exports = route;