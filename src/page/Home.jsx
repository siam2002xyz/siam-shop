import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import PopularProducts from '../components/PopularProducts'
import Offer from '../components/Offer'
import NewArrivals from '../components/NewArrivals'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className=''>
        <Hero />
        <About />
        <PopularProducts />
        <Offer />
        <NewArrivals />
    </div>
  )
}

export default Home