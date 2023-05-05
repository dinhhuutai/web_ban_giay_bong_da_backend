const Trademark = require("../../models/Trademark");

class TrademarkAdminController {
    // [GET] /api/admin/trademark
    async show(req, res, next) {
        
        try {
            const trademark = await Trademark.find();

            res.json({success: true, trademark});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/admin/trademark/create
    async create(req, res, next) {
        
        const {name, code, img} = req.body;

        if(!name) {
            return res.status(400).json({success: false, message: "Name trademark is required"});
        }
        if(!code) {
            return res.status(400).json({success: false, message: "Code trademark is required"});
        }

        try {
            const newTrademark = new Trademark({
                name,
                code,
                img
            })

            await newTrademark.save();

            res.status(200).json({success: true, message: 'Add trademark success', trademark: newTrademark});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
        
    }

    // [PUT] /api/admin/trademark/:id
    async update(req, res, next) {
        res.render("api/admin/trademark/:id");
    }

    // [DELETE] /api/admin/trademark/:id
    async delete(req, res, next) {
        res.render("api/admin/trademark/:id");
    }
}

module.exports = new TrademarkAdminController();