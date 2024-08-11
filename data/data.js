const cartRoute = require("../routes/cartRoute");
const ordersRoute = require("../routes/ordersRoute");
const customersRoute = require("../routes/customersRoute");
const productRoute = require("../routes/productRoute");

const routes = [
    { route: productRoute },
    { route: cartRoute },
    { route: ordersRoute },
    { route: customersRoute },

];

module.exports = routes;
