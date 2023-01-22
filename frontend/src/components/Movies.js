import React, { useState, useEffect } from 'react'
import Movie from './Movie';


function Posters({ input , showMovieslist,logedIn}) {

    const [moviesData, setMoviesData] = useState([])
    const movies = moviesData.map(movie => {
        return <Movie
            key={movie.id}
            {...movie}
            logedIn = {logedIn}
            showMovieslist = {showMovieslist}
        />
    })
    useEffect(() => {
        const getData = async () => {
            const tmp = await fetch(`http://localhost:5000/api/movies/${input || ""}`)
            const response = await tmp.json()
            setMoviesData(response)
        }
        getData()
    }, [input])

    return (
        <div id="movies" style={showMovieslist}>
            {input && movies}
        </div>
    )
}
export default Posters;
