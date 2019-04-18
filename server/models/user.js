const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    cpf: String,
    profile: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('user', userSchema, 'users');