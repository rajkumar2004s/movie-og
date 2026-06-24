import React, { useState, useEffect } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './LatestMovie.css'

const LatestMovie = () => {
    const [LatestMovies, setLatestMovies] = useState([])

    useEffect(() => {
        const LatestMovies = async () => {
            const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ce676c654868e1fb7c7f39a2391400dc&language=en-US&page=1'
            const res = await fetch(url)
            const resData = await res.json()
            setLatestMovies(resData.results.splice(0,10)) 
        }
        LatestMovies()
    }, [])

    return (
        <div className='LatestMoviesDiv'>
            <h1 className='LatestMoviesDivHead'>Latest Movies</h1>
            <div className='LatestDiv'>
                {LatestMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default LatestMovie
