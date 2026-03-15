//   - Book (title, author, genre, quantity)

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2
    },
    author: {
        type: String,
        required: true,
        minlength: 2
    },
    genre: {
        type: String,
        required: true,
        minlength: 2,
        enum: ["badiiy", "ilmiy", "tarix", "biografiya", "texnologiya", "bolalar"]
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true })

const Book = mongoose.model("Book", bookSchema)
module.exports = Book