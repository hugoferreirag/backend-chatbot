const mongoose = require('mongoose');
require('../config/mongodb');

const schema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  stepper: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true
  }
}, { timestamps: true });
const preRegistration = mongoose.model('preRegistration', schema);

module.exports = preRegistration;
