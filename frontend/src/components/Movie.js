import { useState , useEffect } from "react"
import img from "../img/Poster_not_available.jpg"

export default function Movie(props) {

    const add = (id) => {
        addMovie(id)
    }
    let inWatchlist = false
    const [btnState , setBtnState] = useState()

    useEffect(()=>{
        setBtnState()
    },[props.showMovieslist])

    const addMovie = async (Mid) => {
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
            for (let i = 0; i < responseJson.length; i++) {
                if (responseJson[i].Mid === Mid) {
                    inWatchlist = true
                    setBtnState(<p id="btn-add-State">already  in the watchlist</p>)
                }
            }
        })

        if (!inWatchlist) {
            await fetch(`/api/watchlist/`, {
                method: 'POST',
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
            }).then((responseJson) => {
                setBtnState(<p id="btn-add-State">added</p>)
            })
        }
    }

    return (
        <div id="movie">
            <div>
                <img src={props.poster || img} alt="movie poster" />
            </div>
            <div>
                <div id="flex">
                    <h1 id="title">{props.title}</h1>
                    <p id="rating">⭐ {props.imdb.rating}</p>
                </div>

                <div id="flex">
                    {props.logedIn ? <p id="btn-add" onClick={() => add(props._id)}>➕Watchlist</p> : ""}
                    {btnState}
                </div>
                <p id="plot">{props.plot}</p>
            </div>
        </div>
    )
}