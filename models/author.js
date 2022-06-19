const mongoose = require('mongoose') // Imports mongoose

const authorSchema = new mongoose.Schema( { //Creates new schema with JSON name
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)
// Exports model
// 'Author" is the name of the model or what it is for 
// authorSchema is the Schema we created above