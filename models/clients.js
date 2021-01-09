const mongoose = require('mongoose');
require('../config/mongodb');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  from: {
    type: String
  },
  age: {
    type: String,
    required: true
  }
}, { timestamps: true });
const clients = mongoose.model('clients', schema);

module.exports = clients;
