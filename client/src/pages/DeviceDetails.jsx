import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {assets} from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import {toast} from 'react-hot-toast'

const DeviceDetails = () => {
    const {id} = useParams()
    const {devices, axios, pickupDate, setPickupDate, returnDate, setReturnDate} = useAppContext()
    const navigate = useNavigate()
    const [device, setDevice] = useState(null)
    const currency = import.meta.env.VITE_CURRENCY

    const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.post('/api/bookings/create', {
          device: id,
          pickupDate,
          returnDate
        })

        if(data.success){
          toast.success(data.message)
          navigate('/my-bookings')
        } else {
          console.log("Error at else of handleSubmit of DeviceDetails")
          toast.error(data.message)
        }
      } catch (error) {
        console.log("Error at catch of handleSubmit of DeviceDetails")
        toast.error(error.message)
      }
    }

    useEffect(()=>{
      setDevice(devices.find(device => device._id === id))
    },[devices, id])

  return device ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button onClick={()=> navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65'/>
        Back to all devices
      </button>
      
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        {/* Left: Device Images & Details */}
        <div className='lg:col-span-2'>
          <img src={device.image} alt="" className='w-full h-auto md:max-h-100 object-cover rounded-x1 mb-6 shadow-md'/>
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold'>{device.brand} {device.model}</h1>
              <p className='text-gray-500 text-lg'>{device.category} - {device.year}</p>
            </div>

            <hr className='border-borderColor my-6'/>

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                {icon: assets.users_icon, text: `${device.RAM} RAM`},
                {icon: assets.storage_icon, text: device.storage},
                {icon: assets.deviceIcon, text: device.CPU},
                {icon: assets.location_icon, text: device.location}
              ].map(({icon, text})=>(
                <div key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
                  <img src={icon} alt="" className='h-5 mb-2'/>
                  {text}
                </div>
              ))}
            </div>
            {/* Description */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{device.description}</p>
            </div>

            {/* Features */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {
                  ["Nothing Screen", "AI-Powered Interface", "Quantum-Grade Processing", "Seamless Cross-Device Fusion", "Self-Healing Materials"].map((item)=>(
                    <li key={item} className='flex items-center text-gray-500'>
                      <img src={assets.check_icon} className='h-4 mr-2' alt="" />
                      {item}
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <form onSubmit={handleSubmit} className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
          <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>{currency}{device.pricePerDay} <span className='text-base text-gray-400 font-normal'> per day</span> </p>

          <hr className='border-borderColor my-6'/>

          <div className='flex flex-col gap-2'>
            <label htmlFor="pickup-date">Pickup Date</label>
            <input value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)} type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id='pickup-date' min={new Date().toISOString().split('T')[0]}/>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="return-date">Return Date</label>
            <input value={returnDate} onChange={(e)=>setReturnDate(e.target.value)} type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id='return-date'/>
          </div>

          <button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer '>Book Now</button>

          <p className='text-center text-sm'>No credit card required to reserve</p>

        </form>
      </div>
    </div>
  ) : <Loader/>
}

export default DeviceDetails
