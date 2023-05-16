const Product = require("../../models/Product");


const stringImage = require('../../../utils/sliceStringImage');
const cloudinary = require('cloudinary').v2;


class ProductAdminController {
    // [GET] /api/admin/product
    async show(req, res, next) {

        const limit = req.query.limit;
        const skip = req.query.skip;


        try {
            const product = await Product.find().limit(limit).skip(skip)
                                .populate('createBy', ['name'])
                                .populate('idCategory', ['name'])
                                .populate('idTrademark', ['name'])
                                .populate('idColor', ['name', 'code']);

            const quantityProduct = await Product.find().count();

            res.status(200).json({success: true, product, quantityProduct});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }

    }

    // [POST] /api/admin/product/create
    async create(req, res, next) {

        const {
            image,
            thumbnail1,
            thumbnail2,
            thumbnail3,
            name,
            price,
            size,
            quantity,
            idCategory,
            idTrademark,
            idColor,
            isNew,
            discount,
            description,
        } = req.body

        if(!name) {
            return res.status(400).json({success: false, message: "Name product is required"});
        }
        if(!price) {
            return res.status(400).json({success: false, message: "Price product is required"});
        }


        try {
            const newProduct = new Product({
                name,
                price,
                size,
                quantity,
                idCategory,
                idTrademark,
                idColor,
                image: [image, thumbnail1, thumbnail2, thumbnail3],
                isNew,
                discount,
                description,
                createAt: Date(Date.now()),
                createBy: req.userId,
                updateAt: Date(Date.now()),
            })

            await newProduct.save();


            res.status(200).json({success: true, message: 'Add product success', product: newProduct});

        } catch (error) {
            console.log(error);
            
            const filename = stringImage(image);
            cloudinary.uploader.destroy(filename);

            const filename1 = stringImage(thumbnail1);
            cloudinary.uploader.destroy(filename1);

            const filename2 = stringImage(thumbnail2);
            cloudinary.uploader.destroy(filename2);

            const filename3 = stringImage(thumbnail3);
            cloudinary.uploader.destroy(filename3);

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }

    }

    // [PUT] /api/admin/product/:id
    async update(req, res, next) {
        
        const {
            image,
            thumbnail1,
            thumbnail2,
            thumbnail3,
            name,
            price,
            size,
            quantity,
            idCategory,
            idTrademark,
            idColor,
            isNew,
            discount,
            description,
            imageOld,
            thumbnail1Old,
            thumbnail2Old,
            thumbnail3Old,
        } = req.body;

        // Simple validation
        
        if(!name) {
            return res.status(400).json({success: false, message: "Name product is required"});
        }
        if(!price) {
            return res.status(400).json({success: false, message: "Price product is required"});
        }


        try {

            const product = await Product.find({_id: req.params.id});

            let updatedProduct = {
                name,
                price,
                size,
                quantity,
                idCategory,
                idTrademark,
                idColor,
                image: [image, thumbnail1, thumbnail2, thumbnail3],
                isNew,
                discount,
                description,
                updateBy: req.userId,
                updateAt: Date(Date.now()),
            }

            const productUpdateCondition = {_id: req.params.id};

            updatedProduct = await Product.findOneAndUpdate(productUpdateCondition, updatedProduct, {new: true});

            // User not authorised to update post or post
            if(!updatedProduct){
                return res.status(401).json({success: false, message: 'Product not found or user not authorised'});
            }
            
            if(imageOld){
                const filename = stringImage(imageOld);
                cloudinary.uploader.destroy(filename);
    
                const filename1 = stringImage(thumbnail1Old);
                cloudinary.uploader.destroy(filename1);
    
                const filename2 = stringImage(thumbnail2Old);
                cloudinary.uploader.destroy(filename2);
    
                const filename3 = stringImage(thumbnail3Old);
                cloudinary.uploader.destroy(filename3);
            }

            res.json({success: true, message: 'Excellent progress!', product: updatedProduct});

        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }

    }

    // [DELETE] /api/admin/product/delete
    async delete(req, res, next) {

        try {

            const {listId} = req.body;

            const deletedProduct = listId.map(async id => {

                const dataProductById = await Product.findById(id);

                const productDelete = await Product.findOneAndDelete(id);

                if(productDelete){
                    dataProductById.image.map(async value => {
                        const filename = await stringImage(value);
                        await cloudinary.uploader.destroy(filename);
                    })
                }
            })

            if(!deletedProduct){
                return res.status(401).json({success: false, message: 'Product not found or user not authorised'});
            }


            res.status(200).json({success: true, message: 'Excellent progress!', product: deletedProduct});

        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    }
}

module.exports = new ProductAdminController();
