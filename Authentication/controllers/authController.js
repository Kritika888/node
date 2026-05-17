const User = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne ({email});
        if(existingUser) {
            return res.status(400).json({message: "User already exists!"});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, email, password: hashPassword
        });
        res.status(201).json({
            message: "User registered successfully!",
            user
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

}

const login = async (req, res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({message: "User not found!"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(400).json({message: "Invalid credentials!"});
        }

        //jwt token
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful!",
            token
        });

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const profile = async (req, res) => {
    res.status(200).json({
        message: "Profile accessed!",
        user:req.user
    });
}

module.exports = {
    register,
    login,
    profile
};