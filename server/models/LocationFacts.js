const mongoose = require('mongoose');

const {Schema} = mongoose;

const requiredString = {
  type: String,
  required: true
};
const LocationFactsSchema = new Schema({
  name: requiredString,
  type: String,
  latitude: Number,
  longitude: Number,
  Continent: String,
  Country: String,
  Description: String,
  Image: String,
  facts: requiredString,
  // created_at: {
  //   type: Date,
  //   required: true,
  //   default: Date.now
  // },
  // updated_at: {
  //   type: Date,
  //   required: true,
  //   default: Date.now
  // }
}, {
  timestamps: true
});

const LocationFacts = mongoose.model('LocationFacts', LocationFactsSchema);

module.exports = LocationFacts;
