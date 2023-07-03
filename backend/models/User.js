const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
});

const User = mongoose.model('User', userSchema);

// eslint-disable-next-line no-undef
module.exports = User;
