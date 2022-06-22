const mongoose = require('mongoose') // Imports mongoose


const coverImageBasePath = 'uploads/bookCovers'

const bookSchema = new mongoose.Schema( { //Creates new schema with JSON name
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    publishDate: {
        type: Date,
        require: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImage: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
})

module.exports = mongoose.model('Book', bookSchema)
// Exports model
// 'Book" is the name of the model or what it is for 
// bookSchema is the Schema we created above

module.exports.coverImageBasePath = coverImageBasePath