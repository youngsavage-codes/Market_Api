const cartRoute = require("../routes/cartRoute");
const ordersRoute = require("../routes/ordersRoute");
const customersRoute = require("../routes/customersRoute");
const productRoute = require("../routes/productRoute");
const paymentRoute = require("../routes/paymentRoute");

const routes = [
    { route: productRoute },
    { route: cartRoute },
    { route: ordersRoute },
    { route: customersRoute },
    { route: paymentRoute },

];

module.exports = routes;
