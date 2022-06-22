const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const Book = require('../models/book') // Navigate out of routes folder and into models folder
const Author = require('../models/author')
const uploadPath = path.join('public',Book.coverImageBasePath)
const imageMimeTypes = ['images/jpeg','images/png','images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null)
    }
})

// All Books Route  // Mongoose is async, so add async to beginning of function and use async when referencing mongoose
router.get('/', async (req,res) => {
    res.send('All Books')
})

// New Book Route
router.get('/new', async (req, res, err) => {
    renderNewPage(res, new Book())
})

// Create Book Route
router.post('/', upload.single('cover'),async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null

    const book = new Book({
        title: req.body.title, 
        author: req.body.Author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName,
        description: req.body.description
    })
    
    try {
        const newBook = await book.save()
        // res.redirect('books/${newBook.id}')
        res.redirect(`books`)
    } catch {
        renderNewPage(res, book, true)
    }
})

async function renderNewPage (res, book, hasError = false) {
    try {
        const authors = await Author.find({})
        const params =  {
            authors: authors,
            book: book
        }
        if(hasError) params.errorMessage = 'Error Creating Book'
        res.render('books/new', params)
    } catch {
        res.redirect('/books')
    }
}


module.exports = router