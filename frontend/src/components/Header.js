import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'

export default function Header({setLogedIn, header, setHeader, input, setInput, logedIn, setShowLogin, setShowMovieslist, setShowWatchlist }) {

    const [searchBar, setsearchBar] = useState()
    const [html, setHtml] = useState()

    useEffect(() => {
        switch (header) {
            case "Moveslist":
                setHtml(
                    <main>
                        <h1>Find your film</h1>
                        <div>

                            {logedIn ? <p id="page" onClick={Watchlist}>Watchlist</p> : <p onClick={login} id="page">log in</p>}
                            {logedIn ? <div id='flex'> <p id="name">{localStorage.getItem('name')}</p> <p id='logout-img' onClick={logout}>❌</p> </div> : ""}
                        </div>
                    </main>
                )
                setsearchBar({ display: 'flex' })
                setShowWatchlist({ display: 'none' })
                setShowMovieslist({ display: 'flex' })
                setShowLogin({ display: 'none' })
                break

            case "Watchlist":
                setHtml(
                    <main>
                        <h1>Your watchlist</h1>
                        <p onClick={moviesList} id="page">Movie list</p>
                    </main>
                )
                setsearchBar({ display: 'none' })
                setShowWatchlist({ display: 'flex' })
                setShowMovieslist({ display: 'none' })
                setShowLogin({ display: 'none' })
                break

            case "login":
                setHtml(
                    <main>
                        <h1>Login page</h1>
                        <p onClick={moviesList} id="page">Movie list</p>
                    </main>
                )
                setShowWatchlist({ display: 'none' })
                setsearchBar({ display: 'none' })
                setShowLogin({ display: 'flex' })
                setShowMovieslist({ display: 'none' })
                break
                
            default:
                break
        }
    }, [header, logedIn])


    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        setLogedIn(false)
        setHeader("Moveslist")
    }
    const login = () => {
        setHeader("login")
    }

    const moviesList = () => {
        setHeader("Moveslist")
    }

    const Watchlist = () => {
        setHeader("Watchlist")
    }

    return (
        <div >
            {html}
            <SearchBar input={input} setInput={setInput} searchBar={searchBar} />
        </div>
    )
}


