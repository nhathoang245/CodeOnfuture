import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const deviceSchema = new mongoose.Schema({
    owner: {type: ObjectId, ref: 'User'}, 
    brand: {type: String, required: true},
    model: {type: String, required: true},
    image: {type: String, required: true},
    year: {type: String, required: true},
    category: {type: String, required: true},
    CPU: {type: String, required: true},
    RAM: {type: String, required: true},
    storage: {type: String, required: true},
    pricePerDay: {type: Number, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    isAvaliable: {type: Boolean, default: true}

}, {timestamps: true})

const Device = mongoose.model('Device', deviceSchema)

export default Device