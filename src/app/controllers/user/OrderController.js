const Order = require("../../models/Order");
const Coupon = require("../../models/Coupon");
const Product = require("../../models/Product");
const ProductSize = require("../../models/ProductSize");



class OrderController {
    // [GET] /api/order
    async show(req, res, next) {
        res.render("api/order");
    }

    // [GET] /api/order/getById/:id
    async getById(req, res, next) {
        
        const id = req.params.id;
        
        try {
            const order = await Order.findById(id)
                                        .populate('orderBy', ['name', 'phone', 'address'])
                                        .populate('products.idProduct')
                                        .populate('products.idSize')
                                        .populate('idCoupon');


            res.status(200).json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }

    }

    // [POST] /api/order/create
    async create(req, res, next) {
        const {
            products,
            idCoupon,
            totalPriceProduct,
            totalPayment,
        } = req.body;
        
        const idUser = req.userId;
        
        const idCouponTemp = await Coupon.findOne({code: idCoupon.code});


        try {
            const newOrder = new Order({
                products,
                idCoupon: idCouponTemp && idCouponTemp.id,
                totalPriceProduct,
                totalPayment,
                status: 'Waiting',
                orderBy: idUser,
                orderDate: Date(Date.now()),
            })

            
            products.map( async (product) => {

                const productSize = await ProductSize.findOne({idProduct: product.idProduct._id, idSize: product.idSize._id});
                const newQuantityProductSize = productSize.quantity - (product.quantity);
                const updatedProductSize = await ProductSize.findOneAndUpdate({idProduct: product.idProduct._id, idSize: product.idSize._id}, {quantity: newQuantityProductSize}, {new: true});
                

                const newTotalQuantityProduct = product.idProduct.totalQuantity - (product.quantity);
                const updatedProduct = await Product.findOneAndUpdate({_id: product.idProduct._id}, {totalQuantity: newTotalQuantityProduct}, {new: true});
                
            })
            
            await newOrder.save();


            res.status(200).json({success: true, message: 'Add product success', order: newOrder});

        } catch (error) {
            console.log(error);

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/order/all
    async all(req, res, next) {

        const idUser = req.userId;

        try {
            const order = await Order.find({orderBy: idUser})
                                .populate('orderBy', ['name', 'address', 'phone'])
                                .populate('idCoupon', ['code', 'priceDiscount'])
                                .populate('products.idProduct')
                                .sort({orderDate: -1});


            res.status(200).json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    // [GET] /api/order/waiting
    async waiting(req, res, next) {

        const idUser = req.userId;
        
        try {
            const order = await Order.find({orderBy: idUser, status: 'Waiting'})
                                .populate('orderBy', ['name', 'address', 'phone'])
                                .populate('idCoupon', ['code', 'priceDiscount'])
                                .populate('products.idProduct')
                                .sort({orderDate: -1});


            res.status(200).json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    

    // [GET] /api/order/proccessing
    async proccessing(req, res, next) {

        const idUser = req.userId;
        
        try {
            const order = await Order.find({orderBy: idUser, status: 'Proccessing'})
                                .populate('orderBy', ['name', 'address', 'phone'])
                                .populate('idCoupon', ['code', 'priceDiscount'])
                                .populate('products.idProduct')
                                .sort({orderDate: -1});


            res.status(200).json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [GET] /api/order/successed
    async successed(req, res, next) {

        const idUser = req.userId;
        
        try {
            const order = await Order.find({orderBy: idUser, status: 'Successed'})
                                .populate('orderBy', ['name', 'address', 'phone'])
                                .populate('idCoupon', ['code', 'priceDiscount'])
                                .populate('products.idProduct')
                                .sort({orderDate: -1});


            res.status(200).json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [GET] /api/order/cancelled
    async cancelled(req, res, next) {

        const idUser = req.userId;
        
        try {
            const order = await Order.find({orderBy: idUser, status: 'Cancelled'})
                                .populate('orderBy', ['name', 'address', 'phone'])
                                .populate('idCoupon', ['code', 'priceDiscount'])
                                .populate('products.idProduct')
                                .sort({orderDate: -1});


            res.status(200).json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }


    
    // [PUT] /api/order/updateStatus/:idOrder
    async updateStatus(req, res, next) {
        const idOrder = req.params.idOrder;
        const {status} = req.body;

        
        try {

            const updatedOrder = await Order.findByIdAndUpdate(idOrder, {status}, {new: true});
            
            if(updatedOrder) {
                const order = await Order.findById(idOrder)
                            .populate('products.idSize')
                            .populate('products.idProduct');

                const products = order.products;

                products.map( async (product) => {
                    
                    const newTotalQuantityProduct = product.idProduct.totalQuantity + (product.quantity);
                    const updatedProduct = await Product.findOneAndUpdate({_id: product.idProduct._id}, {totalQuantity: newTotalQuantityProduct}, {new: true});

                    const productSize = await ProductSize.findOne({idProduct: product.idProduct._id, idSize: product.idSize._id});
                    const newQuantityProductSize = productSize.quantity + (product.quantity);
                    const updatedProductSize = await ProductSize.findOneAndUpdate({idProduct: product.idProduct._id, idSize: product.idSize._id}, {quantity: newQuantityProductSize}, {new: true});

                })

            }

            res.status(200).json({success: true, order: updatedOrder});
            
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }

    }


    // [PUT] /api/order/:id
    async update(req, res, next) {
        res.render("api/order/:id");
    }

    // [DELETE] /api/order/:id
    async delete(req, res, next) {
        res.render("api/order/:id");
    }
}

module.exports = new OrderController();
