const { Schema, model } = require('mongoose')

const vegetableSchema = new Schema({
  name: {type: String, required: true},
  color: {type: String, required: true},
  readyToEat: Boolean
})


const Vegetable = model('Vegetable', vegetableSchema)

module.exports = Vegetable