import express from "express";
import { protect } from "../middleware/auth.js";
import { addDevice, changeRoleToOwner, deleteDevice, getOwnerDevices, toggleDeviceAvailability, updateUserImage, getDashboardData } from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner)
ownerRouter.post("/add-device", upload.single("image"), protect, addDevice)
ownerRouter.get("/devices", protect, getOwnerDevices)
ownerRouter.post("/toggle-device", protect, toggleDeviceAvailability)
ownerRouter.post("/delete-device", protect, deleteDevice)

ownerRouter.get('/dashboard', protect, getDashboardData)
ownerRouter.post('/update-image', upload.single("image"), protect, updateUserImage)

export default ownerRouter;