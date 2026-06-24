import React, { useState, useEffect } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './TrendingSection.css'

const TrendingSection = () => {
    const [trendingMovie, setTrendingMovie] = useState([])

    useEffect(() => {
        const trendingMovies = async () => {
            const url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=ce676c654868e1fb7c7f39a2391400dc'
            const res = await fetch(url)
            const resData = await res.json()
            setTrendingMovie(resData.results.splice(0,10)) 
        }
        trendingMovies()
    }, [])

    return (
        <div className='TrendMoviesDiv'>
            <h1 className='TrendMoviesDivHead'>Trending Now</h1>
            <div className='TrendingDiv'>
                {trendingMovie.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default TrendingSection
