require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const stringImage = require('../../../utils/sliceStringImage');
const cloudinary = require('cloudinary').v2;
const User = require("../../models/User");

class UserController {

    // Check if user is logged in
    // [GET] /api/user/
    async checkUser(req, res, next) {
        try {
            const user = await User.findById(req.userId).select('-password')
                                                    .populate('cart.idProduct')
                                                    .populate('cart.idSize');

            if(!user){
                return res.status(400).json({success: false, message: 'User not found'});
            }
            res.json({success: true, user});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    }


    // Đăng kí tài khoản
    // [POST] /api/user/register
    async register(req, res, next) {
        const { fullname, role, username, password, phone, address, avatar } = req.body;


        if (!fullname) {
            return res
                .status(400)
                .json({ success: false, message: "Full name is required" });
        }
        if (!username) {
            return res
                .status(400)
                .json({ success: false, message: "Username is required" });
        }
        if (!password) {
            return res
                .status(400)
                .json({ success: false, message: "Password is required" });
        }
        if (!phone) {
            return res
                .status(400)
                .json({ success: false, message: "Phone singer is required" });
        }
        if (!address) {
            return res
                .status(400)
                .json({ success: false, message: "Address year is required" });
        }

        try {
            const user = await User.findOne({ username });
            if (user) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Username already taken",
                    });
            }

            const hashedPassword = await argon2.hash(password);
            const newUser = new User({
                name: fullname,
                role: role || 'user',
                username,
                password: hashedPassword,
                phone,
                address,
                avatar: avatar || ["https://res.cloudinary.com/dsdbqfn5l/image/upload/v1687139023/webbangiaybongda/2057d4025bb4f7e_iygwbj.jpg"],
                createAt: Date(Date.now()),
            });

            await newUser.save();

