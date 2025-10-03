import React,  {useState} from 'react'
import {assets} from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import {toast} from 'react-hot-toast'

const AddDevice = () => {

    const {axios, currency} = useAppContext()


    const [image, setImage] = useState(null)
    const [device, setDevice] = useState({
      brand: '',
      model: '',
      year: 0,
      pricePerDay: 0,
      category: '',
      CPU: '',
      RAM: '',
      storage: '',
      location: '',
      description: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const onSubmitHandler = async (e)=>{
      e.preventDefault()
      if(isLoading) return null

      setIsLoading(true)
      try {
        const formData = new FormData()
        formData.append('image', image)
        formData.append('deviceData', JSON.stringify(device))

        const {data} = await axios.post('/api/owner/add-device', formData)

        if(data.success){
          toast.success(data.message)
          setImage(null)
          setDevice({
            brand: '',
            model: '',
            year: 0,
            pricePerDay: 0,
            category: '',
            CPU: '',
            RAM: '',
            storage: '',
            location: '',
            description: '',
          })
        } else {
          console.log("Error at else of setIsLoading")
          toast.error(data.message)
        }
      } catch (error) {
        console.log("Error at catch of setIsLoading")
        toast.error(error.message)
      } finally {
        setIsLoading(false)
      }
    }

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title title="Add New Device" subTitle="Fill in details to list a new device for booking, including pricing, availability, and device specifications."/>

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
        {/* Device Image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor="device-image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer'/>
            <input type="file" id="device-image" accept="image/*" hidden onChange={e=>setImage(e.target.files[0])}/>
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your device</p>
        </div>

        {/* Device Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Brand</label>
            <input type="text" placeholder="e.g. Apple, Samsung..." required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={device.brand} onChange={e=> setDevice({...device, brand: e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
            <label>Model</label>
            <input type="text" placeholder="e.g. 30 Pro Max, S30 Ultra..." required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={device.model} onChange={e=> setDevice({...device, model: e.target.value})}/>
          </div>
        </div>

        {/* Device Year, Price, Category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Year</label>
            <input type="number" placeholder="2025" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={device.year} onChange={e=> setDevice({...device, year: e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
            <label>Daily Price ({currency})</label>
            <input type="number" placeholder="100" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={device.pricePerDay} onChange={e=> setDevice({...device, pricePerDay: e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
            <label>Category</label>
            <select onChange={e=> setDevice({...device, category: e.target.value})} value={device.category} className='px-3 py-2 mt-1 border borderColor rounded-md outline-none'>
              <option value="">Select a category</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Tablet">Tablet</option>
            </select>
          </div>
        </div>

        {/* Device CPU, RAM, Storage */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>CPU</label>
            <select onChange={e=> setDevice({...device, CPU: e.target.value})} value={device.CPU} className='px-3 py-2 mt-1 border borderColor rounded-md outline-none'>
              <option value="">Select a CPU</option>
              <option value="Snapdragon">Snapdragon</option>
              <option value="Dimensity">Dimensity</option>
              <option value="Mediatek">Mediatek</option>
              <option value="Apple">Apple</option>
              <option value="Exynos">Exynos</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label>Storage</label>
            <select onChange={e=> setDevice({...device, storage: e.target.value})} value={device.storage} className='px-3 py-2 mt-1 border borderColor rounded-md outline-none'>
              <option value="">Select a storage</option>
              <option value="128 GB">128 GB</option>
              <option value="256 GB">256 GB</option>
              <option value="512 GB">512 GB</option>
              <option value="1 TB">1 TB</option>
              <option value="2 TB">2 TB</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label>RAM</label>
            <input type="number" placeholder="16" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={device.RAM} onChange={e=> setDevice({...device, RAM: e.target.value})}/>
          </div>
        </div>

        {/* Device Location */}
        <div className='flex flex-col w-full'>
          <label>Location</label>
            <select onChange={e=> setDevice({...device, location: e.target.value})} value={device.location} className='px-3 py-2 mt-1 border borderColor rounded-md outline-none'>
              <option value="">Select a location</option>
              <option value="HUST">HUST</option>
              <option value="NEU">NEU</option>
              <option value="PTIT">PTIT</option>
              <option value="FPT">FPT</option>
            </select>
        </div>

        {/* Device Description */}
        <div className='flex flex-col w-full'>
          <label>Description</label>
          <textarea rows={5} placeholder="e.g. A futuristic powerhouse designed for unmatched speed, creativity, and seamless workflow." required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={device.description} onChange={e=> setDevice({...device, description: e.target.value})}></textarea>
        </div>

        <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
          <img src={assets.tick_icon} alt="" />
          {isLoading ? 'Listing...' : 'List Your Device'}
        </button>

      </form>
    </div>
  )
}

export default AddDevice
