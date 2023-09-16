const mongoose = require('mongoose')

const DocSchema = new mongoose.Schema(
  {
    _id: {
      type: String
    },
    data: {
      type: Object
    }
  }
)

module.exports = mongoose.model('Doc', DocSchema)