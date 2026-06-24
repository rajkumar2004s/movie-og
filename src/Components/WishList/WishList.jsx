import React, { useContext, useState, useEffect } from 'react'
import './WishList.css'
import ReactContext from '../../ReactContext/ReactContext'
import MovieCard from '../MovieCard/MovieCard'
import { ClipLoader } from 'react-spinners'
import Navbar from '../Navbar/Navbar'

const WishList = () => {
  const { wishlist } = useContext(ReactContext)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 500) 
    return () => clearTimeout(timer)
  }, [])

  const emptyMsg = (
    <h1 className='wishDes'>
      Your favorite movies will appear here. Start exploring and add movies to your wishlist!
    </h1>
  )

  return (
    <>
      {!loaded ? (
        <div className="spinner-containerss">
          <ClipLoader color="#FF0000" size={60} />
        </div>
      ) : (
        <div className='wishmainDiv'>
        <Navbar />

          <h1 className='wishHead'>WishList</h1>
          {wishlist.length > 0 ? (
            <div className='wishDiv'>
              {wishlist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            emptyMsg
          )}
        </div>
      )}
    </>
  )
}

export default WishList
