const asyncHandler = require('express-async-handler')
const Watchlist = require('../models/watchlistModel')
const User = require('../models/userModel')

///////////////////////
const getWatchlist = asyncHandler(async (req, res) => {
    const watchlist = await Watchlist.find({ user: req.user.id },{Mid :1})
    res.status(200).json(watchlist)
})


///////////////////////
const setWatchlist = asyncHandler(async (req, res) => {
    const { Mid} = req.body

    if (!Mid) {
        res.status(400)
        throw new Error('Please add an id')
    }

    const watchlist = await Watchlist.create({
        Mid: Mid,
        user: req.user.id,
    })
    res.status(200).json(watchlist)
})


/////////////////////
const deleteWatchlist = asyncHandler(async (req, res) => {
    const watchlist = await Watchlist.find({ Mid: req.body.Mid})
    const [auser] = watchlist 
    

    if (!watchlist) {
        res.status(400)
        throw new Error('Movie not found')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }


    if (auser.user.toString() !== req.user.id) {
        res.status(401)
        
        throw new Error('User not authorized')
    }
    await auser.remove()
    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getWatchlist,
    setWatchlist,
    deleteWatchlist
}