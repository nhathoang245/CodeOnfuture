import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Device from "../models/Device.js";


// Generate JWT Token
const generateToken = (userId)=>{
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET)
}

// Register User
export const registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password || password.length < 8){
            return res.json({success: false, message: 'fill all the fields'})
        }

        const userExists = await User.findOne({email})
        if(userExists){
            return res.json({success: false, message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({name, email, password: hashedPassword})

        const token = generateToken(user._id.toString())
        res.json({success: true, token})
    } catch (error) {
        console.log("Error at catch registerUser of userController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Login User
export const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.json({success: false, message: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: "Invalid Credentials"})
        }
        const token = generateToken(user._id.toString())
        res.json({success: true, token})
    } catch (error){
        console.log("Error at catch of loginUser of userController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get User data using Token (JWT)
export const getUserData = async (req, res)=>{
    try {
        const {user} = req;
        res.json({success: true, user})
    } catch (error) {
        console.log("Error at catch getUserData of userController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get All Devices for the Frontend
export const getDevices = async (req, res) =>{
    try {
        const devices = await Device.find({isAvaliable: true})
        res.json({success: true, devices})
    } catch (error){
        console.log("Error at catch getDevices of userController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}