const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isForRent: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isOfferAvailable: {
    type: Boolean,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

const Property = mongoose.model('Property', propertySchema);


module.exports = Property;
