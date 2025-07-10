const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  resetOtp: {
    type: Number,
    required: false,
  },
  otpExpires: {
    type: Date,
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
