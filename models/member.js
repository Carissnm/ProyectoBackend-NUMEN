const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    debt: {
        type: Boolean,
        required: true
    } 
});

const Member = mongoose.model('Member', schema);
module.exports = {
    Member
}