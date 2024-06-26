import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    image: {type: String, required: true},
    pdfFile: {type: String, required: true}
})

const bookModel = mongoose.model('Book', bookSchema)
export {bookModel as Book } 