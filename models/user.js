'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
  id: ObjectId,
  first_name: String,
  last_name: String,
  age: Number,
  username: String,
  password: String
});


module.exports = mongoose.model('user', user)
