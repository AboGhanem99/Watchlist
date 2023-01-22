import React, { useState, useEffect } from 'react'
import WatchlisMovie from './WatchlisMovie'

export default function Watchlist({ showWatchlist }) {


    const [warchlistDataId, setWarchlistDataId] = useState([])
    const [removed , setRemoved] = useState([])

    const getWatclist = async () => {
        await fetch(`/api/watchlist/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error('Wrong info')
            }
        }).then((responseJson) => {
            setWarchlistDataId(responseJson)
        })
    }

    const movies = warchlistDataId.map(movie => {
        return <WatchlisMovie 
            key={movie._id}
            {...movie} 
            setRemoved = {setRemoved}
        />
    })

    useEffect(() => {
        getWatclist()
    }, [showWatchlist ,removed ])

    return (
        <div id="movies" style={showWatchlist}>
          {movies}
        </div>
    )
}