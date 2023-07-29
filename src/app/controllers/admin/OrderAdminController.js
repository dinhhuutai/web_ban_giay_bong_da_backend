const Order = require("../../models/Order");
const Product = require("../../models/Product");
const User = require("../../models/User");

class OrderAdminController {

    // [GET] /api/admin/order/all
    async all(req, res, next) {

        try {
            const order = await Order.find()
                                .populate('orderBy', ['name', 'address', 'phone'])
                                .populate('idCoupon', ['code', 'priceDiscount'])
                                .populate('products.idProduct');


            res.status(200).json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    // [GET] /api/admin/order/waiting
    async waiting(req, res, next) {

        
        try {
            const order = await Order.find({status: 'Waiting'})
                                .populate('orderBy', ['name', 'address', 'phone'])
                                .populate('idCoupon', ['code', 'priceDiscount'])
                                .populate('products.idProduct');


            res.status(200).json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    

    // [GET] /api/admin/order/proccessing
    async proccessing(req, res, next) {

        
        try {
            const order = await Order.find({status: 'Proccessing'})
                                .populate('orderBy', ['name', 'address', 'phone'])
                                .populate('idCoupon', ['code', 'priceDiscount'])
                                .populate('products.idProduct');


            res.status(200).json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [GET] /api/admin/order/successed
    async successed(req, res, next) {

        
        try {
            const order = await Order.find({status: 'Successed'})
                                .populate('orderBy', ['name', 'address', 'phone'])
                                .populate('idCoupon', ['code', 'priceDiscount'])
                                .populate('products.idProduct');


            res.status(200).json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [GET] /api/admin/order/cancelled
    async cancelled(req, res, next) {

        
        try {
            const order = await Order.find({status: 'Cancelled'})
                                .populate('orderBy', ['name', 'address', 'phone'])
                                .populate('idCoupon', ['code', 'priceDiscount'])
                                .populate('products.idProduct');


            res.status(200).json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }


    // [PUT] /api/admin/order/updateStatus/:idOrder
    async updateStatus(req, res, next) {
        const idOrder = req.params.idOrder;
        const {status} = req.body;


        try {

            const updatedOrder = await Order.findByIdAndUpdate(idOrder, {status}, {new: true});
            if(updatedOrder && status === 'Successed'){
                await Order.findByIdAndUpdate(idOrder, {successDate: Date(Date.now())}, {new: true});
            }

            if(updatedOrder && status === 'Proccessing'){
                updatedOrder.products.map( async (product) => {
                    const productTemp = await Product.findById(product.idProduct);
                    const quantitySoldTemp = productTemp.quantitySold + product.quantity;
                    await Product.findByIdAndUpdate(product.idProduct, {quantitySold: quantitySoldTemp}, {new: true});
                })

                const spendUser = await User.findById(updatedOrder.orderBy);
                const spend = spendUser.spend + updatedOrder.totalPayment;

                await User.findByIdAndUpdate(updatedOrder.orderBy, {spend: spend}, {new: true});
            }

            res.status(200).json({success: true, order: updatedOrder});
            
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }

    }

}

module.exports = new OrderAdminController();