import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import FeaturedSection from '../components/FeaturedSection'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection/>
      <Banner/>
      <Testimonial/>
      <Newsletter/>
    </>
  )
}

export default Home