            // return token
            const accessToken = jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            return res
                .status(200)
                .json({
                    success: true,
                    message: "User created successfully",
                    role: newUser.role,
                    accessToken,
                });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }



    // Đăng nhập
    // [POST] /api/user/login
    async login(req, res, next) {
        const { username, password } = req.body;

        if (!username) {
            return res
                .status(400)
                .json({ success: false, message: "Username is required" });
        }
        if (!password) {
            return res
                .status(400)
                .json({ success: false, message: "Password is required" });
        }


        try {

            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({success: false, message: 'Incorrect username or password'});
            }

            const passwordValid = await argon2.verify(user.password, password);
            if(!passwordValid) {
                return res.status(400).json({success: false, message: 'Incorrect username or password'});
            }


            // return token
            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            return res
                .status(200)
                .json({
                    success: true,
                    message: "User logged in successfully",
                    role: user.role,
                    accessToken,
                });

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }


    // Cập nhật lại giỏ hàng
    // [PUT] api/user/cart
    async updateCart(req, res, next) {
        const idUser = req.userId;
        const {idProduct, quantity, idSize} = req.body;


        if(!idProduct){
            return res.status(400).json({success: false, message: 'Missing id product'});
        }
        if(!quantity){
            return res.status(400).json({success: false, message: 'Missing id quantity'});
        }
        if(!idSize){
            return res.status(400).json({success: false, message: 'Missing id size'});
        }

        try {
            const user = await User.findById(idUser).select('cart');
            const alreadyProduct = user?.cart?.find(el => el.idProduct.toString() === idProduct && el.idSize.toString() === idSize);

            if(alreadyProduct){
                const response = await User.updateOne({cart: {$elemMatch: alreadyProduct}},
                                                {$set: {"cart.$.quantity": quantity}},
                                                {new: true});

                if(response){
                    const user = await User.findById(idUser)
                                        .populate('cart.idProduct')
                                        .populate('cart.idSize');

                    res.status(200).json({success: true, carts: user.cart});
                }  

            } else {
                const response = await User.findByIdAndUpdate(idUser,
                                                {$push: {cart: {idProduct, quantity, idSize}}},
                                                {new: true})
                                            .populate('cart.idProduct')
                                            .populate('cart.idSize');

                if(response){
                    res.status(200).json({success: true, carts: response.cart});
                } 

            }
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }

    }

    // [PUT] /api/user/deleteCart
    async deleteCart(req, res, next) {
        const idUser = req.userId;

        try {

            const response = await User.findByIdAndUpdate(idUser, {cart: []}, {new: true})
                                                .populate('cart.idProduct')
                                                .populate('cart.idSize');
            
            if(response) {
                res.status(200).json({success: true, carts: response.cart});
            }

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }

    }


    // Xoá sản phẩm trong giỏ hàng
    // [PUT] /api/user/removeCart
    async removeProductInCart(req, res, next) {
        const idUser = req.userId;
        const {id} = req.body;


        if(!id){
            return res.status(400).json({success: false, message: 'Missing id'});
        }

        try {

            const response = await User.findByIdAndUpdate(idUser,
                                                    {$pull: {cart: {_id: id}}},
                                                    {new: true})
                                                .populate('cart.idProduct')
                                                .populate('cart.idSize');
            
            if(response) {
                res.status(200).json({success: true, carts: response.cart});
            }

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    // [POST] /api/user/uploadimgOne
    async uploadImgOne(req, res, nex) {

        try {

            res.status(200).json({success: true, link: req.file});

        } catch (error) {
            
            res.status(500).json({success: false});
        }
    }

    // [PUT] /api/user/update
    async update(req, res, next) {
 
        const {
            name,
            email,
            phone,
            birth,
            sex,
            avatar,
        } = req.body;
        
        const idUser = req.userId;


        try {

            const user = await User.findById(idUser);


            if(avatar === null){

                let updatedUser = {
                    name,
                    email,
                    phone,
                    birth,
                    sex,
                    updateBy: req.userId,
                    updateAt: Date(Date.now()),
                }

                updatedUser = await User.findOneAndUpdate({_id: idUser}, updatedUser, {new: true})
                                        .populate('cart.idProduct')
                                        .populate('cart.idSize');

                res.status(200).json({success: true, user: updatedUser});

            } else {
                if(user.avatar.length === 1) {

                    let updatedUser = {
                        name,
                        email,
                        phone,
                        birth,
                        sex,
                        updateBy: req.userId,
                        updateAt: Date(Date.now()),
                    }
    
                    updatedUser = await User.findOneAndUpdate({_id: idUser}, updatedUser, {new: true})
                    .populate('cart.idProduct')
                    .populate('cart.idSize');

                    if(updatedUser) {

                        updatedUser = await User.findByIdAndUpdate(idUser,
                            {$push: {avatar: avatar}},
                            {new: true});
                    }

    
                    res.status(200).json({success: true, user: updatedUser});

                } else {
                    let updatedUser = {
                        name,
                        email,
                        phone,
                        birth,
                        sex,
                        updateBy: req.userId,
                        updateAt: Date(Date.now()),
                    }
    
                    updatedUser = await User.findOneAndUpdate({_id: idUser}, updatedUser, {new: true})
                    .populate('cart.idProduct')
                    .populate('cart.idSize');

                    if(updatedUser) {

                        const filename = stringImage(updatedUser.avatar[1]);
                        cloudinary.uploader.destroy(filename);

                        updatedUser = await User.findByIdAndUpdate(idUser,
                            {$pull: {avatar: updatedUser.avatar[1]}},
                            {new: true})
                            .populate('cart.idProduct')
                            .populate('cart.idSize');
                            
                        updatedUser = await User.findByIdAndUpdate(idUser,
                            {$push: {avatar: avatar}},
                            {new: true})
                            .populate('cart.idProduct')
                            .populate('cart.idSize');
                    }

    
                    res.status(200).json({success: true, user: updatedUser});
                }

            }

        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    }



    // [PUT] /api/user/updateAddress
    async updateAddress(req, res, next) {
 
        const {
            address
        } = req.body;
        
        const idUser = req.userId;


        try {

            let updatedUser = {
                address
            }

            updatedUser = await User.findOneAndUpdate({_id: idUser}, updatedUser, {new: true})
                                    .populate('cart.idProduct')
                                    .populate('cart.idSize');

            res.status(200).json({success: true, user: updatedUser});

        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    }

}

module.exports = new UserController();
