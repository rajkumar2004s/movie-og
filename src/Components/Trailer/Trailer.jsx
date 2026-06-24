import React, { useEffect, useState } from 'react'
import './Trailer.css'
import { useLocation, useParams } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from '../Navbar/Navbar';

const Trailer = () => {
    const { state } = useLocation()
    const { id } = useParams();
    const type = state?.type || "movie";
    const [trailerMovie, setTrailer] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const trailerFetch = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=ce676c654868e1fb7c7f39a2391400dc`
                );
                const resData = await res.json();
                setTrailer(resData.results);
            } catch (error) {
                console.error("Failed to fetch trailer:", error);
                setTrailer([]);
            } finally {
                setLoading(false);
            }
        };
        trailerFetch();
    }, [id, type]);

    const trailer = trailerMovie.find(
        (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
    );

    return (
        <div className="trailerPlayer">
            <Navbar/>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '60px' }}>
                    <ClipLoader color="#FF0000" size={60} />
                </div>
            ) : trailer ? (
                
                <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    width="60%"
                    height="500px"
                    title="Movie Trailer"
                    allowFullScreen
                    style={{ border: 'none' }}
                />
            ) : (
                <p style={{ textAlign: 'center', padding: '32px' }}>
                    Trailer not available
                </p>
            )}
        </div>
    );

}

export default Trailer