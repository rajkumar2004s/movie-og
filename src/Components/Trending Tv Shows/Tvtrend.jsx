import React, { useEffect, useState } from 'react'
import './Tvtrend.css'
import MovieCard from '../MovieCard/MovieCard'

const Tvtrend = () => {
    const [trendTv, setTrendTv] = useState([])
    useEffect(()=>{
        const tvTrend  = async()=>{
            const res = await fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=ce676c654868e1fb7c7f39a2391400dc')
            const resData = await res.json()
            setTrendTv(resData.results)
        }
        tvTrend()
    },[])

  return (
    <div className='trendTVShows'>
        <h1 className='trendHead'>Trending TV Shows</h1>
        <div className='innerTrend'>
            {trendTv.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    </div>
  )
}

export default Tvtrend