const express = require('express')
const Author = require('../models/author') // Navigate out of routes folder and into models folder 
const router = express.Router()

// All Authors Route  // Mongoose is async, so add async to beginning of function and use async when referencing mongoose
router.get('/', async (req,res) => {
    let searchOptions = {} // Empty object created to contain search options 

    // If the query.name submitted is not empty or null 
    if (req.query.name != null && req.query.name !== '') { // Use req.query, GET sends through query, POST through body

        // Appends RegExp object to searchOptions
        searchOptions.name = new RegExp(req.query.name, 'i') // Creates a regular expression object for matching text with a pattern 
        // RegExp(pattern, flags), pattern is text, flags are for seach (i being ignore case)
    
    }
    try {
        const authors = await Author.find(searchOptions) // Use searchOptions to match text stored in model
        res.render('authors/index', {
            authors: authors, // render results from search 
            searchOptions: req.query // Keep search in search bar
        })
    } catch {
        res.redirect('/') // Redirect back to homepage if anything fails
    }
})

// New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author()}) // Define Author for the view 
})

// Create Author Route
router.post('/', async (req, res) => {
    const author = new Author( { // Create new Author variable with name from POST
        name: req.body.name
    })

    try {
        const newAuthor = await author.save() // Save author in model
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors/`)
    } catch {
        res.render('authors/new', { // Display error message and keep author in bar 
            author: author,
            errorMessage: "Error Creating Author"
        })
    }
})


module.exports = router