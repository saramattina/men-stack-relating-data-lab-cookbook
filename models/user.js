const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  food: {
    type: String,
    required: true
  }
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
  assignee: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;
