import User from "../models/User.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Device from "../models/Device.js"
import Booking from "../models/Booking.js"

// API to Change Role of User
export const changeRoleToOwner = async (req, res)=>{
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: "Now you can list devices"})
    } catch (error) {
        console.log("Error at catch of changeRoleToOwner of ownerController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to List Device
export const addDevice = async (req, res)=>{
    try {
        const {_id} = req.user;
        let device = JSON.parse(req.body.deviceData);
        const imageFile = req.file;

        // Upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/devices'
        })

        // Optimization through imagekit URL transformation
        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                {width: '1280'}, // Width resizing
                {quality: 'auto'}, // Auto compression
                {format: 'webp'} // Convert to modern format
            ]
        });

        const image = optimizedImageURL;
        await Device.create({...device, owner: _id, image})

        res.json({success: true, message: "Device Added"})

    } catch (error) {
        console.log("Error at catch addDevice of ownerController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to List Owner Devices
export const getOwnerDevices = async (req, res)=>{
    try {
        const {_id} = req.user;
        const devices = await Device.find({owner: _id})
        res.json({success: true, devices})
    } catch (error) {
        console.log("Error at getOwnerDevices of ownerController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to Toogle Device Availability
export const toggleDeviceAvailability = async (req, res) => {
    try {
        const {_id} = req.user;
        const {deviceId} = req.body
        const device = await Device.findById(deviceId)

        // Checking is device belongs to the user
        if(device.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "Unauthorized"});
        }

        device.isAvaliable = !device.isAvaliable;
        await device.save()

        res.json({success: true, message: "Availability Toggled"})
    } catch (error) {
        console.log("Error at catch toggleDeviceAvai of ownerController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to delete a device
export const deleteDevice = async (req, res) => {
    try {
        const {_id} = req.user;
        const {deviceId} = req.body
        const device = await Device.findById(deviceId)

        // Checking is device belongs to the user
        if(device.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "Unauthorized"});
        }

        device.owner = null;
        device.isAvaliable = false;
        await device.save()

        res.json({success: true, message: "Device Removed"})
    } catch (error) {
        console.log("Error at catch deleteDevice of ownerController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to get Dashboard Data
export const getDashboardData = async (req, res) => {
    try {
        const {_id, role} = req.user;

        if(role !== 'owner'){
            return res.json({success: false, message: "Unauthorized"});
        }

        const devices = await Device.find({owner: _id})
        const bookings = await Booking.find({owner: _id}).populate('device').sort({createdAt: -1});

        const pendingBookings = await Booking.find({owner: _id, status: "pending"})
        const completedBookings = await Booking.find({owner: _id, status: "confirmed"})

        // Calculate monthlyrevenue from bookings where status is confirmed
        const monthlyRevenue = bookings.slice().filter(booking=>booking.status === 'confirmed').reduce((acc, booking)=> acc + booking.price, 0)

        const dashboardData = {
            totalDevices: devices.length, 
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0,3),
            monthlyRevenue
        }

        res.json({success: true, dashboardData});

    } catch (error) {
        console.log("Error at catch getDashboardData of ownerController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to update user image
export const updateUserImage = async (req, res) => {
    try {
        const {_id} = req.user;
        const imageFile = req.file;

        // Upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        // Optimization through imagekit URL transformation
        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                {width: '400'}, // Width resizing
                {quality: 'auto'}, // Auto compression
                {format: 'webp'} // Convert to modern format
            ]
        });

        const image = optimizedImageURL;

        await User.findByIdAndUpdate(_id, {image});
        res.json({success: true, message: "Image Updated"})

    } catch (error) {
        console.log("Error at catch updateUserImage of ownerController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}