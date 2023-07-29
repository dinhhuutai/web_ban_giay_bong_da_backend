const productRouter = require("./user/product");
const userRouter = require("./user/user");
const orderRouter = require("./user/order");
const couponRouter = require('./user/coupon');

const productAdminRouter = require('./admin/productAdmin');
const userAdminRouter = require('./admin/userAdmin');
const categoryAdminRouter = require('./admin/categoryAdmin');
const trademarkAdminRouter = require('./admin/trademarkAdmin');
const colorAdminRouter = require('./admin/colorAdmin');
const sizeAdminRouter = require('./admin/sizeAdmin');
const productSizeAdminRouter = require('./admin/productSizeAdmin');
const couponAdminRouter = require('./admin/couponAdmin');
const orderAdminRouter = require('./admin/orderAdmin');
const statisticalAdminRouter = require('./admin/statisticalAdmin');

function routes(app) {
    // USER
    app.use("/api/product", productRouter);
    app.use("/api/user", userRouter);
    app.use("/api/order", orderRouter);
    app.use("/api/coupon", couponRouter);

    // ADMIN
    app.use("/api/admin/user", userAdminRouter);
    app.use("/api/admin/product", productAdminRouter);
    app.use("/api/admin/category", categoryAdminRouter);
    app.use("/api/admin/trademark", trademarkAdminRouter);
    app.use("/api/admin/color", colorAdminRouter);
    app.use("/api/admin/size", sizeAdminRouter);
    app.use("/api/admin/productSize", productSizeAdminRouter);
    app.use("/api/admin/coupon", couponAdminRouter);
    app.use("/api/admin/order", orderAdminRouter);
    app.use("/api/admin/statistical", statisticalAdminRouter);
}

module.exports = routes;
