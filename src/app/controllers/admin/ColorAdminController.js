const Color = require("../../models/Color");

class ColorAdminController {
    // [GET] /api/admin/color
    async show(req, res, next) {
        
        try {
            const color = await Color.find();

            res.json({success: true, color});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/admin/color/create
    async create(req, res, next) {
        
        const {name, code, img} = req.body;

        if(!name) {
            return res.status(400).json({success: false, message: "Name color is required"});
        }
        if(!code) {
            return res.status(400).json({success: false, message: "Code color is required"});
        }

        try {
            const newColor = new Color({
                name,
                code,
                img
            })

            await newColor.save();

            res.status(200).json({success: true, message: 'Add color success', color: newColor});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
        
    }

    // [PUT] /api/admin/color/:id
    async update(req, res, next) {
        res.render("api/admin/color/:id");
    }

    // [DELETE] /api/admin/color/:id
    async delete(req, res, next) {
        res.render("api/admin/color/:id");
    }
}

module.exports = new ColorAdminController();