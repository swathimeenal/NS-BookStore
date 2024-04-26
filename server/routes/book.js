import express from 'express'
import multer from 'multer'
import {Book} from '../models/Book.js';
const router = express.Router();
import cors from "cors"
import { verifyAdmin } from './auth.js';

// multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/client/src/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

// Route for Handling file uploads
router.post('/book/add',upload.single("file"), verifyAdmin, async (req, res) =>{
    if (req.file)
    {
        res.json({ message:"file uploaded successful "})
    }
    else{
        res.json({ message:"error in file uploading "})
    }
    
 
})

// Get All books
router.get('/books',async(req, res)=> {
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