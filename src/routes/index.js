const productRouter = require("./user/product");
const userRouter = require("./user/user");

const productAdminRouter = require('./admin/productAdmin');
const userAdminRouter = require('./admin/userAdmin');
const categoryAdminRouter = require('./admin/categoryAdmin');
const trademarkAdminRouter = require('./admin/trademarkAdmin');
const colorAdminRouter = require('./admin/colorAdmin');

function routes(app) {
    // USER
    app.use("/api/product", productRouter);
    app.use("/api/user", userRouter);

    // ADMIN
    app.use("/api/admin/user", userAdminRouter);
    app.use("/api/admin/product", productAdminRouter);
    app.use("/api/admin/category", categoryAdminRouter);
    app.use("/api/admin/trademark", trademarkAdminRouter);
    app.use("/api/admin/color", colorAdminRouter);
}

module.exports = routes;
