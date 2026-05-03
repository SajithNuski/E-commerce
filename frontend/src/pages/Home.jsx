import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <>
    <Hero />
    <LatestCollection />
    <BestSeller />
    <OurPolicy/>
    <NewsLetter/>
    </>
  )
}

export default Home