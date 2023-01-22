import "./index.css"
import Movies from "./components/Movies"
import Header from './components/Header'
import Watchlist from "./components/Watchlist"
import Login from "./components/Login"
import Register from "./components/Register"

import { useState, useEffect } from 'react'

const hostUrl = 'https://watchlistbackend-production.up.railway.app'
// const hostUrl = 'http://localhost:5000'



function App() {
  const [input, setInput] = useState()
  const [logedIn, setLogedIn] = useState(false)
  const [showMovieslist, setShowMovieslist] = useState({ display: 'flex' })
  const [showWatchlist, setShowWatchlist] = useState({ display: 'none' })
  const [showLogin, setShowLogin] = useState({ display: 'none' })
  const [showRegister, setShowRegister] = useState({ display: 'none' })
  const [header, setHeader] = useState("Moveslist")


  useEffect(() => {
    const getUser = () => {
      if (localStorage.getItem('name') && localStorage.getItem('token')) {
        setLogedIn(true)
      }
    }
    getUser()
  })

  return (
    <div>
      <Header setLogedIn={setLogedIn} header={header} setHeader={setHeader} input={input} setInput={setInput} logedIn={logedIn} setShowLogin={setShowLogin} setShowMovieslist={setShowMovieslist} setShowWatchlist={setShowWatchlist} />
      <Movies hostUrl={hostUrl} input={input} showMovieslist={showMovieslist} logedIn={logedIn} />
      <Watchlist hostUrl={hostUrl} showWatchlist={showWatchlist} />
      <Login hostUrl={hostUrl} setHeader={setHeader} showLogin={showLogin} setShowLogin={setShowLogin} setShowRegister={setShowRegister} setLogedIn={setLogedIn} />
      <Register hostUrl={hostUrl} showRegister={showRegister} setShowRegister={setShowRegister} setShowLogin={setShowLogin} />
    </div>
  )
}
export default App;


