const express = require('express')

const router = express.Router()
const {getMovie ,  getMovieById} = require('../controllers/movieController')

router.route('/:title').get(getMovie)
router.route('/id/:id').get(getMovieById)


module.exports = router