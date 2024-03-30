import express from 'express'

import { Book } from '../models/Book.js';
const router = express.Router();
import { verifyAdmin } from './auth.js';




router.post('/add',verifyAdmin, async (req, res) => {
   
    try {
        const {name, author, imageUrl, pdfPath} = req.body;
        const newbook =  await Book.create({
            name,
            author,
            imageUrl,
            pdfPath
        });
        res.status(201).json("newBook");
       
    } catch(error) {
        console.log(error)
         res.status(400).json({message: "Error in adding book"})
    }
})

// Get All books
router.get('/',async(req, res)=> {
    try{
        const books= await Book.find();
        res.json(books);
    }catch(error){
        res.status(500).json({message:error.message})
    }
});





router.get('/books', async (req, res) => {
    try {
        const books = await Book.find()
        return res.json(books)
    }catch(err) {
        return res.json(err)
    }
})

router.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById({_id: id})
        return res.json(book)
    }catch(err) {
        return res.json(err)
    }
})
router.put('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate({_id: id}, req.body)
        return res.json({updated: true, book})
    }catch(err) {
        return res.json(err)
    }
})

router.delete('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete({_id: id})
        return res.json({deleted: true, book})
    }catch(err) {
        return res.json(err)
    }
})

export {router as bookRouter}