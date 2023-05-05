const Product = require("../../models/Product");

class ProductController {
    
    // [GET] /api/product
    async show(req, res, next) {
        res.send("api/product");
    }

}

module.exports = new ProductController();
