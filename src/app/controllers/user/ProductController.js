const Product = require("../../models/Product");

class ProductController {
    
    // [POST] /api/product
    async show(req, res, next) {
        const limit = req.query.limit;
        const skip = req.query.skip;

        const {
            category,
            trademark,
            price,
            color,
            arrange,
        } = req.body;

        let filter = {};
        if(category === -1){
            delete filter.idCategory;
        } else {
            filter = {
                ...filter,
                idCategory: category,
            }
        }

        if(trademark.includes(-1) || trademark.includes("-1") || trademark.length === 0) {
            delete filter.idTrademark;
        } else {
            filter = {
                ...filter,
                idTrademark: trademark,
            }
        }

        if(color.includes(-1) || color.includes("-1") || color.length === 0) {
            delete filter.idColor;
        } else {
            filter = {
                ...filter,
                idColor: color,
            }
        }

        if(price.includes(-1) || price.includes("-1")) {
            delete filter.price;
        } else {
            filter = {
                ...filter,
                price: {$gt: price[0], $lte: price[1]},
            }
        }

        let sort = {};
        if(arrange === 0){
            sort = {
                createAt: -1,
            }
        } else if(arrange === 1) {
            sort = {
                price: 1,
            }
        } else {
            sort = {
                price: -1,
            }
        }

        

        try {
            const product = await Product.find(filter)
                                .sort(sort)
                                .limit(limit).skip(skip)
                                .populate('createBy', ['name'])
                                .populate('idCategory', ['name'])
                                .populate('idTrademark', ['name'])
                                .populate('idColor', ['name', 'code']);

            const quantityProduct = await Product.find(filter)
                                                .count();


            res.status(200).json({success: true, product, quantityProduct});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }


    // [GET] /api/product/:id
    async get(req, res, next) {

        const id = req.params.id;

        try {
            const product = await Product.findById(id)
                                        .populate('createBy', ['name'])
                                        .populate('idCategory', ['name'])
                                        .populate('idTrademark', ['name'])
                                        .populate('idColor', ['name', 'code']);

            res.status(200).json({success: true, product});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }


    }


    // [GET] /api/product/relate/:id
    async getRelate(req, res, next) {

        const id = req.params.id;
        const idCategory = req.query.idCategory;
        const idTrademark = req.query.idTrademark;
        const limit = req.query.limit;

        try {
            const products = await Product.find({$and: [{_id: {$ne: id} }, {$or: [{idCategory}, {idTrademark}]}]})
                                        .limit(limit)
                                        .populate('createBy', ['name'])
                                        .populate('idCategory', ['name'])
                                        .populate('idTrademark', ['name'])
                                        .populate('idColor', ['name', 'code']);


            res.status(200).json({success: true, products});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }


    // [PUT] /api/product/updateView/:id
    async updateView(req, res, next) {
        const id = req.params.id;


        try {
            const viewProduct = await Product.findById(id);
            const view = viewProduct.view + 1;

            const products = await Product.findByIdAndUpdate(id, {view: view}, {new: true});


            res.status(200).json({success: true, products});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }

    }

}

module.exports = new ProductController();
