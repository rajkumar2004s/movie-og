import React, { useState, useEffect } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './PopularMovies.css'

const PopularMovies = () => {
    const [PopularMovies, setPopularMovies] = useState([])

    useEffect(() => {   
        const TopratedMovies = async () => {
            const url = 'https://api.themoviedb.org/3/movie/popular?api_key=ce676c654868e1fb7c7f39a2391400dc&language=en-US&page=1'
            const res = await fetch(url)
            const resData = await res.json()
            setPopularMovies(resData.results.splice(0,10)) 
        }
        TopratedMovies()
    }, [])

    return (
        <div className='PopularMoviesDiv'>
            <h1 className='PopularMoviesDivHead'>Trending Now</h1>
            <div className='PopularRatedDiv'>
                {PopularMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default PopularMovies
