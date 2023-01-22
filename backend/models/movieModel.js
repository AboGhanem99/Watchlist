const mongoose = require('mongoose')

const movieSchema = mongoose.Schema(
  {
    title : String ,
    genres : String ,
    plot : String ,
    poster : String ,
    rating : String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Movie', movieSchema)