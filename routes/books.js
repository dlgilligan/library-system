const express = require('express') 
const router = express.Router()
const Book = require('../models/book') // Navigate out of routes folder and into models folder
const Author = require('../models/author')

// All Books Route  // Mongoose is async, so add async to beginning of function and use async when referencing mongoose
router.get('/', async (req,res) => {
    res.send('All Books')
})

// New Book Route
router.get('/new', async (req, res) => {
    try {
        const authors = await Author.find({})
        const book = new Book()
        res.render('books/new', {
            authors: authors,
            book: book
        })
    } catch {
        res.redirect('/books')
    }
})

// Create Book Route
router.post('/', async (req, res) => {
    res.send('Create Books')
})


module.exports = router