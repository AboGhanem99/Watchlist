const mongoose = require('mongoose')

const watchlistSchema = mongoose.Schema(
  {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
    Mid: {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Watchlist', watchlistSchema)