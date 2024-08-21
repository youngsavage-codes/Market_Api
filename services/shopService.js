const Store = require('../model/storeModel');

class StoreService {
    async createStore(data) {
        const store = new Store(data);
        await store.save()
        return store;
    }
    async fetchStores() {
        const stores = await Store.find();
        return stores;
    }
    async fetchStore(id) {
        const store = await Store.findById(id);
        if(!store){
            throw new Error("Store not found");
        }
        return store;
    }
    async updateStore(id, data) {
        const store = await Store.findByIdAndUpdate(id, data, {new: true})
        if(!store)
        {
            throw new Error("Store not found");
        }
        return store;
    }
    async deleteStore(id) {
        const store = await Store.findByIdAndDelete(id);
        if(!id) {
            throw new Error("Store not found");
        }
        return store
    }
}

module.exports = StoreService;