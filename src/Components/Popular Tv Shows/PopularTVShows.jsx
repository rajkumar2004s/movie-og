import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './PopularTVShows.css'

const PopularTVShows = () => {
    const [popTVshows, setpopTVShows] = useState([])
    useEffect(()=>{
        const popularTVshows = async()=>{
            const res = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=ce676c654868e1fb7c7f39a2391400dc')
            const resData =await res.json()
            setpopTVShows(resData.results)
        }
        popularTVshows()
    },[])
  return (
    <div className='popularMainDiv'>
        <h1 className='popularHead'>Popular TV Shows</h1>
        <div className='popInner'>
            {popTVshows.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    </div>
  )
}

export default PopularTVShows