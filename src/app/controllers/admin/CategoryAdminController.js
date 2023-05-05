const Category = require("../../models/Category");

class CategoryAdminController {
    // [GET] /api/admin/category
    async show(req, res, next) {
        
        try {
            const category = await Category.find();

            res.json({success: true, category});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }

    }

    // [POST] /api/admin/category/create
    async create(req, res, next) {
        
        const {name, code, img} = req.body;

        if(!name) {
            return res.status(400).json({success: false, message: "Name category is required"});
        }
        if(!code) {
            return res.status(400).json({success: false, message: "Code category is required"});
        }

        try {
            const newCategory = new Category({
                name,
                code,
                img
            })

            await newCategory.save();

            res.status(200).json({success: true, message: 'Add category success', category: newCategory});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }

    }

    // [PUT] /api/admin/category/:id
    async update(req, res, next) {
        res.render("api/admin/category/:id");
    }

    // [DELETE] /api/admin/category/:id
    async delete(req, res, next) {
        res.render("api/admin/category/:id");
    }
}

module.exports = new CategoryAdminController();