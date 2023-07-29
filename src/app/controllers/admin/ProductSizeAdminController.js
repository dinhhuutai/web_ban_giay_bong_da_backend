const ProductSize = require("../../models/ProductSize");
const Product = require("../../models/Product");

class ProductSizeAdminController {
    // [GET] /api/admin/productSize
    async show(req, res, next) {
        res.render("api/admin/productSize");
    }

    // [GET] /api/admin/productSize/findProductBySize
    async findProductBySize(req, res, next) {
        const idProduct = req.query.id;


        try {
            const quantityBySize = await ProductSize.find({idProduct})
                                                    .populate('idSize', ['size']);

            res.status(200).json({success: true, quantityBySize});
            
        } catch (error) {
            res.status(500).json({success: false, message: 'Internal server error'});
        }

    }


    // [POST] /api/admin/productSize/create
    async create(req, res, next) {
        const {
            idProduct,
            idSize,
            quantity,
        } = req.body


        try {
            const newProductSize = new ProductSize({
                idProduct,
                idSize,
                quantity,
                createAt: Date(Date.now()),
                createBy: req.userId,
                updateAt: Date(Date.now()),
            })
            await newProductSize.save();



            const product = await Product.findById(idProduct);

            const newTotalQuantity = product.totalQuantity + (quantity*1);

            const updatedProduct = await Product.findOneAndUpdate({_id: idProduct}, {totalQuantity: newTotalQuantity}, {new: true});

            // User not authorised to update post or post
            if(!updatedProduct){
                return res.status(401).json({success: false, message: 'Product not found or user not authorised'});
            }

            res.status(200).json({success: true, message: 'Add product success', productSize: newProductSize});

        } catch (error) {
            console.log(error);

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [PUT] /api/admin/productSize/:id
    async update(req, res, next) {
        res.render("api/admin/productSize/:id");
    }


    // [PUT] /api/admin/productSize/decrease/:id
    async decrease(req, res, next) {
        const {
            size,
            quantity,
        } = req.body;

        const idProductSize = req.params.id;
        const idProduct = req.query.idProduct;

        try {
            const productSize = await ProductSize.findById(idProductSize);

            const newQuantity = productSize.quantity - (quantity*1);

            const updatedProductSize = await ProductSize.findOneAndUpdate({_id: idProductSize}, {quantity: newQuantity}, {new: true});

            // User not authorised to update post or post
            if(!updatedProductSize){
                return res.status(401).json({success: false, message: 'ProductSize not found or user not authorised'});
            }

            
            const product = await Product.findById(idProduct);

            const newTotalQuantity = product.totalQuantity - (quantity*1);

            const updatedProduct = await Product.findOneAndUpdate({_id: idProduct}, {totalQuantity: newTotalQuantity}, {new: true});

            // User not authorised to update post or post
            if(!updatedProduct){
                return res.status(401).json({success: false, message: 'Product not found or user not authorised'});
            }

            return res.status(200).json({success: true, productSize: updatedProductSize, product: updatedProduct});
            
        } catch (error) {
            res.status(500).json({success: false, message: 'Internal server error'});
        }

    }

    // [PUT] /api/admin/productSize/increase/:id
    async increase(req, res, next) {
        
    const {
        size,
        quantity,
    } = req.body;

    
    const idProductSize = req.params.id;
    const idProduct = req.query.idProduct;

    try {
        const productSize = await ProductSize.findById(idProductSize);

        const newQuantity = productSize.quantity + (quantity*1);

        const updatedProductSize = await ProductSize.findOneAndUpdate({_id: idProductSize}, {quantity: newQuantity}, {new: true});

        // User not authorised to update post or post
        if(!updatedProductSize){
            return res.status(401).json({success: false, message: 'ProductSize not found or user not authorised'});
        }

        
        const product = await Product.findById(idProduct);

        const newTotalQuantity = product.totalQuantity + (quantity*1);

        const updatedProduct = await Product.findOneAndUpdate({_id: idProduct}, {totalQuantity: newTotalQuantity}, {new: true});

        // User not authorised to update post or post
        if(!updatedProduct){
            return res.status(401).json({success: false, message: 'Product not found or user not authorised'});
        }

        return res.status(200).json({success: true, productSize: updatedProductSize, product: updatedProduct});
        
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
    }
    }


    // [DELETE] /api/admin/productSize/:id
    async delete(req, res, next) {
        res.render("api/admin/productSize/:id");
    }
}

module.exports = new ProductSizeAdminController();