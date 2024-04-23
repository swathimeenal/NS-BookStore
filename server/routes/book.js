import express from 'express'
import multer from 'multer'
import {Book} from '../models/Book.js';
const router = express.Router();
import cors from "cors"
import { verifyAdmin } from './auth.js';

router.use(express.json());
// MiddleWare for CORS
router.use(cors());
// Create a Storage for Uploads
 const storage = multer.diskStorage({
    destination : function (req, file, cb)
    {
       cb( null, '/uploads/');// uploads will be stored in the 'upload/' directory
    },
    filename: function(req, file,cb)
    {
    cb(null, Date.now() + '-' + file.originalname);
    },
});
// to create upload function
const upload = multer({ storage: storage});

// Route for Handling file uploads
router.post('/add',upload.single("file"), verifyAdmin, async (req, res) =>{
   
 try {
        const { name, author, imageUrl, pdfFile}  = req.body;
        const newbook =  await Book.create({
            name,
            author,
            imageUrl,
            pdfFile }) 
        

         console.log(req.file);
        await newbook.save()
        res.status(201).json("newBook");
       
    } catch(error) {
        console.log(error)
         res.status(400).json({message: "Error in adding book"})
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