import img from "../img/Poster_not_available.jpg"
import React, { useState, useEffect } from 'react'

export default function WatchlisMovie(props) {

    const [movie, setMovie] = useState({
        imdb: {}
    })

    useEffect(() => {
        const getMovie = async () => {
            await fetch(`http://localhost:5000/api/movies/id/${props.Mid}`, {
                method: 'GET',
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw new Error('Wrong info')
                }
            }).then((responseJson) => {
                setMovie(responseJson)
            })
        }
        getMovie()
    })

    const remove = async (Mid) => {
        await fetch(`http://localhost:5000/api/watchlist/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // notice the Bearer before your token
            }, body: JSON.stringify({ Mid: Mid })

        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error('Wrong info')
            }
        })
        props.setRemoved(current => !current)
    }


    return (
        <div id="movie">
            <div>
                <img src={movie.poster || img} alt="movie poster" />
            </div>
            <div>
                <div id="flex">
                    <h1 id="title">{movie.title}</h1>
                    <p id="rating">⭐ {movie.imdb.rating}</p>
                </div>

                <div id="flex">
                    <p id="btn-remove" name={props.Mid} onClick={() => remove(props.Mid)}>➖Watchlist</p>
                </div>
                <p id="plot">{movie.plot}</p>
            </div>
        </div>
    )
}




