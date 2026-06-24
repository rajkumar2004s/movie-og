import React, { useState, useEffect } from 'react'
import Tvtrend from '../Trending Tv Shows/Tvtrend'
import PopularTVShows from '../Popular Tv Shows/PopularTVShows'
import TopRated from '../TopRated/TopRated'
import { ClipLoader } from 'react-spinners'
import './Tvshows.css'  
import Navbar from '../Navbar/Navbar'

const Tvshows = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 500) 
    return () => clearTimeout(timer)
  })

  return (
    <>
      {!loaded ? (
        <div className="spinner-container">
          <ClipLoader color="#FF0000" size={60} />
        </div>
      ) : (
        <div>
        <Navbar />
          <TopRated />
          <PopularTVShows />
          <Tvtrend />
        </div>
      )}
    </>
  )
}

export default Tvshows
