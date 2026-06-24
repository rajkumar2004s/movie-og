import React, { useState, useEffect } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './TopRatedMovies.css'

const TopRatedMovies = () => {
    const [trendingMovies, setTrendingMovies] = useState([])

    useEffect(() => {
        const TopratedMovies = async () => {
            const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=ce676c654868e1fb7c7f39a2391400dc&language=en-US&page=1'
            const res = await fetch(url)
            const resData = await res.json()
            setTrendingMovies(resData.results.splice(0,10)) 
        }
        TopratedMovies()
    }, [])

    return (
        <div className='TopRatedMoviesDiv'>
            <h1 className='TopRatedMoviesDivHead'>Top Rated Movies By Traiflix</h1>
            <div className='TopRatedDiv'>
                {trendingMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default TopRatedMovies
