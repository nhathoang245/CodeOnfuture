import React, {useEffect, useState} from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import DeviceCard from '../components/DeviceCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import {toast} from 'react-hot-toast'

const Devices = () => {

    // getting search params from url
    const [searchParams] = useSearchParams()
    const pickupLocation = searchParams.get('pickupLocation')
    const pickupDate = searchParams.get('pickupDate')
    const returnDate = searchParams.get('returnDate')

    const {devices, axios} = useAppContext()

    const [input, setInput] = useState('')

    const isSearchData = pickupLocation && pickupDate && returnDate
    const [filteredDevices, setFilteredDevices] = useState([])

    const applyFilter = async ()=>{
      if(input === ''){
        setFilteredDevices(devices)
        return null
      }

      const filtered = devices.slice().filter((device)=>{
        return device.brand.toLowerCase().includes(input.toLowerCase())
        || device.model.toLowerCase().includes(input.toLowerCase())
        || device.category.toLowerCase().includes(input.toLowerCase())
        || device.CPU.toLowerCase().includes(input.toLowerCase())
      })
      setFilteredDevices(filtered)
    }

    const searchDeviceAvailability = async () =>{
      const {data} = await axios.post('/api/bookings/check-availability', {location: pickupLocation, pickupDate, returnDate})
      if(data.success){
        setFilteredDevices(data.availableDevices)
        if(data.availableDevices.length === 0){
          toast('No device available')
        }
        return null
      }
    }

    useEffect(()=>{
      isSearchData && searchDeviceAvailability()
    },[])

    useEffect(()=>{
      devices.length > 0 && !isSearchData && applyFilter()
    },[input, devices])

  return (
    <div>
      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Devices' subTitle='Find the power of next-generation tech.'/>  
        
        <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
          <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2'/>

          <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Search by make, model, or features' className='w-full h-full outline-none text-gray-500'/>
          
          <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2'/>
        </div>                
      </div>  

      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filteredDevices.length} Devices</p>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredDevices.map((device, index)=> (
            <div key={index}>
              <DeviceCard device={device}/>  
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Devices
