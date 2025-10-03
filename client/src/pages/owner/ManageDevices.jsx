import React, {useState, useEffect} from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import {toast} from 'react-hot-toast'

const ManageDevices = () => {

    const {isOwner, axios, currency} = useAppContext()

    const [devices, setDevices] = useState([])

    const fetchOwnerDevices = async ()=>{
      try {
        const {data} = await axios.get('/api/owner/devices')
        if(data.success){
          setDevices(data.devices)
        } else {
          console.log("Error at else fetchOwnerDevices of ManageDevices")
          toast.error(data.message)
        }
      } catch (error) {
        console.log("Error at catch fetchOwnerDevices of ManageDevices")
        toast.error(error.message)
      }
    }

    const toggleAvailability = async (deviceId)=>{
      try {
        const {data} = await axios.post('/api/owner/toggle-device', {deviceId})
        if(data.success){
          toast.success(data.message)
          fetchOwnerDevices()
        } else {
          console.log("Error at else of toggleAvailability of ManageDevices")
          toast.error(data.message)
        }
      } catch (error) {
        console.log("Error at catch of toggleAvailability in ManageDevices")
        toast.error(error.message)
      }
    }

    const deleteDevice = async (deviceId)=>{
      try {

        const confirm = window.confirm('Are you sure to delete this device?')

        if(!confirm) return null

        const {data} = await axios.post('/api/owner/delete-device', {deviceId})
        if(data.success){
          toast.success(data.message)
          fetchOwnerDevices()
        } else {
          console.log("Error at else of deleteCar of ManageDevices")
          toast.error(data.message)
        }
      } catch (error) {
        console.log("Error at catch of deleteCar in ManageDevices")
        toast.error(error.message)
      }
    }

    useEffect(()=>{
      isOwner && fetchOwnerDevices()
    },[isOwner])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title title="Manage Devices" subTitle="View all listed devices, update their details, or remove them from the boooking platform."/>

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className="p-3 font-medium">Device</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index)=>(
              <tr key={index} className='border-t border-borderColor'>

                <td className='p-3 flex items-center gap-3'>
                  <img src={device.image} alt="" className="h-12 w-12 aspect-square rounded-md object-cover"/>
                  <div className='max-md:hidden'>
                    <p className='font-medium'>{device.brand} {device.model}</p>
                    <p className='text-xs text-gray-500'>{device.RAM} - {device.CPU}</p>
                  </div>
                </td>

                <td className='p-3 max-md:hidden'>{device.category}</td>
                <td className='p-3'>{currency}{device.pricePerDay}/day</td>

                <td className='p-3 max-md:hidden'>
                  <span className={`px-3 py-1 rounded-full text-xs ${device.isAvailable ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                    {device.isAvaliable ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className='flex items-center p-3'>
                  <img onClick={()=> toggleAvailability(device._id)} src={device.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="" className='cursor-pointer'/>

                  <img onClick={()=> deleteDevice(device._id)} src={assets.delete_icon} alt="" className='cursor-pointer'/>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageDevices
