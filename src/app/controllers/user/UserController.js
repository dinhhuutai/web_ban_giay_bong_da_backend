require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

class UserController {

    // Check if user is logged in
    // [GET] /api/user/
    async checkUser(req, res, next) {
        try {
            const user = await User.findById(req.userId).select('-password');
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
                avatar: avatar || "https://res.cloudinary.com/dsdbqfn5l/image/upload/v1682999747/webbangiaybongda/T6-U30-lvmuq2-Vector-Bong-Da-012_k5czbx.jpg",
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




}

module.exports = new UserController();
