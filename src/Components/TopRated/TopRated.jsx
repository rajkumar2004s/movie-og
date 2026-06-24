import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './TopRated.css'

const TopRated = () => {
    const [topratedshows, settopratedshows] = useState([])
    useEffect(()=>{
        const toprated = async()=>{
            const res = await fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=ce676c654868e1fb7c7f39a2391400dc')
            const resData =await res.json()
            settopratedshows(resData.results)
        }
        toprated()
    },[])
  return (
    <div className='topratedMainDiv'>
        <h1 className='topRatedHead'>Top Rated TV Shows By TraiFlix</h1>
        <div className='topInner'>
            {topratedshows.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    </div>
  )
}

export default TopRated