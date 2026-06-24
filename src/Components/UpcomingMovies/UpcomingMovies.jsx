import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './UpcomingMovies.css'

const UpcomingMovies = () => {
  const [upcomingData, setUpcomingData] = useState([])
  useEffect(()=>{
    const upcoming = async()=>{
      const res= await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=ce676c654868e1fb7c7f39a2391400dc')
      const resData = await res.json()
      setUpcomingData(resData.results.splice(0,10)) 
    }
    upcoming()
  },[])
  return (
    <div>
      <h1 className='upcomingHead'>Upcoming Movies</h1>
      <div className='upcomingDiv'>
        {upcomingData.map((movie)=>(
          <MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>
    </div>
  )
}

export default UpcomingMovies