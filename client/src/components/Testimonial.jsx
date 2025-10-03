import React from 'react'
import {assets} from '../assets/assets'
import Title from './Title'

const Testimonial = () => {
    const testimonials = [
        { name: "Ngoc Han Le", 
            location: "HUST, Hanoi", 
            image: assets.avatar_image_1,  
            testimonial: "The platform is very easy to use, and I feel i'm coming from future. I love it and suggest everyone to use." 
        },
        { name: "Van Hung Le", 
            location: "NEU, Hanoi", 
            image: assets.user_avatar,  
            testimonial: "I love how transparent and professional the process is. Services are always on time, which makes me completely trust this provivder." 
        },
        { name: "Ngoc Anh Vu", 
            location: "PTIT, Hanoi", 
            image: assets.avatar_image_2,  
            testimonial: "Thanks to this website, I can monetize my device effortlessly. It’s stress-free and really convenient." 
        }
    ];

  return (
    <div className="py-28 px-26 md:px-16 lg:px-24 xl:px-24">
        <Title title="What Our Customer Say" subTitle="Discover how innovators use CodeOnFuture to bring their ideas to life."/>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
            {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
                    <div className="flex items-center gap-3">
                        <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                        <div>
                            <p className="text-xl">{testimonial.name}</p>
                            <p className="text-gray-500">{testimonial.location}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 mt-4">
                        {Array(5).fill(0).map((_, index) => (
                            <img key={index} src={assets.star_icon} alt="star-icon" />
                        ))}
                    </div>
                    <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.testimonial}"</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Testimonial
