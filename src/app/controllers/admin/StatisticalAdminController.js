const User = require("../../models/User");
const Product = require("../../models/Product");
const Order = require("../../models/Order");

class StatisticalAdminController {

    // [GET] /api/admin/statistical/top10User
    async top10User(req, res, next) {
        
        try {
            const user = await User.find({role: 'user'})
                                    .sort({spend: -1}).limit(10)
                                    .select('avatar name email spend phone');

            res.json({success: true, user});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }


    // [GET] /api/admin/statistical/top10Product
    async top10Product(req, res, next) {
        
        try {
            const product = await Product.find()
                                    .sort({quantitySold: -1}).limit(10)
                                    .select('image name view quantitySold');

            res.json({success: true, product});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }

    }

    
    // [GET] /api/admin/statistical/totalUser
    async totalUser(req, res, next) {
        
        try {
            const totalUser = await User.find({role: 'user'}).count();

            let data = [];
            const today = new Date();
            const monthCurrent = today.getMonth() + 1;
            const yearCurrent = today.getFullYear();

            for(let i = 1; i <= monthCurrent; i++) {
                const temp = await User.find({role: 'user', createAt: { $gte: `2023-${i}-01`, $lt: `2023-${i}-31` }}).count();

                data = [
                    ...data, 
                    {
                        sl: temp,
                    }
                ];
            }
            
            const lengthData = data.length;
            let percent = 100;
            if(data[lengthData - 2].sl > 0){
                percent = (data[lengthData - 1].sl - data[lengthData - 2].sl) / data[lengthData - 2].sl * 100;
            }


            const user = {
                totalUser,
                data,
                percent: percent.toFixed(2),
            }

            res.json({success: true, user});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    // [GET] /api/admin/statistical/totalProduct
    async totalProduct(req, res, next) {
        
        try {
            const totalProduct = await Product.find().count();

            let data = [];
            const today = new Date();
            const monthCurrent = today.getMonth() + 1;
            const yearCurrent = today.getFullYear();

            for(let i = 1; i <= monthCurrent; i++) {
                const temp = await Product.find({createAt: { $gte: `2023-${i}-01`, $lt: `2023-${i}-31` }}).count();

                data = [
                    ...data, 
                    {
                        sl: temp,
                    }
                ];
            }
            
            const lengthData = data.length;
            let percent = 100;
            if(data[lengthData - 2].sl > 0){
                percent = (data[lengthData - 1].sl - data[lengthData - 2].sl) / data[lengthData - 2].sl * 100;
            }


            const product = {
                totalProduct,
                data,
                percent: percent.toFixed(2),
            }

            res.json({success: true, product});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    // [GET] /api/admin/statistical/totalOrder
    async totalOrder(req, res, next) {
        
        try {
            const totalOrder = await Order.find().count();

            let data = [];
            const today = new Date();
            const monthCurrent = today.getMonth() + 1;
            const yearCurrent = today.getFullYear();

            for(let i = 1; i <= monthCurrent; i++) {
                const temp = await Order.find({orderDate: { $gte: `2023-${i}-01`, $lt: `2023-${i}-31` }}).count();

                data = [
                    ...data, 
                    {
                        sl: temp,
                    }
                ];
            }
            
            const lengthData = data.length;
            let percent = 100;
            if(data[lengthData - 2].sl > 0){
                percent = (data[lengthData - 1].sl - data[lengthData - 2].sl) / data[lengthData - 2].sl * 100;
            }


            const order = {
                totalOrder,
                data,
                percent: percent.toFixed(2),
            }

            res.json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }


    
    // [GET] /api/admin/statistical/totalRevenue
    async totalRevenue(req, res, next) {
        
        try {
            const totalOrderTemp = await Order.aggregate([
                                {$group : {_id:"$status", count:{$sum:"$totalPayment"}}}
                            ]);

            const totalOrder = totalOrderTemp.find((el) => el._id === 'Successed').count;

            let data = [];
            const today = new Date();
            const monthCurrent = today.getMonth() + 1;
            const yearCurrent = today.getFullYear();

            for(let i = 1; i <= monthCurrent; i++) {
                const temp = await Order.find({status: "Successed", orderDate: { $gte: `2023-${i}-01`, $lt: `2023-${i+1}-01` }});
                const pay = temp.reduce((st, el) => st + el.totalPayment, 0);

                data = [
                    ...data, 
                    {
                        sl: pay,
                    }
                ];
            }
            
            const lengthData = data.length;
            let percent = 100;
            if(data[lengthData - 2].sl > 0){
                percent = (data[lengthData - 1].sl - data[lengthData - 2].sl) / data[lengthData - 2].sl * 100;
            }


            const order = {
                totalOrder,
                data,
                percent: percent.toFixed(2),
            }

            res.json({success: true, order});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    // [GET] /api/admin/statistical/analytics
    async analytics(req, res, next) {
        
        try {

            let analytics = [];

            for(let i = 0; i < 7; i++) {
                const today = new Date(Date.now() - ((24*60*60*1000) * i));
                const monthCurrent = today.getMonth() + 1;
                const yearCurrent = today.getFullYear();
                const dateCurrent = today.getDate();
                const dayT = today.getDay();

                const temp = await Order.find({status: "Successed", orderDate: { $gte: `${yearCurrent}-${monthCurrent}-${dateCurrent}`, $lt: `${yearCurrent}-${monthCurrent}-${dateCurrent+1}` }});
                const pay = temp.reduce((st, el) => st + el.totalPayment, 0);


                analytics = [
                    ...analytics,
                    {
                        day: dayT === 0 ? "Sun" : dayT === 1 ? "Mon" : dayT === 2 ? "Tue" : dayT === 3 ? "Wed" : dayT === 4 ? "Thu" : dayT === 5 ? "Fri" : "Sat",
                        today: `${yearCurrent}-${monthCurrent}-${dateCurrent}`,
                        revenue: pay, 
                    }
                ]
            }

            res.json({success: true, analytics: analytics.reverse()});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }


}

module.exports = new StatisticalAdminController();