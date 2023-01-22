const express = require('express')

const router = express.Router()
const {getWatchlist,setWatchlist,deleteWatchlist,} = require('../controllers/watchlistController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect ,getWatchlist).post(protect,setWatchlist).delete(protect ,deleteWatchlist)



module.exports = router