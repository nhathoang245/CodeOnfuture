import Booking from "../models/Booking.js"
import Device from "../models/Device.js";


// Function to Check Availability of Device for a given Date
export const checkAvailability = async (device, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        device, 
        pickupDate: {$lte: returnDate},
        returnDate: {$gte: pickupDate},
    })
    return bookings.length === 0;
}

// API to Check Availability of Devices for the given Date and Location
export const checkAvailabilityOfDevice = async(req, res) => {
    try {
        const {location, pickupDate, returnDate} = req.body

        // fetch all available devices for the given location
        const devices = await Device.find({location, isAvaliable: true})

        // check device availability for the given date range using promise
        const availableDevicesPromises = devices.map(async (car)=>{
            const isAvailable = await checkAvailability(device._id, pickupDate, returnDate)
            return {...device._doc, isAvailable: isAvailable}
        })

        let availableDevices = await Promise.all(availableDevicesPromises);
        availableDevices = availableDevices.filter(device => device.isAvailable === true)

        res.json({success: true, availableDevices})

    } catch (error) {
        console.log("Error at catch chechAvaiOfDevice of bookingController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to Create Booking
export const createBooking = async (req, res)=>{
    try {
        const {_id} = req.user;
        const {device, pickupDate, returnDate} = req.body;

        const isAvailable = await checkAvailability(device, pickupDate, returnDate)
        if(!isAvailable){
            return res.json({success: false, message: "Device is not available"})
        }

        const deviceData = await Device.findById(device)

        // Calculate price based on pickupDate and returnDate
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
        const price = deviceData.pricePerDay * noOfDays;
        await Booking.create({device, owner: deviceData.owner, user: _id, pickupDate, returnDate, price})

        res.json({success: true, message: "Booking Created"})

    } catch (error) {
        console.log("Error at catch createBooking of bookingController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to List User Bookings
export const getUserBookings = async (req, res)=>{
    try {
        const {_id} = req.user;
        const bookings = await Booking.find({user: _id}).populate("device").sort({createdAt: -1})
        res.json({success: true, bookings})

    } catch (error) {
        console.log("Error at catch getUserBookings of bookingController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to get Owner Bookings
export const getOwnerBookings = async (req, res)=>{
    try {
        if(req.user.role !== 'owner'){
            return res.json({success: false, message: "Unauthorized"})
        }
        const bookings = await Booking.find({owner: req.user._id}).populate('device user').select("-user.password").sort({createdAt: -1})
        res.json({success: true, bookings})

    } catch (error) {
        console.log("Error at catch getOwnerBookings of bookingController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to change booking status
export const changeBookingStatus = async (req, res)=>{
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body

        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "Unauthorized"})
        }

        booking.status = status;
        await booking.save();

        res.json({success: true, message: "Status Updated"})

    } catch (error) {
        console.log("Error at catch changeBooingStatus of bookingController")
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}